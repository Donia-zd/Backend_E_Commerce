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
        const admin = await User.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({
                message: "User can't be found",
            });
        }
        const { password, ...info } = admin._doc;
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
    const query = req.params.latest;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(1)
            : await User.find();
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

const getUserStats = async (req, res) => {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        const userStats = await User.aggregate([
            {
                $match: { createdAt: { $gte: lastYear } }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                },
            },

        ]);
        res.status(200).json({
            message: "Users Data Retrived Successufully",
            userStats
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error aquiring User Statistics",
            error: error.message,
        });
    }
}


module.exports = {
    updateUser,
    deleteUser,
    getAdmin,
    getAllUsers,
    getUserStats,
};