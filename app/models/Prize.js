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
    static async countList(filter,sort){
        let result = await Database.query(`SELECT 
                                            * FROM prize_dawn 
                                        WHERE ${filter} ${sort}`)
            return result.numRows
    }
    static async list(filter, sort, startPosition, perPage){
        let result = await Database.query(`SELECT 
                                            * FROM prize_dawn 
                                        WHERE ${filter} ${sort}
                                        LIMIT ${startPosition}, ${perPage}`)
        result = result.data
        return result
    }
    static async insert(data){
        let dataInsert = [
            data.title,
            data.prize,
            data.date,
            data.hour,
            data.description
        ]
        return await Database.query("INSERT INTO prize_dawn SET title = ?, prize = ?, date = ?, hour = ?, description = ?", dataInsert)
    }
    static async update(id, data){
        let dataUpdate = [
            data.title,
            data.prize,
            data.date,
            data.hour,
            data.description,
            id
        ]
        
        return await Database.query("UPDATE prize_dawn SET title = ?, prize = ?, date = ?, hour = ?, description = ? WHERE id = ?", dataUpdate)
    }
    static async delete(id){
        return await Database.query("UPDATE prize_dawn SET status_active = 0 WHERE id = ?", [id])
    }
}
module.exports = Prize