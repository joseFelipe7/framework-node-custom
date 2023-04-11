const { Database, Hashing } = require('../../libs/App')
module.exports = {
    index:async (req,res)=>{
        //console.log(Hashing.compare('123', 'be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946'))
        console.log(req.session)
        // console.log(req.aaiiii)
        const userName = req.session.user.first_name
        const result = await Database.query(`SELECT 
                                                pd.*, 
                                                DATE_FORMAT(pd.date, '%d/%m/%Y') date, 
                                                CASE
                                                    WHEN DATEDIFF(CURDATE(),pd.updatedAt) = 0 THEN 'hoje'
                                                    ELSE DATEDIFF(CURDATE(),pd.updatedAt)
                                                    END AS 'lastUpdate' 
                                                FROM prize_dawn pd
                                                LEFT JOIN prize_dawn_participants pdp on pd.id = pdp.id_prize
                                                WHERE date >= curdate() AND id_winner is NULL AND pdp.id_user <> 1
                                                ORDER BY updatedAt DESC, date desc`)
        const prizes = result.data
        
        const resultParticipant = await Database.query(`SELECT 
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
                                                        WHERE date >= curdate() AND pdp.id_user = 1
                                                        GROUP BY pd.id
                                                        ORDER BY updatedAt DESC, date desc`)
        
        const prizesParticipants = resultParticipant.data

        return res.view('prize_dawn.html',{title: 'Sorteios', prizes, prizesParticipants, userName})
        return res.json({message:'voce esta logado', session:req.session, tt:req.aaiiii})
    },
    subPrize:async (req,res)=>{
        //console.log(Hashing.compare('123', 'be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946'))
        console.log(req.body)
        const idUser = req.session.user.id
        const { id_prize:idPrize } = req.body
        console.log(idPrize)
        console.log(idUser)
//        const result = await Database.query('INSERT INTO prize_dawn_participants SET id_prize = ?, id_user = ?',[idPrize, idUser]')

        return res.redirect('/home')
        // console.log(req.aaiiii)
        const userName = req.session.user.first_name
        const prizes = result.data

        const resultParticipant = await Database.query(`SELECT 
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
                                                        WHERE date >= curdate() AND pdp.id_user = 1
                                                        GROUP BY pd.id
                                                        ORDER BY updatedAt DESC, date desc`)
        //console.log(result.data)
        const prizesParticipants = resultParticipant.data

        //console.log(prizesParticipants)
        return res.view('prize_dawn.html',{title: 'Sorteios', prizes, prizesParticipants, userName})
        return res.json({message:'voce esta logado', session:req.session, tt:req.aaiiii})
    }
}