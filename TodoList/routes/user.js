const {Router} = require('express');
const User = require("../models/user")
const router = Router()
const {setUser} = require("../services/auth")


router.get("/login" , (req, res)=> {
    return res.render("login")
})

router.get("/signup" , (req, res)=> {
    return res.render("signup")
})



router.post("/signup" , async (req , res)=>{
    const {fullName ,  email , password} = req.body;

    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/");
})

router.post("/login" , async (req , res)=>{
    const {email , password} = req.body;
    
    const user = await User.findOne({email, password});
    if(!user) return res.render('login',{
        error:"invalid Username or password",
    })
        
    const token = setUser(user);
    res.cookie("token" , token);
    return res.redirect("/");

})
router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})

module.exports = router;