const { query } = require('express');
const express = require('express'); 
const router = express.Router(); 
const { body,param, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_achivements');



//-----------------Routes segmenets ------------------

//-------------Get Users's Achivements

router.get('/getAchivements',function(req,res){
    controller.getAchivements(req,res);
})




//----------PUT Updated Achivement------------

router.put('/updateAchivement', [
    body('progress').notEmpty().escape(),
    body('status').notEmpty().escape(),    
],  function (req, res) {
        const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.updateAchivements(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})






//---------------------Exports here--------------
module.exports= router




