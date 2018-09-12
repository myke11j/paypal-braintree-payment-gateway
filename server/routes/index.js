
const express = require('express');

const router = express.Router();

require('./payment.routes')(router);

module.exports = router;
