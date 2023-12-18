const {getToken} = require('../services/user');
function restrictedLoggedUserOnly(req,res,next){
    const token = req.body.headers['x-access-token'];
    //console.log(token);
    if(!token){
        console.log('r1');
        return res.status(201).json({
            message:'please login'
        })
    }
    const user = getToken(token);
    if(!user){
        console.log('r2');
        return res.status(201).json({
            message:'please login'
        })
    }
    req.user = user;
    console.log('r3');
    next();
}
module.exports = {restrictedLoggedUserOnly};