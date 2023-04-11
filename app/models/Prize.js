const { Database } = require('../../libs/App')
class Prize{
    static async getPrizesAvailable(idUser){
        let result = await Database.query(`SELECT 
                                            pd.*, 
                                            DATE_FORMAT(pd.date, '%d/%m/%Y') date, 
                                            CASE
                                                WHEN DATEDIFF(CURDATE(),pd.updatedAt) = 0 THEN 'hoje'
                                                ELSE DATEDIFF(CURDATE(),pd.updatedAt)
                                                END AS 'lastUpdate' 
                                            FROM prize_dawn pd
                                            WHERE date >= curdate() AND id_winner is NULL 
                                            AND NOT EXISTS (SELECT 1
                                                            FROM prize_dawn_participants pdp
                                                            WHERE pd.id = pdp.id_prize
                                                            AND pdp.id_user = ?)
                                            ORDER BY updatedAt DESC, date desc`, [idUser])
        return result.numRows?result.data:[]
    }
    static async getPrizesSubscribed(idUser){
        let result = await Database.query(`SELECT 
                                                pd.*,
                                                u.first_name AS user_winner,
                                                DATE_FORMAT(pd.date, '%d/%m/%Y') AS date,
                                                COUNT(pdp.id) AS participants,
                                                CASE
                                                    WHEN DATEDIFF(CURDATE(),pd.updatedAt) = 0 THEN 'hoje'
                                                    ELSE DATEDIFF(CURDATE(),pd.updatedAt)
                                                    END AS 'lastUpdate' 
                                                    
                                            FROM prize_dawn pd
                                            LEFT JOIN prize_dawn_participants pdp on pd.id = pdp.id_prize
                                            LEFT JOIN users u ON u.id = pd.id_winner
                                            WHERE date >= curdate() AND pdp.id_user = ?
                                            GROUP BY pd.id
                                            ORDER BY updatedAt DESC, date desc`, [idUser])
        return result.numRows?result.data:[]
    }
   
    static async subscribePrize(idPrize, idUser){
        let result = await Database.query(`INSERT INTO prize_dawn_participants SET id_prize = ?, id_user = ?`,[idPrize, idUser])
        return result.insertId?true:false
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
module.exports = Prize