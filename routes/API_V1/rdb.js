const express = require('express');
const router = express.Router();

const {play, user} = require('../../models_RDB');


router.get('/',(req, res, next)=>{


    res.end('hello world');
} )

module.exports = router;
