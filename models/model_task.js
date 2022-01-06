const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({    
    description: String, 
    complete: Boolean

})

const Tasks = mongoose.model('tasks', tasksSchema);

exports.Tasks = Tasks;