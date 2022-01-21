
const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_achivements');



//-----------------Routes segmenets ------------------

//-------------Get Users's Achivements

/**
 * @route GET /getAchivements
 * @group Achivements
 * @returns {object} 200 - User's Achivements
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.get('/getAchivements',function(req,res){
    controller.getAchivements(req,res);
})




//----------PUT Updated Achivement------------


/**
 * @route PUT /updateAchivement{achive_id}
 * @group Achivements
 * @param {string} achive_id.path - Achivements id
 * @param {string} object.body - Achivements updated stats ex: {progress: 34.3, status: false}
 * @returns {object} 200 - Achivmennt updated 
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 404 - User Not found 
 * @security Bearer
 */

router.put('/updateAchivement', [
    body('progress').notEmpty().isNumeric().escape(),
    body('status').notEmpty().isBoolean().escape(),    
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




