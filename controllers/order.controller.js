const Order = require("../models/order.model.js");

const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(200).json({
            message: "Order created Successfully",
            newOrder,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " An Error occurred while creation Order",
            error: error.message,
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json({
            message: " Order updating Successfully",
            updatedOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " An Error occurred while updating Order",
            error: error.message,
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: " Order deleting Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " An Error occurred while updating Order",
            error: error.message,
        });
    }
};

const getUserOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ userId: req.params.id })
        res.status(200).json({
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
}

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
}

const getMonthlyIncome = async (req, res) => {
    try {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const prevMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));

        const monthlyIncome = await Order.aggregate([
            {
                $match: { createdAt: { $gte: prevMonth } },
            }, {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            },
        ]);
        res.status(200).json({
            message: "Income has been retrieved Successfully",
            monthlyIncome,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An Error Occured while getting User Monthly Income"
        });
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrder,
    getMonthlyIncome,
};