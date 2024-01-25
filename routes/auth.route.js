const router = require("express").Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const hashedPasword = bcrypt.hashSync(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPasword,
        });
        await newUser.save();
        const { password, ...info } = newUser._doc;
        res.status(200).json({
            message: "User Created successfully", data: info
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "User Creation failed", error: error
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "Email does not exist"
            });
        }

        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            return res.status(404).json({
                message: "Email Or Password is incorrect"
            });
        }
        res.status(200).json({
            message: "Login successful",
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Login failed",
            error: error
        });
    }
});



module.exports = router;