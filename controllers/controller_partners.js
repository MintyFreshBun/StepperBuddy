const { response } = require('express');
const ModelUsers = require('../models/model_users'); 
const Users = ModelUsers.Users;

const ModelPartner = require('../models/model_partners')
const Partners = ModelPartner.Partners


// for decoding the token 
var jwt = require('jsonwebtoken');
require('dotenv').config();

const utilities = require('../util/utilities');
const bcrypt = require('bcrypt');



//---------------------------- Requests functions here-----------------


// update partner levels and exp

const updatePartner = (req,res) =>{

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }
            // after you find the user its time to set up the new item

            Partners.findOneAndUpdate({user_id: user._id},{'exp':req.body.exp, 'level':req.body.level},function(err){
                if (err) {
                    res.status(400).send(err); 
                }
        
                res.status(200).json("Partner Stats updated");
        
        
            })
        })
    }) 

    

}


// patch partners skin

const updateSkin = (req,res) =>{

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }
            // after you find the user its time to set up the new item

            Partners.findOneAndUpdate({user_id: user._id},{'skin':req.body.skin},function(err){
                if (err) {
                    res.status(400).send(err); 
                }
        
                res.status(200).json("Partner Skin updated");
        
        
            })
        })
    }) 

    

}



// Get Users Partner

const getPartner = (req,res) =>{ 
    // find user trough the token

    utilities.getUserIdToken(req.headers.authorization,(result)=> { 
        console.log(result)
        Users.findById(result,function (err, user) {
            if (err) {
                res.status(400).send(err); 
            }

            //--- get partner from logged user

            Partners.findOne({user_id:user._id},function(err,Partner){
                if (err) {
                    res.status(400).send(err); 
                }

                res.status(200).json(Partner);


            })

            
        })
    }) 
  
    
}


//---------EXPORTS OF THE FUCTION REQUESTS-------------
exports.getPartner = getPartner;
exports.updatePartner = updatePartner;
exports.updateSkin = updateSkin