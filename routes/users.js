const router = require("express").Router();
const User = require("../models/User");
const Post= require('../models/User');
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

// router.get('/allusers', async (req , res)=>
// {
//  try {
//     const allUsers = await Post.find();
//     res.json(allUsers);
//     console.log(allUsers)
//  }catch(err){
//     res.json({message: err});
//     console.log("error")
//  }
// })

router.put('/:id', verifyTokenAndAuthorization, async(req,res)=>
{

if(req.body.password){

   req.body.password= CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
}
try {
   const updatedUser= await User.findByIdAndUpdate(req.params.id,
   {$set:req.body},
   {new:true}
   );
   res.status(200).json(updatedUser);
}catch(err){
   res.status(500).json(err);
}



});


module.exports =router;