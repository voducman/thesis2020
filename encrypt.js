const crypto = require('crypto');
const { Buffer } = require('buffer');

function caculateHashKeyWithNonce(key, nonce){
    let hash; 
    let base64 = Buffer.from(key + nonce).toString('base64');
    hash = crypto.createHash("sha256").update(base64).digest('hex');
    return hash;
}

function encryptionWithAES256(plaintext, sessionKey){
    let utf8SessionKey = new Buffer(sessionKey,'hex');
    let cipher = crypto.createCipheriv('aes-256-ecb', utf8SessionKey, null);
    let crypted = cipher.update(plaintext, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}


function decryptionWithAES256(ciphertext, sessionKey){
    let utf8SessionKey = new Buffer(sessionKey,'hex');
    let decipher = crypto.createDecipheriv('aes-256-ecb', utf8SessionKey, null);
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports.caculateHashKeyWithNonce = caculateHashKeyWithNonce;
module.exports.encryptionWithAES256 = encryptionWithAES256;
module.exports.decryptionWithAES256 = decryptionWithAES256;