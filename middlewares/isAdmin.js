function isAdmin(req, res, next){
    if(req.user.role !== 'ADMIN_ROLE'){
        return res.status(403).send({
        msg: 'No posee autorización'
        })
    }
    next();
}
module.exports = isAdmin ;