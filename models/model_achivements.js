const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const achivementSchema = new mongoose.Schema({  
    user_id: mongoose.SchemaTypes.ObjectId,  
    title: String,
    description: String, 
    progress: {type:mongoose.Schema.Types.Decimal128},
    total: {type:mongoose.Schema.Types.Decimal128},
    type: String,    
    complete: Boolean

})

const Achivements = mongoose.model('Achivements', achivementSchema);

exports.Achivements = Achivements;