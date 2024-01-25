const router = require("express").Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register, login } = require("../controllers/auth.controller.js");

router.post("/register", register);

router.post("/login",login);



module.exports = router;