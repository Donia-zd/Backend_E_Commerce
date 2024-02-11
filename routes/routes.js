const router = require("express").Router();
const userRoutes = require("./user.route.js")
const authRoutes = require("./auth.route.js")
const productRoutes = require("./product.route.js")
const cartRoutes = require("./cart.route.js")
const ordertRoutes = require("./order.route.js")
const base = "/api/v1";

router.use(`${base}/users`, userRoutes)
router.use(`${base}/auth`, authRoutes)
router.use(`${base}/product`, productRoutes)
router.use(`${base}/cart`, cartRoutes)
router.use(`${base}/order`, ordertRoutes)

module.exports = router;

//http://localhost:4000/api/v1/users/get-users
//http://localhost:4000/api/v1/auth/register