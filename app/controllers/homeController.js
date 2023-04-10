const { Database, Hashing } = require('../../libs/App')
module.exports = {
    index:async (req,res)=>{
        //console.log(Hashing.compare('123', 'be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946'))
        // console.log(req.session)
        // console.log(req.aaiiii)
        const result = await Database.query(`SELECT 
                                                *, 
                                                DATE_FORMAT(date, '%d/%m/%Y') date, 
                                                CASE
                                                    WHEN DATEDIFF(CURDATE(),updatedAt) = 0 THEN 'hoje'
                                                    ELSE DATEDIFF(CURDATE(),updatedAt)
                                                    END AS 'lastUpdate' 
                                                FROM prize_dawn`)
        //console.log(result.data)
        const prizes = result.data
        return res.view('prize_dawn.html',{title: 'Sorteios', prizes})
        return res.json({message:'voce esta logado', session:req.session, tt:req.aaiiii})
    }
}