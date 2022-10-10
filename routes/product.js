const router = require("express").Router();
const Product = require("../models/Product");
const {  verifyTokenAndAdmin } = require("./verifyToken");

//Create New Product
router.post('/add', verifyTokenAndAdmin, async (req,res)=>{
const newProduct = new Product(req.body)
try{
    const savedProduct = await newProduct.save();
res.status(200).json(savedProduct);
console.log("Product saved successfully")
}catch(err){
    res.status(500).json(err);
    console.log("Product saving unsuccessful")
}
});

//Update a Product by ID
router.put('/update/:id', verifyTokenAndAdmin, async(req,res)=>
{

try {
   const updatedProduct= await Product.findByIdAndUpdate(req.params.id,
   {$set:req.body},
   {new:true}
   );
   res.status(200).json(updatedProduct);
}catch(err){
   res.status(500).json(err);
}



});

//Delete Product by ID
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res)=>{
   try{
await Product.findByIdAndDelete(req.params.id)
res.status(200).json("Product has been deleted Successfully")
   }catch(err){
res.status(500).json(err);
   }
});

//Get Products
router.get('/find/:id',  async (req, res)=>{                      
   try{
const product =await Product.findById(req.params.id);
res.status(200).json(product);                           //status code 200 means ok 
   }catch(err){
res.status(500).json(err);                             //status code 500 means internal server error
   }
});


//Get All Products
router.get('/find',  async (req, res)=>{
    const qNew =req.query.new;                          //if you write a ?new=true  in params it will store it in query
    const qCategory =req.params.category;
    try{
let products;
if(qNew){
    products =await Product.find().sort({createdAt: -1}).limit(5);

}else if (qCategory){
    products = await Product.find({
        categories:{$in: [qCategory],},
    });
}else {
    products = await Product.find();
}


 res.status(200).json(products)                     //status code 200 means ok 
    }catch(err){
 res.status(500).json(err);                             //status code 500 means internal server error
    }
 });


module.exports =router;
