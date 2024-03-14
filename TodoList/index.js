const express=require('express');
const path = require('path');
const mongoose = require('mongoose');
const Data = require("./models/data")
const cookieParser=require('cookie-parser')
const { checkForAuthenticationCookie} = require('./middlewares/authentication');
const methodOverride = require('method-override');

const app = express();
const port = 8000;

const userRoute = require("./routes/user")
const dataRoute = require("./routes/data")


app.set("view engine" , 'ejs'),
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(methodOverride('_method'));


mongoose.connect('mongodb://127.0.0.1:27017/TodoList').
then((e)=>console.log('mongodb connected'))


app.use("/user" , userRoute)
app.use("/data" , dataRoute)

app.get("/" , async (req ,res)=>{
    
    const allWorks= req.user ? await Data.find({createdBy:req.user._id}) : []
    res.render("home" ,{
        user:req.user,
        works:allWorks

    })
})


app.listen(port  , ()=>console.log(`server started at port:${port}`));