const Router = require("express").Router()


Router.get("/signup", (req,res)=>{
    res.render("signup")
})
Router.get("/signin", (req,res)=>{
    res.render("signin")
})
Router.get("/verify", (req,res)=>{
    res.render("verify")
})

module.exports = Router;