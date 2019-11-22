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

Router.get("/sum", (req,res)=>{
    res.render("sum")
})

module.exports = Router;