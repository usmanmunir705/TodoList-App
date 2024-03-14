const {Router} = require('express');
const Data = require("../models/data")
const router = Router()


router.post("/" , async(req ,res )=>{
    const{data} = req.body;
if(!data) return res.redirect('/')

    await Data.create({
        body:data,
         createdBy:req.user._id
    })
    return res.redirect("/");
    
})
router.delete("/delete/:id" , async(req , res)=>{
    const id=req.params.id;
    console.log(id)
    await Data.findByIdAndDelete({_id:id})

   return res.redirect("/")

})


module.exports = router;
