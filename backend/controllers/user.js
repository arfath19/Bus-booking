const bcrypt=require('bcrypt');
const User=require('../models/user');
const jwt=require('jsonwebtoken');

exports.createUser= (req,res,next)=>{
    bcrypt.hash(req.body.password,10 )
        .then(hash=>{
            const user=new User({
                email: req.body.email,
                password:hash,
                gender:req.body.gender,
                phoneno:req.body.phoneno,
                name:req.body.name,
                date:req.body.date
            });
            user.save()
                .then(result=>{
                    res.status(201).json({
                        message: "User Created !!",
                        result:result
                    })
                })
                .catch(err=>{
                    res.status(500).json({
                            message: "Invalid authentication Credentials! User Already exists"
                    });
                });
        });  

   
}


exports.userLogin=(req,res,next)=>{
    let fetchedUser;
    User.findOne({ email:req.body.email })
        .then(user=>{
            // console.log(user);
            if(!user){
                return res.status(401).json({
                    message: 'Authentication failed',

                });
            }
            fetchedUser=user;
        return bcrypt.compare(req.body.password, user.password)         
        }).then(result=>{
            // console.log(result);
            if(!result){
                return res.status(401).json({
                    message: 'Authorization Failed'
                })
            }
            const token=jwt.sign(
                {email:fetchedUser.email,userId:fetchedUser._id},
                'secret_this_should_be_longer',
                { expiresIn: "1h" },
                {username:fetchedUser.username}
            );
            console.log(token,fetchedUser);
            res.status(200).json({
                token:token,
                expiresIn: 3600, //seconds
                userId: fetchedUser._id,
                username:fetchedUser.name
            })
        })
        .catch(err=>{
            return res.status(401).json({
                message:'Invalid Authentication Credentials..'
            })
        })
}