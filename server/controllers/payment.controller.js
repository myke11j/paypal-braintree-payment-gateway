/* eslint-disable strict */

'use strict'

const fetchService = require('../services/fetch.service');

const {
    sendSuccess, sendFailure
} = require('../services/api-response')

const paypal = require('paypal-rest-sdk');

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET_KEY,
  PORT
} = require('../../config/config')

paypal.configure({
  'mode': 'sandbox',
  'client_id': PAYPAL_CLIENT_ID,
  'client_secret': PAYPAL_SECRET_KEY
});

const handlePayment = (req, res) => {
    try {
        const {
            name, price, currency, creditCardName, creditCardNum, creditCardExp, creditCardCVV
        } = req.query;
        const create_payment_json = {
            'intent': 'sale',
            'payer': {
                'payment_method': 'paypal'
            },
            'redirect_urls': {
                'return_url': `http://localhost:${PORT}/success`,
                'cancel_url': `http://localhost:${PORT}/failure`
            },
            'transactions': [{
                'item_list': {
                    'items': [{
                        'name': name,
                        'sku': '001',
                        'price': price,
                        'currency': currency,
                        'quantity': 1
                    }]
                },
                'amount': {
                    'currency': currency,
                    'total': price
                },
                'description': 'This is the payment description.'
            }]
        };
        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                throw error;
            }
            console.log("Create Payment Response");
            console.log(payment);
            console.log(payment.links.find(item => item.rel === 'approval_url').href);
            // res.setHeader("Access-Control-Allow-Origin", "https://www.sandbox.paypal.com");
            // res.setHeader("Access-Control-Allow-Origin", req.url);
            // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            return sendSuccess({
                res, message: 'Success', data: { url: payment.links.find(item => item.rel === 'approval_url').href }
            })
            return res.redirect(payment.links.find(item => item.rel === 'approval_url').href)
        });
    } catch (err) {
        console.log(err);
        return sendFailure({
            res,
            message: `Unable to fetch page requested ${err}` 
        })
    }
};

const handleSuccess = (req, res) => {
    try {
        const { payerId, paymentId } = req.query;
        const execute_payment_json = {
            'payer_id': payerId,
            // transactions: [{
            //     'amount': {
            //         currency: ,
            //         total: 
            //     }
            // }]
        }
        return paypal.payment.execute(execute_payment_json, (error, payment) => {
            if (error) {
                throw error;
            }
            console.log("Executed Payment Response for: ", payerId);
            console.log(payment);
            return res.redirect('/success')
        })
    } catch (error) {
        console.log(err);
        return sendFailure({
            res,
            message: `Unable to fetch page requested ${err}` 
        })
    }
}

const handleFailure = (req, res) => res.redirect('/failure')

module.exports = {
    handlePayment,
    handleSuccess,
    handleFailure
};
