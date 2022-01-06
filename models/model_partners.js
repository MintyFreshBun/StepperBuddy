const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({    
    level: String, 
    exp: Number,
    skin: String

})

const Partners = mongoose.model('partners', partnerSchema);

exports.Partners = Partners;