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
    partner: [{ type:mongoose.Schema.Types.ObjectId, ref: 'partner' }],
    items: [{ type:mongoose.Schema.Types.ObjectId, ref: 'items' }],
    tasks: [{ type:mongoose.Schema.Types.ObjectId, ref: 'tasks' }],
    achivements: [{ type:mongoose.Schema.Types.ObjectId, ref: 'achivements' }],
    

})

const Users = mongoose.model('users', userSchema);

exports.Users = Users;