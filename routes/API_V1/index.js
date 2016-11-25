const express = require('express');
const router = express.Router();

const rdb = require('./rdb');
const mongo = require('./mongo');


router.use('/rdb',rdb )
router.use('/mongo',mongo )

module.exports = router;
