const Prize = require('../../models/Prize')
module.exports = {
    index:(req,res)=>{
        return res.view('/manager/prizes.html', {title:'Sorteios'})
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