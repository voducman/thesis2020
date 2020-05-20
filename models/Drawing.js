const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    designId: String,
    drawing: String,
    createdTime: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }

}, {
    collection: 'drawing',
});

module.exports = mongoose.model('drawing', userSchema);
