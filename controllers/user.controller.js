const User = require("../models/user.model.js");

const updateUser = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
            });
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User has been Updated Successfull",
            data: updateUser,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "User Update Failed",
            error: err,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted Successfuly" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "User deletion Failed" });
    }
}

const getAdmin = async (req, res) => {
    try {
        const admin =await  User.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({
                message: "User can't be found",
            });
        }
        const { password, ...info} = admin._doc;
        res.status(200).json({
            message: "User has been found Successfully",
            data: admin,
        });
 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "User query feailed",
            error: error,
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users =await  User.find();
        res.status(200).json({
            message: "Users has been found Successfully",
            data: users,
        });
 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "User query feailed",
            error: error,
        });
    }
}
module.exports = {
    updateUser,
    deleteUser,
    getAdmin,
    getAllUsers,
};