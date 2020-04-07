const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    data: Object,
    createdTime: { type: Date, default: Date.now },

}, {
    collection: 'gateway',
});



module.exports = mongoose.model('gateway', userSchema);
