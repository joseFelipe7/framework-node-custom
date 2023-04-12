const { Hashing } = require('../../../libs/App')
const Admin = require('../../models/Admin')
module.exports = {
    index:(req,res)=>{
        res.view('/manager/login.html', {title:'Sorteios'})
    },
    login:async (req,res)=>{
        try {
            const { email, password } = req.body
            
            const user = await Admin.getUserByEmail(email)
            
            if(!user) return res.json({message:'usuario nao encontrado'})

            if(!Hashing.compare(password, user.password)) return res.json({message:'senha incorreta'})

            req.session.userManager = user
            return res.redirect('/manager/sorteios')
        } catch (error) {  
            console.log(error)
        }
    },
    dashboard:(req,res)=>{
        res.view('dashboard.html', {title:'Sorteios'})
    }
    
}