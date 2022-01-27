
const express = require('express'); 
const router = express.Router(); 
const { body,query, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_tasks');



//-----------------Routes segmenets ------------------

//-------------Get Users Tasks

/**
 * @route GET /getTasks
 * @group Tasks
 * @returns {object} 200 - User's tasks
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.get('/getTasks',function(req,res){
    controller.findTasks(req,res);
})


//-----------Post a new task----------------


/**
 * @route POST /newTask
 * @group Tasks
 * @param {object} object.body - Tasks description - ex. {description:"do the dishes"}
 * @returns {object} 200 - Task created
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 404 - User Not found 
 * @security Bearer
 */

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

/**
 * @route DELETE /deleteTask{task_id}
 * @group Tasks
 * @param {string} task_id.path - task's id 
 * @returns {object} 200 - Task deleted
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 404 - User Not found 
 * @security Bearer
 */

router.delete('/deleteTask',[
    query('task_id').notEmpty().escape(),
], function( req,res){
    const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.deleteTask(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
})
//------PATCH a tasks status------

/**
 * @route PATCH /taskStatus{task_id}
 * @group Tasks
 * @param {string} task_id.path - task's id 
 * @param {string} object.body - tasks status ex :{complete:true}
 * @returns {object} 200 - Task updated
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 404 - User Not found 
 * @security Bearer
 */



router.patch('/taskStatus',[
    body('status').notEmpty().isBoolean().escape(),
    query('task_id').notEmpty().escape(),   
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




