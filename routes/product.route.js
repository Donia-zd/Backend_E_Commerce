const {createProduct } = require("../controllers/products.controller");
const {verifyAdmin } = require("../middelware/verifyToken");
const {parser} = require ("../utils/cloudinary.js");
const router = require("express").Router();

router.post("/", verifyAdmin, parser.single("image"), createProduct);


module.exports = router;