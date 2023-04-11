const { Hashing } = require('../../libs/App')
const User = require('../models/User')
module.exports = {
    index:(req,res)=>{
        console.log(req.uiiiiiiiiiiiiiiiiiiiii)
        res.view('register.html', {title:'Login', uiiiii: 'ele gosta'})
    },
    register:async (req,res)=>{
        try {
            const { first_name, last_name, phone, email, password} = req.body

            const data = {
                fisrtName:first_name,
                lastName:last_name,
                email:email,
                phone:phone,
                password: Hashing.hash(password)
            }

            await User.insert(data)
            req.session.user = await User.getUserByEmail(email)
            return res.redirect('/home')
        } catch (error) {  
            console.log(error)
        }
        
    }
    
}