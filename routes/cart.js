const router = require("express").Router();
const Cart = require("../models/Cart");
const {  verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//Create New Cart
router.post('/',  verifyTokenAndAuthorization, async (req,res)=>{
const newCart = new Cart(req.body)
try{
    const savedCart = await newCart.save();
res.status(200).json(savedCart);
console.log("Cart saved successfully")
}catch(err){
    res.status(500).json(err);
    console.log("Cart saving unsuccessful")
}
});

//Update a Cart
router.put('/update/:id',  verifyTokenAndAuthorization, async(req,res)=>
{

try {
   const updatedCart= await Cart.findByIdAndUpdate(req.params.id,
   {$set:req.body},
   {new:true}
   );
   res.status(200).json(updatedCart);
}catch(err){
   res.status(500).json(err);
}



});

//Delete Cart by ID
router.delete('/delete/:id',  verifyTokenAndAuthorization, async (req, res)=>{
   try{
await Cart.findByIdAndDelete(req.params.id)
res.status(200).json("Cart has been deleted Successfully")
   }catch(err){
res.status(500).json(err);
   }
});

//Get User Cart
router.get('/find/:userId',  verifyTokenAndAuthorization, async (req, res)=>{                      
   try{
const cart =await Cart.findOne({userId: req.params.userId});
res.status(200).json(cart);                           //status code 200 means ok 
   }catch(err){
res.status(500).json(err);                             //status code 500 means internal server error
   }
});


//Get All Carts
router.get('/', verifyTokenAndAdmin,  async (req, res)=>{
try{


    const carts = await Cart.find();
    res.status(200).json(carts);
}catch(err){
    res.status(500).json(err);
}
});

module.exports =router;
