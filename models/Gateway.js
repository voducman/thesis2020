const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    uniqueId: String,
    name: String,
    address: String,
    scanTime: Number,
    longitude: Number,
    latitude: Number,
    description: String,
    createdTime:  {type: Date, default: Date.now },
    lastModified: {type: Date, default: Date.now }

}, {
    collection: 'gateway',
});



module.exports = mongoose.model('gateway', userSchema);
