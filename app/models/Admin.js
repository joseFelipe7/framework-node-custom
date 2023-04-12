const { Database } = require('../../libs/App')
class Admin{
    static async getUserByEmail(email){
        let result = await Database.query("SELECT * FROM admins WHERE email = ?", [email])
        return result.numRows?result.data[0]:false
    }
    static async insert(data){
        let dataInsert = [
            data.fisrtName,
            data.lastName,
            data.password
        ]
        return await Database.query("INSERT INTO admins SET name = ?, email = ?, password = ?", dataInsert)
        
    }
}
module.exports = Admin