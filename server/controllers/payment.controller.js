/* eslint-disable strict */

'use strict'

const cheerio = require('cheerio');
const fetchService = require('../services/fetch.service');

const {
    sendSuccess, sendFailure
} = require('../services/api-response')



const processPayment = (req, res) => {
    try {

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
