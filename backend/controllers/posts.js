const PostModel= require('../models/posts');


exports.createPost=(req,res,next)=>{
    // console.log(req.file);
    const url=req.protocol+"://"+req.get('host');
    const post=new PostModel({
        state1: req.body.state1,
        state2: req.body.state2,
        booking_date:req.body.booking_date,
        creator: req.userData.userId
    });
  
    post.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Saved Successfully...',
            post: {
                ...result,
                id: result._id
            }
          
        });
    
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json({
            message: "Booking failed!!"
        })
    });

    
};

// exports.updatePost=(req,res,next)=>{
 
//     const post=new PostModel({
//         _id:req.body.id,
//         state1:req.body.state1,
//         state2: req.body.state2,
//         booking_date: req.body.booking_date,
//         // creator: req.userData.userId
//     });
//     // console.log(post)

// PostModel.updateOne({ _id:req.params.postId/*, creator : req.userData.userId*/ }, post)
//     .then(result=>{
//         if(result.n > 0 ){ //cmg from mongodb result obj
//             console.log('Updated Booking successfully');    
//             res.status(200).json({ //try with 200 if any errors occurs
//                 message: 'Update Successful!'
//             })
//         }
//         else{
//             res.status(401).json({message: " Not Authorized"});
//         }
       
//     })
//     .catch(error=>{
//         res.status(500).json({message:"Couldnt' update Booking!"})
//     })
// };


