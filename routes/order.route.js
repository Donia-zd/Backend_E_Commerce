const {createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrder } = require("../controllers/order.controller");
const {verifyToken, verifyAdmin } = require("../middelware/verifyToken");
const {parser} = require ("../utils/cloudinary.js");
const router = require("express").Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/:id", verifyToken, getUserOrder);
router.get("/", verifyToken, getAllOrder);

module.exports = router;