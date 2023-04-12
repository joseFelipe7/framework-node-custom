// const { Hashing } = require('../../../libs/App')
// const User = require('../models/User')
module.exports = {
    index:(req,res)=>{
        res.view('dashboard.html', {title:'Sorteios'})
    }
}