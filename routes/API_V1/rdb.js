const express = require('express');
const router = express.Router();

const mongoConnect = require('../../models_mong');

router.get('/',(req, res, next)=>{
    /*
        * mongodb에서 collection불러오기
        * collection은 RDB에서 table의 개념
    */

    mongoConnect.get().collection('');
    
    res.end('hello world');
} )

module.exports = router;
