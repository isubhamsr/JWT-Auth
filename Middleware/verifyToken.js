const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const varifyToken = {}

varifyToken.verify = (req, res, next) => {
    try {
        const token = req.header("auth_token");
        if (!token) {
            res.send("Access Denied")
            console.log("access denied");
        } else {
            const verified = jwt.verify(token, process.env.secret_key);
            req.user = verified;
            next()
        }
    } catch (err) {
        console.log(err.message);

    }

}

module.exports = varifyToken;