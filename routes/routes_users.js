const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_users');



//-------------------------Register  new User
router.post('/register', [
    body('username').notEmpty().escape(), 
    body('password').notEmpty().escape(),
    body('nickname').notEmpty().escape(),
    body('email').notEmpty().escape(),
    body('height').notEmpty().escape(),
    body('weight').notEmpty().escape(),
    body('age').notEmpty().escape()
],  function (req, res) {
        const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.register(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})
//------------------------Login User

router.post('/login',  function (req, res) {
    controller.login(req, res); 
})


// get the users information
router.get('/userinfo',  function (req, res) {
    controller.loggedUser(req, res); 
})


// Update the users information acording to the body
router.put('/userUpdate' , function (req, res) {
    controller.updateStats(req, res); 
})


//Update with one item , in this case when updating one item 


//------------------------------------Test routes to check if everything checks out on postman------------------

// route to get the list of users for testing
router.get('/list',  function (req, res) {
    controller.list(req, res); 
})






//-------------------------------------MODELS EXPORTS--------------------------
module.exports= router