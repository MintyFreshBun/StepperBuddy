// setting the conf for JTW 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 

const generateToken = (user_info, callback) => {
    let secret = process.env.JWT_KEY; 
    
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return callback(token); 
}

const validateToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    }
    let secret =  process.env.JWT_KEY; 
    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        if(error) {
            return callback(false);
        } else {
            return callback(true)
        }
    })
}

const getUserIdToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    }
    
    let secret =  process.env.JWT_KEY; 
    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        
        if(error) {
            return callback(null);
        } else {
            return callback(decoded.data.user)
        }
    })
}



exports.generateToken = generateToken
exports.validateToken = validateToken
exports.getUserIdToken = getUserIdToken