module.exports = (req,res,next)=>{
    console.log(req.session)
    if(!req.session.userManager) return res.redirect('/manager/login')
    next()
}