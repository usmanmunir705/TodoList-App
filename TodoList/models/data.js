const {Schema , model} = require('mongoose');

const blogSchema = new Schema({
   
    body:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const Data = model("data",blogSchema);

module.exports=Data;