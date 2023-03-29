const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/login-logoutController");

/*******Login-logout******************************* */

router.post("/login", login);

router.post("/register", register);


module.exports = router