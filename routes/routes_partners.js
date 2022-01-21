
const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_partners');



//-----------------Routes segmenets ------------------

//-------------Get Users's Partner

/**
 * @route GET /getPartner
 * @group Partner
 * @returns {object} 200 - User's Partner
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.get('/getPartner',function(req,res){
    controller.getPartner(req,res);
})


//-----------Patch Partner's Skin---------------

/**
 * @route PATCH /changeSkin
 * @group Partner
 * @param {string} object.body - partner's skin ex :{skin:"red"}
 * @returns {object} 200 - partner skin updated
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 404 - User Not found 
 * @security Bearer
 */


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


/**
 * @route PUT /updatePartner
 * @group Partner
 * @param {object} object.body - Partners updated stats - ex. {exp:23 , level:1}
 * @returns {object} 200 - Partner Updated
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 404 - User Not found 
 * @security Bearer
 */

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




