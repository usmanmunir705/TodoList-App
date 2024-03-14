const { getUser } = require("../services/auth");

function checkForAuthenticationCookie(cookieName){
    return (req ,res ,next)=>{
        const tokencookieValue = req.cookies[cookieName]
        if(!tokencookieValue){
        return next();
        }
        try {
            const user = getUser(tokencookieValue)
            
            req.user=user;
        } catch (error) {
            
        }
       return next();

    }
}

module.exports={
    checkForAuthenticationCookie
}