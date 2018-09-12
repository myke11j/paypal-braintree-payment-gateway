'use strict'

const {
  processPayment
} = require('../controllers/payment.controller');
const { queryChecks } = require('../middlewares');

module.exports = (app) => {
  app.get('/pay', queryChecks(['name', 'price', 'currency', 'creditCardName', 'creditCardNum', 'creditCardExp', 'creditCardCVV']), processPayment)
};
