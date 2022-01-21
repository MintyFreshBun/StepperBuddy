const { response } = require('express');
const ModelUsers = require('../models/model_users'); 
const Users = ModelUsers.Users;

const ModelPartners = require('../models/model_partners')
const Partners = ModelPartners.Partners;

const ModelItems = require('../models/model_items')
const Items = ModelItems.Items;


const ModelAchive = require('../models/model_achivements')
const Achivements = ModelAchive.Achivements;




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
                height:0.00,
                weight:0.00,
                age:0,
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

                        newItems.save(function(err,newItem){
                            if (err) {
                                res.status(400).send(err); 
                            }

                            // add the newly added to the user's item array

                            Users.findByIdAndUpdate(newUser._id,{ $push: {items:newItem._id}}, function(err){
                                if (err) {
                                    res.status(400).send(err); 
                                }


                                const newPartner = new Partners({

                                    user_id: newUser._id,    
                                    level: 1, 
                                    exp: 0,
                                    skin: "default"
        
                                });
    
                                newPartner.save(function(err,newPartner){
    
                                    if (err) {
                                        res.status(400).send(err); 
                                    }
    
                                    Users.findByIdAndUpdate(newUser._id,{ $push: {partner:newPartner._id}},function(err){

                                        if (err) {
                                            res.status(400).send(err); 
                                        }
                                        //res.status(200).json("Registered New User");


                                        // now finally add the achivements , use model.Create for multitple ones
                                        // use an array to make it easyer

                                        let new_achivements = achivements_contruction(newUser._id);

                                        Achivements.create(new_achivements,function(err,new_achive){
                                            

                                            if (err) {
                                                res.status(400).send(err); 
                                            }

                                            Users.findByIdAndUpdate(newUser._id,{ $push: {achivements:new_achive}},function(err){

                                                 if (err) {
                                                    res.status(400).send(err); 
                                                }
                                                res.status(200).json("Registered New User");

                                            })

                                           
                                            



                                        })


                                        


                                    })
                                    
    
                                })

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
        
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }
            res.status(200).json(user); 
        }).populate('tasks').populate('achivements').populate('items').populate('partner')
    }) 

    
}


//----------Update user stats

const updateStats = (req, res) => {
    //find the user by id, but we first need to get it from the current logged Token 

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        
        

        Users.findByIdAndUpdate(result,req.body,function (err) {
            if (err) {
                res.status(400).send(err); 
            }
            res.status(200).send("user data updated");
        })}
    )
    
    
}



//---------------------Call functions so the request code doesnt get looooong-----

function achivements_contruction (logger_user_id){

    let achiv_array = [
        //Achivement km 1
        {
            user_id:logger_user_id,  
            title: "Bronze Runner" ,
            progress: 0,
            description: "Walk a total of 10 km",
            total: 10,
            type: "km",    
            complete: false
        },
        //Achivement km 2
        {
            user_id:logger_user_id,  
            title: "Silver Runner" ,
            description: "Walk a total of 100 km",
            progress: 0,
            total: 100,
            type: "km",    
            complete: false
        },
        //Achivement km 3
        {
            user_id:logger_user_id,  
            title: "Gold Runner" ,
            description: "Walk a total of 1000 km",
            progress: 0,
            total: 1000,
            type: "km",    
            complete: false
        },
        //Achivement steps 1------------------
        {
            user_id:logger_user_id,  
            title: "Daily Steps" ,
            description: "Take 10000 steps",
            progress: 0,
            total: 10000,
            type: "steps",    
            complete: false
        },
        //Achivement steps 2
        {
            user_id:logger_user_id,  
            title: "Weekly Steps" ,
            description: "Take 70000 steps",
            progress: 0,
            total: 70000,
            type: "steps",    
            complete: false
        },
        //Achivement steps 3
        {
            user_id:logger_user_id,  
            title: "Monthly Steps" ,
            description: "Take 300000 steps",
            progress: 0,
            total: 300000,
            type: "steps",    
            complete: false
        },
        //Achivement level 1----------------
        {
            user_id:logger_user_id,  
            title: "Just be beginning" ,
            description: "Reach level 3",
            progress: 0,
            total: 3,
            type: "level",    
            complete: false
        },

        //Achivement level 2
        {
            user_id:logger_user_id,  
            title: "Getting Stronger" ,
            description: "Reach level 10",
            progress: 0,
            total: 10,
            type: "level",    
            complete: false
        },

        //Achivement level 3
        {
            user_id:logger_user_id,  
            title: "Stronger , Faster" ,
            description: "Reach level 20",
            progress: 0,
            total: 20,
            type: "level",    
            complete: false
        },
        //Achivements partner level 1------------
        {
            user_id:logger_user_id,  
            title: "Hes growing" ,
            description: "Level up Partner to level 5",
            progress: 0,
            total: 5,
            type: "partner",    
            complete: false
        },

        //Achivements partner level 2
        {
            user_id:logger_user_id,  
            title: "Hes growing" ,
            description: "Level up Partner to level 10",
            progress: 0,
            total: 10,
            type: "partner",    
            complete: false
        },

        {
            user_id:logger_user_id,  
            title: "Hes growing" ,
            description: "Level up Partner to level 20",
            progress: 0,
            total: 20,
            type: "partner",    
            complete: false
        },

    ];



    return achiv_array;
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
