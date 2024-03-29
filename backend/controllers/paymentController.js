const catchAsyncErros = require('../middlewares/catchAsyncErrors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//Process stripe payment => /api/v1/payment/process

exports.processPayment = catchAsyncErros(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment'}
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

//Send stripe api key => /api/v1/stripeapi

exports.sendStripeApi = catchAsyncErros(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})