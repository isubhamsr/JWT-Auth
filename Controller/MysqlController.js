const mysql = require("./../dbCon")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

let controller = {}

// signup
controller.signup = (req, res) => {
    try {
        console.log(req.body);
        const { fname, lname, email, phone, pass } = req.body
        // console.log(pass);
        if (pass === "undefined" && email === "undefined") {
            res.redirect("/signup")
        } else {

            const sl = `select email from user where email = '${email}'`
            // const sl = `select email,phone from user where email ='${email}' and phone = '${phone}'`
            mysql.query(sl, (err, result) => {
                if (result.length != 0) {
                    res.send("Email aleady exixt")
                    console.log("Email aleady exixt");
                }
                else {
                    payload = {
                        name: {}
                    }
                    payload.name.first = fname;
                    payload.name.last = lname;
                    payload.email = email;
                    payload.phone = phone;
                    payload.pass = bcrypt.hashSync(pass, 10);;

                    const sql = `call Signup('${JSON.stringify(payload)}')`;
                    console.log(sql);

                    mysql.query(sql, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/signin")
                        }
                    })
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
controller.signin =  (req, res) => {
    try {
        // console.log(req.body);

        const { email, pass } = req.body
        console.log(email);
        console.log(pass);
        if (email === "undefined" && pass === "undefined") {
            res.redirect("/signin")
        } else {
            const sql = `select password from user where email = '${email}'`;
            mysql.query(sql, (err, result) => {
                if (result.length === "undefine") {
                    res.status(400).json({
                        err : true, 
                        message : "Please enter password"
                    })
                    console.log("Please Enter Password");

                } else {
                    // console.log(result);

                    const isChack = bcrypt.compareSync(pass, result[0].password);
                    if (!isChack) {
                        res.status(400).json({
                            err : true,
                            message : "Worng Password" 
                        })
                        // res.send("Worng Password")
                        console.log("Worng Password");

                    } else {
                        console.log("Redirect to Wellcome page");
                        const token = jwt.sign({id : email}, process.env.secret_key)
                        console.log(token);
                        res.status(200).json({
                            err : false,
                            token : token
                        })
                        // res.header('auth_token',token).send(token);
                        //  res.redirect("/main",{data})
                        
                    }
                }
            })
        }
    } catch (err) {
        console.log(err.message);

    }
}

module.exports = controller;