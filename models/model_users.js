const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String, 
    nickname: String,
    email:String,
    dailysteps: Number,
    totalsteps:Number,
    calsburn: Number,
    distance: Number,
    level:Number,
    exp: Number,
    height:{type:mongoose.Schema.Types.Decimal128},
    weight:{type:mongoose.Schema.Types.Decimal128},
    age:Number,    
    partner: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Partners' }],
    items: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Items' }],
    tasks: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Tasks' }],
    achivements: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Achivements' }],
    

})

const Users = mongoose.model('users', userSchema);

exports.Users = Users;  