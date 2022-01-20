const { response } = require('express');
const ModelUsers = require('../models/model_users'); 
const Users = ModelUsers.Users;

const ModelTasks = require('../models/model_task')
const Tasks = ModelTasks.Tasks;


// for decoding the token 
var jwt = require('jsonwebtoken');
require('dotenv').config();

const utilities = require('../util/utilities');
const bcrypt = require('bcrypt');



//---------------------------- Requests functions here-----------------

//----------POST: ADD new Task for LoggedUser
const addTask = (req, res) => {
    //find the user by id, but we first need to get it from the current logged Token 
    
    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }
            // after you find the user its time to set up the 

            const taskToCreate = new Tasks({
                user_id: user._id,
                description: req.body.description,
                complete: false
            })

            taskToCreate.save(function(err,newTask){
                if (err) {
                    res.status(400).send(err); 
                }

                // after the taks is created , add the task's id to the users task array

                Users.findByIdAndUpdate(user._id,{ $push: {tasks:newTask._id}}, function(err){
                    if (err) {
                        res.status(400).send(err); 
                    }
                    
                    // should i return the new array instead in order update the current one instead of doing 2 requests?
                    res.status(200).json("New task added");

                })



            })



        })
    }) 

    
    
    
}


//--------- GET: get the tasks from logged User

const findTasks = (req,res) => {

    // find user trough the token

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }

            //--- get Tasks  from Logged user

            Tasks.find({user_id:user._id},function(err,tasks){
                if (err) {
                    res.status(400).send(err); 
                }

                res.status(200).json(tasks);


            })


            
        })
    }) 

}


//------------DELETE: remove Tasks

const deleteTasks = (req,res) =>{

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }

            //--- find and delete the tasks with there ids

            


            
        })
    }) 

}





//---------EXPORTS OF THE FUCTION REQUESTS-------------
exports.addTask = addTask;
exports.findTasks = findTasks;

