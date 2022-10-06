const express = require('express');
const app =express();
const mongoose = require('mongoose');
require('dotenv/config');
const Post= require('./models/User');
const port =8080;
const userRoute =require('./routes/users');
const authRoute = require('./routes/auth')


// Its a middle ware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.set('veiw engine', 'ejs');

app.use('/user', userRoute);
app.use('/user/auth' ,authRoute);

//Routes
app.get('/', async (req , res)=>
{
    // res.render('index');
    // res.sendFile(path.join(__dirname+ '/index.ejs'));
    // res.send(`Hello , This is my first api working over port ${port}`);
 try {
    const allPosts = await Post.find();
    res.json(allPosts);
    console.log(allpostsb)
 }catch(err){
    res.json({message: err});
 }
});

app.get('/:22', async(req,res)=>
{
    //findOne() for any type of data
    //findById() will return data with the given id
    //find() to project all data
    // find({},{projection:{param1:0=>means no value of param1, param2:1means all param2 values}})
    try{
        const specific= await Post.find({},{projection:{firstName:0}});
        console.log(specific);
        res.json(specific);
    }catch(err)
    {
        res.json({message:err});
    }
})

app.delete('/:id', async (req,res)=>
{
    try{
        const removedPost= await Post.deleteMany({firstName:req.params.id});
        res.json(removedPost);
    }catch(err)
    {
        res.json({message:err});
    }
});

app.post('/' , async(req, res)=>
{   
    console.log('req.body', req.body);
     try{
const post= await new Post({
    iD: req.body.iD,
firstName:req.body.firstName,
secondName:req.body.secondName,
email:req.body.email,
phoneNumber:req.body.phoneNumber
});

post.save()
.then(data=>{
    res.json(data);
})
}catch(err){
    res.json({message: err})
}
// res.send(`Your username is ${req.body.firstName} ${req.body.secondName} && password is ${req.body.password} && phone number is ${req.body.phoneNo}`)
// console.log(req.body);
});


app.put('/:phone', async (req,res)=>
{

try{

    const update = await Post.updateMany({phoneNumber:req.params.phone},{$set:{phoneNumber:req.body.phoneNumber}});
    console.log(update)
    res.json(update);
}catch(err)
{
    res.json({message:err});
}
//    console.log(req.params.iD);
// const update =await Post.find(c=>c.phoneNumber===parseInt(req.params.phone))
// (!update)? res.status(404).send('The data with the given id was not found'):  
// console.log(update);
// const firstName = req.body.firstName;
// res.send(update);

});
//DB Connection
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log('Connected to DataBase!')
}).catch((err)=>{
    console.log(err);
})

//To listen on the port 
app.listen( port ,()=>{
    console.log(`Server started at http://localhost:${port}`)
});