const router = require('express').Router()
const knex = require("knex")
const config = require("../knexfile")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require("../auth/auth-middleware")

const {add, getAllUsers, findBy} = require("./auth-model")

router.get("/users", async (req,res,next) => {
    getAllUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(401).json({message: "invalid credentials"})
        })
})

router.post("/register", async (req,res,next) => {

    try {
        if(req.body){
            const {username, password} = req.body
            const user = {
                username,
                password: await bcrypt.hash(password, 6)
      }
      await add(user)
      res.status(201).json({message: "user added"})
        }
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req,res,next) => {
    try {
        const { username, password } = req.body

        const user = await findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
	
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		const token = jwt.sign({
			userID: user.id,
		}, process.env.JWT_SECRET)

		res.json({
			message: `Welcome ${user.username}!`,
			token,
		})
	} catch(err) {
		next(err)
	}
})

module.exports = router