const {createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrder, getMonthlyIncome } = require("../controllers/order.controller");
const {verifyToken, verifyAdmin } = require("../middelware/verifyToken");
const {parser} = require ("../utils/cloudinary.js");
const router = require("express").Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/:id", verifyToken, getUserOrder);
router.get("/", verifyToken, getAllOrder);
router.get("/stats/income", verifyAdmin, getMonthlyIncome);

module.exports = router;