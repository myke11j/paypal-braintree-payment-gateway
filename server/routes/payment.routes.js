'use strict'

const {
  processPayment
} = require('../controllers/payment.controller');
const { queryChecks } = require('../middlewares');

module.exports = (app) => {
  app.get('/pay', queryChecks(['pageURL']), processPayment)
};
