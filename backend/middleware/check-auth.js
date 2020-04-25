const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];//[1] gets the token as after split the token is in 1 placed array
        const decodedToken=jwt.verify(token,"secret_this_should_be_longer");
        req.userData={email: decodedToken.email, userId: decodedToken.userId};
        next();
    }
    catch(error){
        res.status(401).json({
            message: "You are not authenticated.."
        });
    }
};