const express = require('express');
const router = express.Router();

const rdb = require('./rdb');
const mongo = require('./mongo');
const file = require('./file');

router.use('/rdb',rdb )
router.use('/mongo',mongo )
router.use('/file',file )

module.exports = router;
