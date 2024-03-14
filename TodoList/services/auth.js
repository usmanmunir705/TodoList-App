const jwt=require('jsonwebtoken');

const secret = "superMan@123";

function setUser(user){
    const payLoad={
        fullName:user.fullName,
        _id:user.id,
        email:user.email,
    }
    const token = jwt.sign(payLoad,secret)
    return token;
}

function getUser(token){
    const payLoad = jwt.verify(token , secret)
    return payLoad;
}

module.exports={
    setUser,getUser
}