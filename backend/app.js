const express=require('express');

const bodyParser= require('body-parser');

const app=express();
const morgan=require('morgan');

const postRoute=require('./routes/posts');
const userRoutes=require('./routes/user');


const path=require('path')
const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/BusBooking',{ useNewUrlParser: true , useUnifiedTopology: true }).then(res=>{
    console.log('Connected to MongoDb Successfully...!');
}).catch(err=>console.log("Failed to connect to MongoDb: ",err));

mongoose.Promise= global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//make upload folder publicly available to handle /upload req
app.use('/images',express.static(path.join("backend/images")));


//for cors errors
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
        res.header(
            'Access-Control-Allow-Headers',
            "Origin, X-Requested-With,Content-Type,Accept,Authorization"
        );
        if(req.method === 'OPTIONS'){
            res.header(
                'Access-Control-Allow-Methods',
                "GET,POST,PATCH,DELETE,OPTIONS"
            );
            return res.status(200).json({})
        }
        next(); //mandatory
})


app.use('/posts',postRoute);
app.use('/user',userRoutes);


app.use((req,res,next)=>{
    const error=new Error('Not found route ...');
    error.status= 404;
    next(error);

})
app.use((error,req,res,next)=>{
     res.status(error.status||500);
     res.json({
         error: {
             message: error.message
         }
     });
});


//body parser  for posting data using app.post method to db or some similar thing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// app.use((req,res,next)=>{
// //to support cross browser origin i.e 2 localhosts of diff ports to access contents b/w them
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         "Origin, X-Requested-With,Content-Type,Accept"
//     );
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         "GET,POST,PATCH,DELETE,OPTIONS"
//     );
//     next();
// })

// app.post('/api/posts',(req,res,next)=>{
//     const post=req.body;
//     console.log(post);
//     res.status(201).json({
//         message: 'POst Added !!!!!!!!!!'
//     }); //201 for everyting ok and new resource added successfully
// })


// app.get('/api/posts',(req,res,next)=>{ //can also use use()
//     const posts=[
//         {
//             id:'12rufjqlkf',
//             title: 'First post title',
//             content: 'Content !'
//         },
//         {
//             id:'2flkjoi1f9j',
//             title: 'Second post title',
//             content: 'Content !!!'
//         }
//     ]
//     res.status(200).json({
//         message: 'Posts fetch successful',
//         posts:posts
//     });

// })
module.exports= app;