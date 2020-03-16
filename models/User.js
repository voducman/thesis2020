const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

let userSchema = mongoose.Schema({
    local           : {
        email       : String,
        password    : String,
        username    : String,
        roles       : String,
        termCond    : Boolean,
        createdTime : { type: Date, default: Date.now },
        avatarLink   : String,
        company     : String,
        firstname   : String,
        lastname    : String,
        address     : String,
        city        : String,
        country     : String,
        postalCode  : String,
        aboutMe     : String
    },
    facebook        : {
        id          : String,
        token       : String,
        email       : String,
        name        : String,
    },
    twitter         : {
        id          : String,
        token       : String,
        displayName : String,
        userName    : String,
    },
    google          : {
        id          : String,
        token       : String,
        email       : String,
        name        : String,
    }
}, {
    collection: 'userInfo',
});


/*    Some methods to encrypt password   */
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

/*       Check if password is exit      */
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('userInfo', userSchema);
