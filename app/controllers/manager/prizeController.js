const Prize = require('../../models/Prize')
module.exports = {
    index:(req,res)=>{
        return res.json({s:1})
    },
    new:(req,res)=>{

        return res.json({s:1})
    },
    insert:async (req,res)=>{
        // const { title, prize, date, hour, description} = req.body
        // const data = {
        //     title,
        //     prize,
        //     date,
        //     hour,
        //     description
        // }
        const data = {
            title:'premio titulo',
            prize:'premiozao',
            date:'2023-04-15',
            hour:'20:00',
            description:'dasasdojndasjnoasdj ndasjnasdjnkas djnkasdjn asdjnskadjn kasdjnkedwjnkjn ksajnkasjnkdjnkasdjnkasdjnk'
        }
        await Prize.insert(data)

        //return res.redirect('/manager/premios')
        return res.json({s:1})
    },
    edit:(req,res)=>{
        return res.json({s:1})
    },
    update:async (req,res)=>{
        // const { id, title, prize, date, hour, description} = req.body
        // const data = {
        //     title,
        //     prize,
        //     date,
        //     hour,
        //     description
        // }
        let id = 6
        const data = {
            title:'premio atualizado titulo',
            prize:'premiozao',
            date:'2023-04-15',
            hour:'20:00',
            description:'dasasdoj ndasjnoasdj ndasjnasdjnkas djnkasdjn asdjnskadjn kasdjnkedwjnkjn ksajnkasjnkdj nkasdjnkasdjnk'
        }
        
        await Prize.update(id, data)

        //return res.redirect('/manager/premios')
        return res.json({s:2})
    },
    delete:async (req,res)=>{
        // const { id } = req.body
        let id = 6
        await Prize.delete(id)

        //return res.redirect('/manager/premios')
        return res.json({s:1})
    }
}