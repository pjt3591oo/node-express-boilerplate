const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.end('hello world');
} )

module.exports = router;
