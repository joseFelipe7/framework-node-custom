const { Database, Hashing } = require('../../libs/App')
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
            
            let result = await Database.query("SELECT * FROM users WHERE email = ?", [email])

            if(!result.numRows) return res.json({message:'usuario nao encontrado'})

            const user = result.data
            if(!Hashing.compare(password, user.password)) return res.json({message:'senha incorreta'})
            
            req.session.user = user
            
            return res.redirect('/')
            
            return res.json({message:'usuario logado com sucesso'})
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