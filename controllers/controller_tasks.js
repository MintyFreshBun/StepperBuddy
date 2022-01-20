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

                Users.findByIdAndUpdate(user._id,{ $push: {tasks:newTask._id}}, function(err,updatedUser){
                    if (err) {
                        res.status(400).send(err); 
                    }
                    res.status(200).json("Task has been created");
                    
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

const deleteTask = (req,res) =>{   

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }

            //--- delete task Tasks  from Logged user

            Tasks.findByIdAndDelete(req.query.task_id,function(err,){
                if (err) {
                    res.status(400).send(err); 
                }

                // now delete on users task array

                Users.findByIdAndUpdate(result ,{ $pull: {tasks: req.query.task_id }},function(err){

                    if (err) {
                        res.status(400).send(err); 
                    }
                    res.status(200).json("Task has been removed");

                })
        
                
            })
            

            

            
        })
    }) 
    
    


   

}

//-----------------Patch the tasks status 

const switchComplete = (req,res) => {

    // find user trough the token


    Tasks.findByIdAndUpdate(req.query.task_id,{'complete':req.body.status},function(err){
        if (err) {
            res.status(400).send(err); 
        }

        res.status(200).json("Task status has been updated");


    })



}





//---------EXPORTS OF THE FUCTION REQUESTS-------------
exports.addTask = addTask;
exports.findTasks = findTasks;
exports.deleteTask = deleteTask;
exports.switchComplete = switchComplete;

