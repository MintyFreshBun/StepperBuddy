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
router.put('/updateItems' , function (req, res) {
    controller.addItems(req, res); 
})





//-------------------------------------MODELS EXPORTS--------------------------
module.exports= router


