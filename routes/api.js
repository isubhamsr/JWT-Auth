const router = require("express").Router()
const controller = require("../controllers/controllers")

router.post("/signup",controller.signup)
router.post("/signin",controller.signin)
router.get("/verify",controller.emailVerify)

module.exports = router;