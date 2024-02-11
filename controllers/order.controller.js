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
        const order = await Order.findById({userId: req.params.id})
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


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrder,
};