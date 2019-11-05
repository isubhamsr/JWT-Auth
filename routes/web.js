const router = require("express").Router();
const varifyToken = require("./../Middleware/verifyToken")

function guard(req,res,next){
    const token = req.headers["x-access-token"] || req.headers["authorization"];
  
    console.log("G U A R D --> "+token)
    next()
}

router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/signup",(req,res)=>{  
    res.render("registration")
})
router.get("/signin",guard, (req,res)=>{
    res.render("login")
})
router.get("/main",(req,res)=>{
    res.render("sum")
})
router.get("/ve",varifyToken.verify ,(req,res)=>{
    res.json({name : "Subham", dep : "CSE"})
})



module.exports = router