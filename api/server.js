const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const authRouter = require("../auth/auth-router")
const strainRouter = require("../strains/strain-router")
const server = express()




server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api', authRouter)
server.use('/api/strain', strainRouter)

module.exports = server


