const { Database } = require('../../libs/App')
class User{
    static async getUserByEmail(email){
        let result = await Database.query("SELECT * FROM users WHERE email = ?", [email])
        return result.numRows?result.data[0]:false
    }
    static async insert(data){
        let dataInsert = [
            data.fisrtName,
            data.lastName,
            data.email,
            data.phone,
            data.password
        ]
        return await Database.query("INSERT INTO users SET first_name = ?, last_name =?, email = ?, phone = ?, password = ?", dataInsert)
        
    }
}
module.exports = User