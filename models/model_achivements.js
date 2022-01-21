
/**
 * @typedef Achivements
 * @property {id} user_id.required
 * @property {string} title.required
 * @property {string} description.required
 * @property {number} progress.required
 * @property {number} total.required
 * @property {string} type.required
 * @property {boolean} complete.required
 */
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