const router = require("express").Router();

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


module.exports = router