const mongoose = require('mongoose');

const achivementSchema = new mongoose.Schema({  
    user_id: mongoose.SchemaTypes.ObjectId,  
    title: String, 
    progress: Number,
    total: Number,
    complete: Boolean

})

const Achivements = mongoose.model('Achivements', achivementSchema);

exports.Achivements = Achivements;