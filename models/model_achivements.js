const mongoose = require('mongoose');

const achivementSchema = new mongoose.Schema({    
    title: String, 
    progress: Number,
    total: Number,
    complete: Boolean

})

const Achivements = mongoose.model('achivements', achivementSchema);

exports.Achivements = Achivements;