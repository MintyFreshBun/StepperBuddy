const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,    
    level: String, 
    exp: Number,
    skin: String

})

const Partners = mongoose.model('Partners', partnerSchema);

exports.Partners = Partners;