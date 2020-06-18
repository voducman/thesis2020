const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    gatewayId: String,
    value: String,
    createdTime:  {type: Date, default: Date.now },
    lastModified: {type: Date, default: Date.now }
    
}, {
    collection: 'log',
});


module.exports = mongoose.model('log', userSchema);
