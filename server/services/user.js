const jwt = require('jsonwebtoken');
const secret_key = "Deepak@12$67&8";
function setToken(user){
     const token = jwt.sign(user,secret_key);
     return token; 
}
function getToken(token){
    console.log('get: ',token);
    const decoded = jwt.verify(token,secret_key);
    if(decoded){
        return true;
    }
    return false;
}
module.exports = {setToken,getToken};