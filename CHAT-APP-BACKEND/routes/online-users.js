const express = require('express');
const router = express.Router();

//IMPORTING MODELS
const userData = require('../models/user-data');

//ROUTES
router.get('/' , (req,res)=>{
    userData.find({ socket_id : {$ne : ""}}).then((data)=>{
        res.json(data);
    })
});


module.exports = router;