const crypto = require('crypto');

const {salt, digest} = require('../config/hash');
const Hashing = {
    hash:(text)=>{
        const newHash = crypto.createHash('sha256').update(text + salt).digest(digest);
        return newHash
    },
    compare:(text, original)=>{
        const newHash = Hashing.hash(text)
        return (newHash === original) ?true:false
    }
}
module.exports = Hashing
// Gera um hash a partir da senha digitada e do salt da senha hasheada

