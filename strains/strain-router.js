const router = require('express').Router()
const knex = require("knex")
const config = require("../knexfile")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {add,getAll,findBy,update} = require("./strain-model")


router.post("/add", async (req,res,next) => {
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

router.get("/all", async (req,res,next) => {
    
    try {
        const strains = await getAll()
        res.status(200).json(strains)
    } catch(err){
        next(err)
    }
})



module.exports = router