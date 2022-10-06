const router = require("express").Router();
const Post= require('../models/User');
const CryptoJS = require("crypto-js");
const JWT =require("jsonwebtoken");
const User = require("../models/User");

router.post('/register' , async(req, res)=>
{   
   
try{
const post= new Post({
userName:req.body.name,
password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
email:req.body.email
});

const savedUser = await post.save();
res.status(201).json(savedUser);

}catch (err){
    res.json({message: err})
    console.log("error")
}
// res.send(`Your username is ${req.body.firstName} ${req.body.secondName} && password is ${req.body.password} && phone number is ${req.body.phoneNo}`)
// console.log(req.body);
});


router.post('/login' , async(req, res)=>{
try {
    const user =await User.findOne({userName:req.body.name});
    const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
    const Originalpassword =hashedPassword.toString(CryptoJS.enc.Utf8);
    Originalpassword!==req.body.password&& res.status(401).json("Wrong Credentials!");

    const accessToken = JWT.sign({
        id:user._id,
        isAdmin :user.isAdmin,

    },
    process.env.JWT_SEC,
    {expiresIn:"3d"}
    );
    const { password , ...others} = user._doc;
    res.status(200).json({...others, accessToken}); 
}catch(err){
    res.status(500).json(err);
    console.error();
}
});


module.exports = router;