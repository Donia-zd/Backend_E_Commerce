const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripe = (req, res) => {
    Stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (err, res) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(res);
        }
    }
    );
};


module.exports = {
    stripe,
}