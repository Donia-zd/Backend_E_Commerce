const {createProduct } = require("../controllers/products.controller");
const {verifyAdmin } = require("../middelware/verifyToken");

const router = require("express").Router();

router.post("/", verifyAdmin, createProduct);


module.exports = router;