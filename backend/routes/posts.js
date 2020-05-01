const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
// npm install --save multer used to parse body with form data like images(binary data)
// const multer=require('multer');
const checkAuth=require('../middleware/check-auth');

const PostController=require('../controllers/posts');


// const MIME_TYPE_MAP={
//     'image/jpeg':'jpg',
//     'image/jpg':'jpg',
//     'image/png':'png'
// };

// const storage=multer.diskStorage({
//     destination: (req,file,cb)=>{
//         const isValid=MIME_TYPE_MAP[file.mimetype];
//         let error=new Error('Invalid File type');
//         if(isValid){
//             error=null;
//         }
//         cb(error,'backend/images');
//     },
//     filename: (req,file,cb)=>{
//         const name=file.originalname.toLowerCase().split(' ').join('-');
//         const ext=MIME_TYPE_MAP[file.mimetype];
//         cb(null,name+'-'+(Date.now())+'.'+ext);
//     }

// });



// const upload=multer(
//     {
//         storage: storage,
//         limits:
//         {
//             fileSize: 1024*1024*10 //<10mb files only
//         }
// });


// router.get('/',PostController.getPosts);



router.post('/',checkAuth,/*upload.single('productImage'),*/PostController.createPost);

router.get('/:postId',PostController.getPost);

router.patch('/:postId',checkAuth,/*upload.single('productImage'),*/PostController.updatePost)
    
router.delete('/:postId',checkAuth  , PostController.deletePost );

module.exports=router;