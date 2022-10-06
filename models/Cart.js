const mongoose=require('mongoose');
const ProductSchema=mongoose.Schema({
     
    useriD:{type: String,required:true,unique:true},
    products:[
        {
            productId:{
                    type: String, 
                    },
                    quantity:{
                        type:Number,
                        default: 1
                    },
                },],
},
{
    timeStamps:true
});

module.exports=mongoose.model('Product',ProductSchema)