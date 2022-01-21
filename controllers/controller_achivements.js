const { response } = require('express');
const ModelUsers = require('../models/model_users'); 
const Users = ModelUsers.Users;


const ModelAchive = require('../models/model_achivements')
const Achivements = ModelAchive.Achivements;




// for decoding the token 
var jwt = require('jsonwebtoken');
require('dotenv').config();

const utilities = require('../util/utilities');
const bcrypt = require('bcrypt');

//---------------------------- add the fuctions here for each request


//-------------------GET logged user's Achivements

// Get Users Achivements

const getAchivements = (req,res) =>{ 
    // find user trough the token

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }

            //--- get the Achivements

            Achivements.find({user_id:user._id},function(err,Achivements){
                if (err) {
                    res.status(400).send(err); 
                }

                res.status(200).json(Achivements);


            })

            
        })
    }) 
  
    
}



//-------------------PUT: Update the Achivements data


// ----------update the achivement

const updateAchivements = (req,res) =>{

    Achivements.findByIdAndUpdate(req.query.achive_id,{'progress':req.body.progress, 'complete':req.body.status},function(err){
        if (err) {
            res.status(400).send(err); 
        }

        res.status(200).json("Achivement has been updated");


    })

    

}






//---------EXPORTS OF THE FUCTION REQUESTS-------------
exports.getAchivements = getAchivements;
exports.updateAchivements = updateAchivements;
