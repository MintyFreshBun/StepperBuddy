const { response } = require('express');
const ModelUsers = require('../models/model_users'); 
const Users = ModelUsers.Users;

const ModelItems = require('../models/model_items')
const Items = ModelItems.Items;


// for decoding the token 
var jwt = require('jsonwebtoken');
require('dotenv').config();

const utilities = require('../util/utilities');
const bcrypt = require('bcrypt');



//---------------------------- Requests functions here-----------------


// add items obtained

const addItems = (req,res) =>{

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }
            // after you find the user its time to set up the new item

            Items.findOneAndUpdate({user_id: user._id},{'candy':req.body.candy, 'jam':req.body.jam},function(err){
                if (err) {
                    res.status(400).send(err); 
                }
        
                res.status(200).json("Items updated");
        
        
            })





        })
    }) 

    

}


// Get items obtained

const getItems = (req,res) =>{
    

    // find user trough the token

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }

            //--- get items from logged user

            Items.find({user_id:user._id},function(err,Items){
                if (err) {
                    res.status(400).send(err); 
                }

                res.status(200).json(Items);


            })


            
        })
    }) 
    
    

}


//---------EXPORTS OF THE FUCTION REQUESTS-------------
exports.addItems = addItems;
exports.getItems = getItems;