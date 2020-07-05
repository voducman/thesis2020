const mongoose = require('mongoose');

let deviceSchema = mongoose.Schema({
    deviceId: String,
    secretKey: String,
    sessionKey: String,
    createdTime:  {type: Date, default: Date.now },
    lastModified: {type: Date, default: Date.now }
    
}, {
    collection: 'deviceKey',
})

deviceSchema.methods.isSessionKeyTimeValid = function(){
    return !(Date.now() - this.lastModified >= 12*60*60*1000);
}

deviceSchema.methods.updateSessionKey = function(updatedKey){
    this.sessionKey = updatedKey;
    this.lastModified = Date.now();
}

module.exports = mongoose.model('deviceKey', deviceSchema);

