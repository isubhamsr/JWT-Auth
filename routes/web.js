const router = require("express").Router();
const varifyToken = require("./../Middleware/verifyToken")

router.get("/",(req,res)=>{
    res.render("index")
})
router.get("/signup",(req,res)=>{  
    res.render("registration")
})
router.get("/signin",(req,res)=>{
    res.render("login")
})
router.get("/main",(req,res)=>{
    res.render("sum")
})
router.get("/ve",varifyToken.verify ,(req,res)=>{
    res.json({name : "Subham", dep : "CSE"})
})



module.exports = router