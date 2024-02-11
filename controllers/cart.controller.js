const Cart = require("../models/cart.model.js");

const createCart = async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        await newCart.save();
        res.status(200).json({
            message: "Cart created Successfully",
            newCart,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " An Error occurred while creation Cart",
            error: error.message,
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json({
            message: " Cart updating Successfully",
            updatedCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " An Error occurred while updating Cart",
            error: error.message,
        });
    }
};

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: " Cart deleting Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " An Error occurred while updating Cart",
            error: error.message,
        });
    }
};

const getUserCartItem = async (req, res) => {
    try {
        const cartItems = await Cart.findById({userId: req.params.id})
        res.status(200).json({
            cartItems
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
}

const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json({
            cartItems,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
}


module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCartItem,
    getAllCartItems,
};