const PostModel= require('../models/posts');



exports.createPost=(req,res,next)=>{
    // console.log(req.file);
    const url=req.protocol+"://"+req.get('host');
    const post=new PostModel({
        state1: req.body.state1,
        state2: req.body.state2,
        passengers:req.body.passengers,
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
            // ,
            // request:{
            //     type: 'GET',
            //     url:'http://localhost:3000/posts/'+result.postId
            // }
        });
    
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json({
            message: "Booking failed!!"
        })
    });

    
};

exports.updatePost=(req,res,next)=>{
    // let productImage=req.body.productImage;
    // if(req.file){
    //     const url=req.protocol+"://"+req.get('host');
    //     productImage= url+"/images/"+ req.file.filename

    // }
    const post=new PostModel({
        _id:req.body.id,
        state1:req.body.state1,
        state2: req.body.state2,
        passengers: req.body.passengers,
        creator: req.userData.userId
    });
    // console.log(post)

    PostModel.updateOne({ _id:req.params.postId, creator : req.userData.userId }, post)
    .then(result=>{
        if(result.n > 0 ){ //cmg from mongodb result obj
            console.log('Updated Booking successfully');
            res.status(200).json({ //try with 200 if any errors occurs
                message: 'Update Successful!'
            })
        }
        else{
            res.status(401).json({message: " Not Authorized"});
        }
       
    })
    .catch(error=>{
        res.status(500).json({message:"Couldnt' update Booking!"})
    })
};


// exports.getPosts=(req,res,next)=>{
//     const pageSize=+req.query.pagesize;
//     const currentPage=+req.query.page; //for turning into numbers for limit()
//     const postQuery=PostModel.find();
//     let fetchedPosts;
//     if(currentPage&&pageSize){
//         postQuery
//             .skip(pageSize*(currentPage-1))
//             .limit(pageSize);
//     }

//     postQuery.find()
//     .select(' title content _id productImage creator')
//     .exec()
//     .then((docs)=>{
//         fetchedPosts=docs;
//         return PostModel.count();
//     })
//     .then(count=>{
//         const response={
//             count: fetchedPosts.length,
//             posts: fetchedPosts.map(doc=>{
//                 return{
//                     title: doc.title,
//                     content: doc.content,
//                     productImage: doc.productImage,
//                     _id: doc._id,
//                     request:{
//                         type:'GET',
//                         url:"http://localhost:3000/posts/"+doc._id
//                     }
//                 }
//             })
//         };
//         console.log(fetchedPosts);
//         res.status(200).json({
//             message:'Posts fetched Successfully',
//             posts:fetchedPosts,
//             maxPosts:count
//         });
//     })
//     .catch((err)=>{
       
//         res.status(500).json({
//            message:"Fetching posts failed!"
//         })
//     })

// };


exports.getPost=(req,res,next)=>{
    const id=req.params.postId;
    PostModel.findById(id)
    .select(' state1 state2 _id passengers  creator')
    .exec()
    .then(post=>{
        console.log("Document found in MONGODB :",post);
        if(post){
            res.status(200).json(post)
        }
        else{
            res.status(404).json({message:'No valid entry with the provided Booking id in DB'});
        }
    })
    .catch((err)=>{
       
        res.status(500).json({
           message:"Fetching Booking details failed!"
        })
    })
   


    
};


exports.deletePost=(req,res,next)=>{
    const id=req.params.postId;
    PostModel.deleteOne({
        _id: id,
        creator: req.userData.userId
    })
    .exec()
    .then(result=>{
        if(result.n > 0 ){ //cmg from mongodb result obj n for delete
            console.log('Cancel request for Booking successfully');
            res.status(201).json({ //try with 200 if any errors occurs
                message: 'Deleted post Successfully!'
            })
        }
        else{
            res.status(401).json({message: " Not Authorized"});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: "Cancelling booking failed"
        })
    });
    
};
