const { Database } = require('../../libs/App')
class User{
    static async getUserByEmail(email){
        let result = await Database.query("SELECT * FROM users WHERE email = ?", [email])
        return result.numRows?result.data:false
    }
}
module.exports = User