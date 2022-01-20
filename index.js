require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose'); 
const app = express(); 
const port = process.env.PORT ||3000;
const host = process.env.HOST || 'localhost'; 
//----------- routes setup------------------------

// --user routes
const router_users = require('./routes/routes_users')
const router_tasks = require('./routes/routes_tasks')


//--Utilities for JWT
const utilities = require('./util/utilities')


//-----Authentication setup-------------
const auth = function(req, res, next) {
    console.log(req.url);
    // remeber some exceptions here are for testing ! remember to remove them later when your doing the cleaning and documentation!
    let exceptions = ['/users/login', '/users/register','/users/list']; 
    if(exceptions.indexOf(req.url) >= 0) {
        next(); 
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if(result) {
                next(); 
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    }
}


//-------express-Swagger-genetrator-------------

/* once its mostly complete start doing the swagger

const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./swagger_conf'); 
expressSwagger(options); 
*/

// ---- http://localhost:3000/api-docs use this to acess swagger

// -----------------middlewere routes-----------
app.use(express.json()); 

app.use(auth);
app.use('/users',router_users)
app.use('/tasks',router_tasks)


// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'Invalid Route' });
})
mongoose.connect(process.env.MONGOOSE_CONNECT)
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to MongoDB")
});

app.listen(port, () => {
    console.log(`Server Running!!! http://${host}:${port}`)
}) 