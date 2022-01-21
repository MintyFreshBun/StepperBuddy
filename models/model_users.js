/**
 * @typedef users
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} nickname.required
 * @property {string} email.required
 * @property {integer} dailysteps.required
 * @property {integer} totalsteps.required
 * @property {number} calsburn.required
 * @property {number} distance.required
 * @property {integer} level.required
 * @property {integer} exp.required
 * @property {number} height.required
 * @property {number} weight.required
 * @property {interger} age.required
 * @property {array} partner.required
 * @property {array} items.required
 * @property {array} tasks.required
 * @property {array} achivements.required
 */


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String, 
    nickname: String,
    email:String,
    dailysteps: Number,
    totalsteps:Number,
    calsburn: {type:mongoose.Schema.Types.Decimal128},
    distance: {type:mongoose.Schema.Types.Decimal128},
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