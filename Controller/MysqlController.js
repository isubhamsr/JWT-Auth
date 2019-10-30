const mysql = require("./../dbCon")
const bcrypt = require("bcrypt")

let controller = {}

// signup
controller.signup = (req,res)=>{
    try {
        console.log(req.body);
        const {fname,lname,email,phone,pass} = req.body
        // console.log(pass);
        if(pass === "undefined" && email === "undefined"){
            res.redirect("/signup")
        }else{
            payload = {
                name : {}
            }
            payload.name.first = fname;
            payload.name.last = lname;
            payload.email = email;
            payload.phone = phone;
            payload.pass = bcrypt.hashSync(pass, 10);;

            const sql = `call Signup('${JSON.stringify(payload)}')`;
            console.log(sql);
            
            mysql.query(sql, (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/signin")
                }
            })

        }
    // res.send("signup")
    // res.redirect("/registration")
        
    } catch (error) {
        console.log(error.messege);
        
    }
}

// Signin
controller.signin = (req,res)=>{
    try {
        // console.log(req.body);
        
        const {email,pass} = req.body
        if(email === "undefined" && pass === "undefined"){
            res.redirect("/signin")
        }else{
            const sql = `select password from user where email = '${email}'`;
            mysql.query(sql,(err,result)=>{
                if(result.length === "undefine"){
                    res.send("Please Enter Password")
                    console.log("Please Enter Password");
                    
                }else{
                    // console.log(result);
                    
                    const isChack = bcrypt.compareSync(pass, result[0].password);
                    if(!isChack){
                        res.send("Worng Password")
                        console.log("Worng Password");
                        
                    }else{
                        console.log("Redirect to Wellcome page");
                        
                        res.redirect("/main")
                    }
                }
            })
        }
    } catch (err) {
        console.log(err.message);
        
    }
}

module.exports = controller;