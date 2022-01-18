const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,    
    description: String, 
    complete: Boolean

})

const Tasks = mongoose.model('Tasks', tasksSchema);

exports.Tasks = Tasks;