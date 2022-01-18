const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,    
    candy: Number, 
    jam: Number

})

const Items = mongoose.model('Items', itemsSchema);

exports.Items = Items;