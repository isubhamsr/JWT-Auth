const express = require("express")
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.static("public"))

// View Engine
app.set("view engine", "ejs")
app.use(express.json());
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))



// Import Route
const authRouter = require("./routes/api")
const webRouter = require("./routes/web")

// Router Middleware
app.use("/api", authRouter)
app.use(webRouter)


app.listen(port, ()=> console.log(`Server running on ${port}`))