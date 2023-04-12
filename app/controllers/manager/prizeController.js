const Prize = require('../../models/Prize')
const { Database } = require('../../../libs/App')

module.exports = {
    index:(req,res)=>{
        return res.view('/manager/prizes.html', {title:'Sorteios'})
    },
    drawWinner:async (req,res)=>{
        let id = req.query.id
        let result = await Database.query(`SELECT * FROM prize_dawn_participants WHERE id_prize = ? order BY RAND() LIMIT 2`,[id])
       
        if(result.numRows > 1){
            let idUserwinner = result.data[0].id_user
            console.log(idUserwinner)
            await Database.query(`UPDATE prize_dawn SET id_winner = ? WHERE id = ?`,[idUserwinner,id])
        }
        
        return res.redirect('/manager/sorteios')
    },
    new:(req,res)=>{
        
        return res.view('/manager/prizesNew.html', {title:'Novo sorteios'})

    },
    insert:async (req,res)=>{
        const { title, prize, date, hour, description} = req.body
        const data = {
            title,
            prize,
            date,
            hour,
            description
        }
        
        await Prize.insert(data)

        return res.redirect('/manager/sorteios')
    },
    edit:async (req,res)=>{
        let idPrize = req.query.id
        let prize = await Prize.getById(idPrize)
        console.log(prize)
        if(!prize) return res.redirect('/manager/sorteios')
        const  data = {
            p_title:prize.title,
            p_prize: prize.prize,
            p_date: prize.date,
            p_hour:  prize.hour,
            p_description: prize.description
        }
        return res.view('/manager/prizesEdit.html', {title:'Edição de sorteio', idPrize, ...data})
    },
    update:async (req,res)=>{
        const { id, title, prize, date, hour, description} = req.body

        const data = {
            title,
            prize,
            date,
            hour,
            description
        }
        await Prize.update(id, data)

        return res.redirect('/manager/sorteios')
    },
    delete:async (req,res)=>{
        const { id } = req.query
        await Prize.delete(id)

        return res.redirect('/manager/sorteios')
    }
}