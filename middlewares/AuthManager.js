module.exports = (req,res,next)=>{
    
    if(!req.session.userManager) return res.redirect('/manager/login')
    next()
}