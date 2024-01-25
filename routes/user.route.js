const router = require("express").Router();

router.get("/get-users", (req, res) => {
    res.send("user has been gotten");
})
module.exports = router;