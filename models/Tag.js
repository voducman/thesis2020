const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    gatewayId: String,
    plcId: String,
    name: String,
    type: String,
    scale: Number,
    offset: Number,
    minimum: Number,
    maximum: Number,
    dataType: String,
    unit: String,
    readOnly: Boolean,
    memoryAddress: String,
    deadBand: Number,
    alarm: Object,
    log: Boolean, 
    description: String,
    createdTime:  {type: Date, default: Date.now },
    lastModified: {type: Date, default: Date.now }
    
}, {
    collection: 'tag',
});

module.exports = mongoose.model('tag', userSchema);
