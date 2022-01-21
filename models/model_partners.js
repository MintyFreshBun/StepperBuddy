/**
 * @typedef Partners
 * @property {id} user_id.required
 * @property {interger} level.required
 * @property {interger} exp.required
 * @property {string} skin.required
 */


const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,    
    level: Number, 
    exp: Number,
    skin: String

})

const Partners = mongoose.model('Partners', partnerSchema);

exports.Partners = Partners;