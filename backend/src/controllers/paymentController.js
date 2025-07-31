const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount, // amount in the smallest currency unit
            currency: "INR",
            receipt: "receipt_order_1",
        };

        const order = await razorpay.orders.create(options);
        console.log("Razorpay Order Created:", order);
        res.status(200).json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).send({ message: "Payment creation failed", error: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId, razorpaySignature } = req.body;
        console.log("Received for verification:", { orderId, paymentId, razorpaySignature });

        const body = orderId + "|" + paymentId;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                        .update(body.toString())
                                        .digest('hex');
        console.log("Generated Expected Signature:", expectedSignature);

        if (expectedSignature === razorpaySignature) {
            res.status(200).send({ message: "Payment verified successfully" });
        } else {
            res.status(400).send({ message: "Payment verification failed: Invalid signature" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).send({ message: "Payment verification failed", error: error.message });
    }
};