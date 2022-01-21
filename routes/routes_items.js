const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require ('../controllers/controller_items')


//-------------------------Register  new User-


// get the users information
router.get('/getItems',  function (req, res) {
    controller.getItems(req, res); 
})


// Update the users information acording to the body

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


