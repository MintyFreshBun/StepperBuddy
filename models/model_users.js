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
    partner: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
    items: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Items' }],
    tasks: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Tasks' }],
    achivements: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Achive' }],
    

})

const Users = mongoose.model('users', userSchema);

exports.Users = Users;