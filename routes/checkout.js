const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Checkout
router.post('/', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Formation Full Stack',
        },
        unit_amount: 2900,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://tonsite.com/success',
    cancel_url: 'https://tonsite.com/cancel',
  });

  res.json({ id: session.id });
});

module.exports = router;
