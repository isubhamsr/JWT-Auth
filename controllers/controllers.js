const mysql = require("../config/config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mailer = require("../lib/email")


let controller = {}

// signup
controller.signup = (req, res) => {
    try {
        // assign the values from req.body
        /*{
            req.body : {
                "first_name" : "Subham",
                "last_name" : "Roy",
                "email" : "subhaor@gmail.com",
                "phone" : "121344561",
                "password" : "nopass"
            }
        }*/

        const { first_name, last_name, email, phone, password } = req.body;

        // if anyone dont give the password and email in input the sent the user to signup page
        if (!password || !email ) {
            console.log("DATA IS EMPTY !!!")
            console.log({ first_name, last_name, email, phone, password });
            res.status(400).json({ message: "internal server error ok!" })
            //res.redirect("/signup")
        } else {
            // then we fetch the email for checking if email alrady exists or not
            const sl = `select email from user where email = '${email}'`;
            mysql.query(sl, (err, result) => {
                if (err) {
                    res.status(500).json({
                        err: true,
                        message: err.message
                    })
                }
                if (result.length != 0) {
                    res.status(500).json({
                        err: true,
                        message: "User Already Exists"
                    })
                } else {
                    // then we call the SP
                    // Sp structure
                    /*{
                        "name" : {
                            "first_name" : "Subham",
                            "last_name" : "Roy"
                        },
                        "email" : "shubham@gmail.com",
                        "phone" : "12345",
                        "password" : "nopass"
                    }*/

                    const payload = {
                        name: {}
                    }
                    payload.name.first_name = first_name
                    payload.name.last_name = last_name
                    payload.email = email
                    payload.phone = phone
                    try {
                        payload.password = bcrypt.hashSync(password, 10); // save the incrypted password
                    } catch (err) {
                        console.log("=========>", err.message)
                        res.status(500).json({
                            err: true,
                            message: err.message
                        })
                    }

                    // call the SP
                    const sql = `call Signup('${JSON.stringify(payload)}')`
                    // console.log(payload);

                    mysql.query(sql, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                err: true,
                                message: err.message
                            })
                        } else {
                            const token = jwt.sign({
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                phone: phone
                            }, process.env.SUPER_SECRET_KEY)
                            /*
                            const mainOptions = {
                                from: '"Subham" shubhamroy12345@gmail.com',
                                to: email,
                                subject: 'Email Verification',
                                html: `Hello, <strong>${first_name}</strong> <a href="http://localhost:3000/api/v1/verify?token=${token}">Click Here to Verify Your Account</a>`
                            }
                            */
                           const link = `${process.env.APP_HOST}:${process.env.HTTP_PORT}${process.env.APP_VERSION}/verify?token=${token}`
                           console.log(link);
                           
                            mailer.email({name:first_name, link:link}, email , function (info) {
                                console.log("====> info =========> ",info)
                                if (!info.status) {
                                    console.log(info.message);
                                    res.status(500).json({
                                        err: true,
                                        message: "signup failed, try leter"
                                    })
                                } else {
                                    console.log('Message sent: ' + info.message);
                                    res.status(200).json({
                                        err: false,
                                        message: "Signup Successfull",
                                        token: token
                                    })
                                }
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
            const sql = `select user_id, first_name,last_name,email,phone,password from user where email = '${email}'`;
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
                            user_id : result[0].user_id,
                            first_name: result[0].first_name,
                            email: result[0].email,
                            phone: result[0].phone
                        }, process.env.SUPER_SECRET_KEY)
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


controller.emailVerify = (req,res)=>{
    const {token} = req.query
    // console.log(token);

    const decoded = jwt.decode(token);
    console.log(decoded.email);
    const user_email = decoded.email

    const sql = `select user_id, email from user where email= '${user_email}'`;
    mysql.query(sql,(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result[0].email === user_email){
                const sq = `UPDATE user
                SET status = 'active'
                WHERE user_id = '${result[0].user_id}'`

                mysql.query(sq,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect("/signin")
                    }
                    
                })

                
            }else{
                res.redirect("/signup")
            }
        }
    })


    

//     var decoded = jwt.verify(token, 'shhhhh');
// console.log(decoded) // bar
    
    // const decodeToken = JSON.parse(atob(token.split('.')[1]));
    
}

module.exports = controller;