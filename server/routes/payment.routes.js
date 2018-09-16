'use strict'

const {
  handlePayment,
  handleSuccess,
  handleFailure
} = require('../controllers/payment.controller');
const { queryChecks } = require('../middlewares');

module.exports = (app) => {
  app.get('/pay', queryChecks(['name', 'price', 'currency', 'creditCardName', 'creditCardNum', 'creditCardExp', 'creditCardCVV']), handlePayment)

  app.get('/success', handleSuccess),

  app.get('/failure', handleFailure)
};
