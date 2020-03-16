const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    gateway: Array,
    createdTime: { type: Date, default: Date.now },

}, {
    collection: 'gateway',
});

/*
gateway: [{
    gateName: String,
    status: Boolean,
    devices: Array,
    numTag: Int,
    modified: Date,
    createdTime: Date,

}]
*/


module.exports = mongoose.model('gateway', userSchema);
