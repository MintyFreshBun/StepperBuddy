const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_users');



//-------------------------Register  new User

/**
 * @route POST /register
 * @group Users
 * @param {object} object.body - user's' credencials - ex. {username:"jake", password:"runner782", nickname:"run231"...}
 * @returns {object} 200 - Created User
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 406 - Duplicated User
 * @returns {Error} 404 - User Not found 
 */



router.post('/register', [
    body('username').notEmpty().escape(), 
    body('password').notEmpty().escape(),
    body('nickname').notEmpty().escape(),
    body('email').notEmpty().isEmail().escape(),
    body('height').notEmpty().isFloat().escape(),
    body('weight').notEmpty().isFloat().escape(),
    body('age').notEmpty().isNumeric().escape()
],  function (req, res) {
        const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.register(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})
//------------------------Login User

/**
 * @route POST /login
 * @group Users
 * @param {object} object.body - user credencials - ex. {username:"jake", password:"runner2234"}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 */

router.post('/login',  function (req, res) {
    controller.login(req, res); 
})


//-------------- get the users information

/**
 * @route GET /userinfo
 * @group Users
 * @returns {object} 200 - logged in User
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */



router.get('/userinfo',  function (req, res) {
    controller.loggedUser(req, res); 
})


//----------- Update the users information acording to the body

/**
 * @route Put /userUpdate
 * @group Users
 * @param {object} object.body  - Users updated status ex ( dailysteps:23 , exp:234 ... )
 * @returns {object} 200 - user data updated
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */


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