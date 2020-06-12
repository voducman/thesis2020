const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    gatewayId: String,
    name: String, 
    ipAddress: String,
    producer: String,
    type: String,
    protocol: String,
    description: String,
    createdTime:  {type: Date, default: Date.now },
    lastModified: {type: Date, default: Date.now }
    
}, {
    collection: 'plc',
});


module.exports = mongoose.model('plc', userSchema);
