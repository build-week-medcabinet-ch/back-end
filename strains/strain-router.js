const router = require('express').Router()
const knex = require("knex")
const config = require("../knexfile")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authenticate = require("../auth/auth-middleware")
const {add,getAll,findBy,update,remove} = require("./strain-model")


router.post("/add", authenticate(), async (req,res,next) => {
    try {
        if(req.body){
            const {user_id,strain_name,type,rating,effects,flavors,description} = req.body
            const strain = {
                user_id,
                strain_name,
                type,
                rating,
                effects,
                flavors,
                description
      }
      await add(strain)
      res.status(201).json({message: "strain added"})
        }
    } catch(err) {
        next(err)
    }
})

router.get("/all", authenticate(), async (req,res,next) => {
    try {
        const strains = await getAll()
        res.status(200).json(strains)
    } catch(err){
        next(err)
    }
})

router.put("/edit/:id", authenticate(), (req,res) => {
    console.log(req.params.id)
    update(Number(req.params.id), req.body)
        .then(res.status(200).json({message: "Strain is edited!"}))
    .catch(err => {
        console.log(err)
        res.status(401).json({message: "something is wrong!"})
    })
})

router.delete("/:id", authenticate() ,(req,res) => {
    remove(Number(req.params.id))
    .then(res.status(200).json({message: "strain has been deleted"}))
    .catch(err => {
        console.log(err)
        res.status(404).json({message: "strain not found"})
    })
})



module.exports = router