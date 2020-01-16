const mongoose = require('mongoose');

const cellarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    maxContent: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Cellar', cellarSchema);