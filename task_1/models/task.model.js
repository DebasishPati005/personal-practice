const mongoose = require('mongoose');
const User = require('./user.model');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdBy:{type:mongoose.Types.ObjectId,required:true,ref:User}
},{timestamp:true});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;