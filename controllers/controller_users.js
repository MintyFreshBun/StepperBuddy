const { response } = require('express');
const ModelUsers = require('../models/model_users'); 
const Users = ModelUsers.Users;

const ModelPartners = require('../models/model_partners')
const Partners = ModelPartners.Partners;

const ModelItems = require('../models/model_items')
const Items = ModelItems.Items;




// for decoding the token 
var jwt = require('jsonwebtoken');
require('dotenv').config();

const utilities = require('../util/utilities');
const bcrypt = require('bcrypt');

//---------------------------- add the fuctions here for each request


// ----Registration of new User
//NOTE: for now we arent going to add the segments that require the other models for now for test purpases

const register = (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            
            // create new User and its other components
            const usertoCreate = new Users({ 
                username: req.body.username, 
                password: hash ,
                nickname: req.body.nickname,
                email:req.body.email,
                dailysteps: 0,
                totalsteps:0,
                calsburn: 0,
                distance: 0,
                level:0,
                exp: 0,
                partner:[],
                items:[],
                tasks:[],
                achivements:[]

            });

            

            // do a find to see if the username is taken
            Users.find({username: req.body.username}, function (err, user) {
                if (err) {
                    res.status(400).send(err); 
                }
        
                if(user.length > 0) {
                    res.status(406).send("Duplicated Username"); 
                } else {
                    usertoCreate.save(function (err, newUser) {
                        if (err) {
                            res.status(400).send(err); 
                        }
                        //res.status(200).json("Registered New User");
                        // after creating the user created the the others with the id of the user 
                        //check the id for testing
                        console.log(newUser._id);

                        const newItems = new Items({

                            user_id: newUser._id,    
                            candy: 0, 
                            jam: 0

                        });

                        newItems.save(function(err){
                            if (err) {
                                res.status(400).send(err); 
                            }

                            const newPartner = new Partners({

                                user_id: newUser._id,    
                                level: 1, 
                                exp: 0,
                                skin: "default"
    
                            });

                            newPartner.save(function(err){

                                if (err) {
                                    res.status(400).send(err); 
                                }

                                res.status(200).json("Registered New User");



                            })





                        })







                    })
                }
            })
        });
    });
} 


//----- Login User and get validation token
const login = (req, res) => {

    Users.find({username: req.body.username}, function (err, user) {
        if (err) {
            res.status(400).send(err); 
        }

        if(user.length > 0) {

            bcrypt.compare(req.body.password, user[0].password).then(function(result) {
                if(result) {
                    //confirm the id
                    
                    utilities.generateToken({user: user[0]._id}, (token) => {
                        res.status(200).json(token); 
                    })
                } else {
                    res.status(401).send("Not Authorized"); 
                }
            });
           
        } else {
            res.status(401).send("Not Authorized"); 
        }
       
    })
}




// ------ Get logged user
const loggedUser = (req, res) => {
    //find the user by id, but we first need to get it from the current logged Token 
    
    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(user); 
    })}) 

    
    
    
}


//----------Update user stats

const updateStats = (req, res) => {
    //find the user by id, but we first need to get it from the current logged Token 

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        

        Users.findByIdAndUpdate(result,req.body,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }
            res.status(200).send("user data updated");
        })}
    )
    
    
}














//---------------------- TEST REQUESTS FOR POSTMAN AND CHECKING --------------------------


const list = (req, res) => {
    //show all the user lists    
    Users.find(function (err, users) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(users); 
    }).populate('registos')
    
}




//---------EXPORTS OF THE FUCTION REQUESTS-------------
exports.register = register;
exports.list = list;
exports.login = login;
exports.updateStats = updateStats;
exports.loggedUser = loggedUser;
