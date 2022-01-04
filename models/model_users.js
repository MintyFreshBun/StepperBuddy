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
    partner: [{ type: Schema.Types.ObjectId, ref: 'Achive' }],
    items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Partners' }],
    achivements: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }],
    

})

const Users = mongoose.model('Users', userSchema);

exports.Users = Users;