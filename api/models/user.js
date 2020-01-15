const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    mail: String,
    password: String
})

module.exports = mongoose.model('User', userSchema);