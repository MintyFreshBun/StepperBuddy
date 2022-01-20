const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_tasks');



//-----------------Routes segmenets ------------------

//-------------Get Users Tasks

router.get('/',function(req,res){
    controller.findTasks(req,res);
})


//-----------Post a new task----------------

router.post('/newTask', [
    body('description').notEmpty().escape(),    
],  function (req, res) {
        const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.addTask(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})


//----------DELETE tasks------------


//------PATCH a tasks status------




//---------------------Exports here--------------
module.exports= router




