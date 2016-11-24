const express = require('express');
const router = express.Router();

const something = require('./something');

router.use('/somethind',something )

module.exports = router;
