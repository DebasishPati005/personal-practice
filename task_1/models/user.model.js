const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required:true},
    phoneNumber:{type:Number},
    role:{type:String,default:"user"},
    email: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

module.exports = User;