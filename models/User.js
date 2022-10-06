const { Timestamp } = require('mongodb');
const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
     
    userName:{
        type: String,
        required:true
       
    },
    password:{
        type: String,
        required:true
    },
    email:
    {
        type: String,
        required:true,
        unique:true
    },
       isAdmin:{
        type: String,
        default:false
       },
  
},{Timestamp:true}
);

module.exports=mongoose.model('User',UserSchema)