const mysql = require("./../config/dbConfig")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


let controller = {}

// signup
controller.signup = (req, res) => {
    try {
        // assign the values from req.body
        /*{
            req.body : {
                "fname" : "Subham",
                "lname" : "Roy",
                "email" : "subhaor@gmail.com",
                "phone" : "121344561",
                "password" : "nopass"
            }
        }*/

        const { fname, lname, email, phone, password } = req.body;
        
        // if anyone dont give the password and email in input the sent the user to signup page
        if (password === undefined && email === undefined) {
            console.log("DATA IS EMPTY !!!")
            console.log({ fname, lname, email, phone, password });
            res.status(400).json({message:"internal server error ok!"})
            //res.redirect("/signup")
        } else {
            // then we fetch the email for checking if email alrady exists or not
            const sl = `select email from user where email = '${email}'`;
            mysql.query(sl, (err, result) => {
                if(err) {
                    res.status(500).json({
                        err : true,
                        message : err.message
                    })
                }
                if (result.length != 0) {
                    res.status(252).json({
                        err: true,
                        message: "User Already Exists"
                    })
                } else {
                    // then we call the SP
                    // Sp structure
                    /*{
                        "name" : {
                            "first" : "Subham",
                            "last" : "Roy"
                        },
                        "email" : "shubham@gmail.com",
                        "phone" : "12345",
                        "password" : "nopass"
                    }*/

                    const payload = {
                        name: {}
                    }
                    payload.name.first = fname
                    payload.name.last = lname
                    payload.email = email
                    payload.phone = phone
                    try{
                    payload.password = bcrypt.hashSync(password, 10); // save the incrypted password
                    }catch(err){
                        console.log("=========>",err.message)
                    }

                    // call the SP
                    const sql = `call Signup('${JSON.stringify(payload)}')`
                        console.log(payload);
                        
                    mysql.query(sql, (err, result) => {
                        if (err) {
                            console.log("sql cb =====> ",err.message);
                        } else {
                            // after succesfully signup, sent the status code 200
                            res.status(200).json({
                                err: false,
                                message: "Signup Successfull"
                            })
                        }
                    })


                }
            })
        }


    } catch (err) {
        console.log(err.message);
    }
}


// signin
controller.signin = (req, res) => {
    try {
        // assign the values from req.body
        // req.body structure

        /**
         * "email" : "sbhaor@gmail.com",
	        "password" : "nopass"
         */

        const { email, password } = req.body;
        
        // if anyone dont give the password and email in input the sent the user to signin page
        if (email === "undefined" && password === "undefined") {
            res.redirect("/signin")
        } else {

            // fetch the full details of user
            const sql = `select first_name,last_name,email,phone,password from user where email = '${email}'`;
            mysql.query(sql, (err, result) => {
                
                // if result length is 0 then, this is a wrong email
                if (result.length === 0) {
                    res.status(400).json({
                        err: true,
                        message: "Wrong email"
                    })
                } else {

                    // compare the given password and incrypted password
                    const isChake = bcrypt.compareSync(password, result[0].password);
                    if (!isChake) {
                        // if false the sent the status code 400 "wrong password"
                        res.status(400).json({
                            err: true,
                            message: "Wrong Password"
                        })
                    } else {
                        // then user loged in then a jwt token will genarate, that will stire the user information
                        const token = jwt.sign({
                            first_name: result[0].first_name,
                            last_name: result[0].last_name,
                            email: result[0].email,
                            phone: result[0].phone
                        }, process.env.SECRET_KEY)
                        // sent the status code 200 with token
                        res.status(200).json({
                            err: false,
                            message: "Successfully Loged In",
                            token: token
                        })
                    }
                }
            })
        }
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = controller;