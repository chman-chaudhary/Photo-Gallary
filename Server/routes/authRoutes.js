const { Signup, Login, Logout } = require("../controller/authController.js");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);

module.exports = router;
