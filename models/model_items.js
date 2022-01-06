const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({    
    candy: Number, 
    jam: Number

})

const Items = mongoose.model('items', itemsSchema);

exports.Items = Items;