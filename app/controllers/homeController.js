const { Database, Hashing } = require('../../libs/App')
const Prize = require('../models/Prize')

module.exports = {
    index:async (req,res)=>{
        const userName = req.session.user.first_name
        const idUser = req.session.user.id
        
        const prizes = await Prize.getPrizesAvailable(idUser)
        
        const prizesParticipants = await Prize.getPrizesSubscribed(idUser)

        return res.view('prize_dawn.html',{title: 'Sorteios', prizes, prizesParticipants, userName})
    },
    subPrize:async (req,res)=>{
        
        const idUser = req.session.user.id

        const { id_prize:idPrize } = req.body

        await Prize.subscribePrize(idPrize, idUser)

        return res.redirect('/home')
    }
}