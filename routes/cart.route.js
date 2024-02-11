const {createCart, updateCart, deleteCart, getUserCartItem, getAllCartItems } = require("../controllers/cart.controller");
const {verifyToken } = require("../middelware/verifyToken");
const {parser} = require ("../utils/cloudinary.js");
const router = require("express").Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, deleteCart);
router.get("/:id", verifyToken, getUserCartItem);
router.get("/", verifyToken, getAllCartItems);

module.exports = router;