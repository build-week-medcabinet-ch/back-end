const server = require("./api/server")
require("dotenv").config()
const PORT = process.env.PORT || 3300

server.listen(PORT, () => {
    console.log("Server is up and listening")
})