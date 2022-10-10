const mongoose=require('mongoose');
const ProductSchema=mongoose.Schema({
     
    title:{type: String,required:true,unique:true},
    description:{ type: String, required:true},
    img:{type: String, required:true},
    categories:{type: Array},  
    color:{ type: String},     
    size:{type: String},
    price:{type: Number}
},
{
    timestamps:true
});

module.exports=mongoose.model('Product',ProductSchema)