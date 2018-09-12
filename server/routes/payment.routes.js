'use strict'

const {
  fetchHTML
} = require('../controllers/paymentl.controller');
const { queryChecks } = require('../middlewares');

module.exports = (app) => {
  app.get('/pay', queryChecks(['pageURL']), processPayment)
};
