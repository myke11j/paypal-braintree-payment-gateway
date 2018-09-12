/* eslint-disable strict */

'use strict'

const fetchService = require('../services/fetch.service');

const {
    sendSuccess, sendFailure
} = require('../services/api-response')



const processPayment = (req, res) => {
    try {
        return sendSuccess({
            res, message: 'Successfully processed', data: []
        })
    } catch (err) {
        console.log(err);
        return sendFailure({
            res,
            message: `Unable to fetch page requested ${err}` 
        })
    }
};

module.exports = {
    processPayment
};
