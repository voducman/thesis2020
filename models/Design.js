const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    designId: String,
    name: String,
    description: String,
    resolution: String,
    compiled: Boolean,
    runLink: String,
    createdTime: { type: Date, default: Date.now},
    lastModified: { type: Date, default: Date.now}
}, {
    collection: 'design',
});

userSchema.statics.getDesignIDBasedUNIXTime = function(){
    const date = new Date();
    return date.getTime();
}


module.exports = mongoose.model('design', userSchema);
