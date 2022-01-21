const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require ('../controllers/controller_items')


//-------------------------Register  new User-

/**
 * @route GET /getItems
 * @group Items
 * @returns {object} 200 - User's Items
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */


// get the users information
router.get('/getItems',  function (req, res) {
    controller.getItems(req, res); 
})


// Update the users information acording to the body


/**
 * @route PUT /updateItems
 * @group Items
 * @param {object} object.body - Items numbers - ex. {candy:3 , jam:1}
 * @returns {object} 200 - Items Updated
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 404 - User Not found 
 * @security Bearer
 */

router.put('/updateItems', [
    body('candy').notEmpty().isNumeric().escape(),
    body('jam').notEmpty().isNumeric().escape(),    
],  function (req, res) {
        const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.addItems(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})





//-------------------------------------MODELS EXPORTS--------------------------
module.exports= router


