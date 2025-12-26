require('dotenv').config();
const express = require('express');
const cors = require('cors');
// We initialize Stripe, but wrap it in a try-catch in case the key is missing/fake
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mock Database
const products = [
    { id: "xl-tshirt", name: "Classic Tee", price: 2000 }, // $20.00
    { id: "hoodie", name: "Premium Hoodie", price: 4500 } // $45.00
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/create-payment-intent', async (req, res) => {
    const { items } = req.body;

    // Simple calculation logic
    const calculateOrderAmount = (items) => {
        return 2000; // Hardcoded $20 for demo purposes
    };

    try {
        if (process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
            throw new Error("Stripe Secret Key is a placeholder. Add a real key in .env to test payment.");
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Payment Error:", err.message);
        res.status(500).send({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
