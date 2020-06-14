module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.admin) {
            middleware(req,res,next) 
        } else {
            console.log(req)
            res.status(401).send('Usuário não é administrador')
        }
    }
}