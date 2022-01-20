const { query } = require('express');
const express = require('express'); 
const router = express.Router(); 
const { body,param, validationResult } = require('express-validator'); 
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

router.delete('/deleteTask',[
    param('task_id').escape(),
], function( req,res){
    const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.deleteTask(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})
//------PATCH a tasks status------
router.patch('/taskStatus',[
    body('status').notEmpty().escape(),      
], function( req,res){
    const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.switchComplete(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }

})



//---------------------Exports here--------------
module.exports= router




