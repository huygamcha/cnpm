import express from "express";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";

const router = express.Router();

router.get("/:config", (req, res) => {
    const {config} = req.params;

    if (config === "paypal") res.send(process.env.PAYPAL_CLIENT_ID);
    if (config === "stripe") res.send(process.env.STRIPE_PUBLISH_KEY);
});

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const {token, amount} = req.body;

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const charge = await stripe.charges.create({
            amount: amount,
            currency: "usd",
            source: token,
            description: "Charged",
        });

        res.json("payment success");
    })
);

export default router;
