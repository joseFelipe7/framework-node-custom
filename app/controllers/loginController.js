const { Hashing } = require('../../libs/App')
const User = require('../models/User')
module.exports = {
    index:(req,res)=>{
        //console.log(Hashing.compare('123', 'be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946'))
        console.log(req.session)
        // return res.json(req.session)
        res.view('index.html', {title:'Login', uiiiii: 'ele gosta'})
    },
    login:async (req,res)=>{
        try {
            console.log(req.body)
            const { email, password } = req.body
            
            const user = await User.getUserByEmail(email)
            
            if(!user) return res.json({message:'usuario nao encontrado'})

            if(!Hashing.compare(password, user.password)) return res.json({message:'senha incorreta'})
            
            req.session.user = user
            
            return res.redirect('/home')
        } catch (error) {  
            console.log(error)
        }
        
    },
    indexss:(req,res)=>{
        req.session.ussi = 'ta maluco'

        console.log(req.session)
        return res.json(req.session)

        res.view('index.html', {title:'olhe para o meu titulo', uiiiii: 'ele gosta'})
    }
}