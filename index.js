const express = require("express")
const app = express()
const dotenv = require("dotenv")

dotenv.config()

// set the public
app.use(express.static("public"))

// set the vidw engine
app.set("view engine", "ejs")

// express json
app.use(express.json())
app.use(express.urlencoded())

// import routes
const webRoute = require("./routes/web")
const apiRoute = require("./routes/api")

// set routes

// api route
app.use(process.env.APP_VERSION, apiRoute)

// web route
app.use(webRoute)

app.listen(process.env.HTTP_PORT, ()=> console.log(`server running on ${process.env.HTTP_PORT}`))