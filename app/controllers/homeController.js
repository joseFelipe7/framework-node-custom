module.exports = {
    index:(req,res)=>{
        req.session.ui = 'sdadsa'
        console.log(req.session)
        res.view('index.html', {title:'olhe para o meu titulo', uiiiii: 'ele gosta'})
    },
    indexss:(req,res)=>{
        req.session.ussi = 'ta maluco'

        console.log(req.session)
        res.view('index.html', {title:'olhe para o meu titulo', uiiiii: 'ele gosta'})
    }
}