
const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_partners');



//-----------------Routes segmenets ------------------

//-------------Get Users's Partner

router.get('/getPartner',function(req,res){
    controller.getPartner(req,res);
})


//-----------Patch Partner's Skin---------------

router.patch('/changeSkin',[
    body('skin').notEmpty().escape(),      
], function( req,res){
    const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.updateSkin(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }

})





//----------PUT partners stats------------

router.put('/updatePartner', [
    body('exp').notEmpty().isNumeric().escape(),
    body('level').notEmpty().isNumeric().escape(),    
],  function (req, res) {
        const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.updatePartner(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})






//---------------------Exports here--------------
module.exports= router




