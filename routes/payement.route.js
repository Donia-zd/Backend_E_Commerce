const { stripe } = require("../controllers/payement.controller");

const router = require("express").Router();

router.post("/", stripe);

module.exports = router;