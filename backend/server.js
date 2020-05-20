//Create Server 
const http = require('http')
const app = require("./app")
let server = http.createServer(app)


server.listen(3010, ()=> {console.log("Server is active")})
