const { response } = require('express');
const Model = require('../models/model_users'); 
const Users = Model.Users;

const utilities = require('../util/utilities');
const bcrypt = require('bcrypt');

//---------------------------- add the fuctions here for each request


// Registration of new User
//NOTE: for now we arent going to add the segments that require the other models for now for test purpases

const register = (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            
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
                partner: [],
                items: [],
                tasks: [],
                achivements: [],
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
                        res.status(200).json("Registered New User"); 
                    })
                }
            })
        });
    });
} 














//---------------------- TEST REQUESTS FOR POSTMAN AND CHECKING --------------------------


const list = (req, res) => {
    //show all the user lists    
    Users.find(function (err, users) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(users); 
    })
    
    
}




//---------EXPORTS OF THE FUCTION REQUESTS-------------
exports.register = register;
exports.list = list;
