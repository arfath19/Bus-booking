const Card=require('../models/card');
const bcrypt=require('bcrypt');
exports.saveCard=(req,res,next)=>{
    bcrypt.hash(req.body.code,10)
        .then(hash=>{
            const card=new Card({
                card:req.body.card,
                expiry:req.body.expiry,
                code:hash
            });
            card.save()
                .then(result=>{
                    res.status(201).json({
                        message:'card saved ',
                        result:result
                    })
                })
                .catch(err=>{
                    res.status(500).json({
                            message: "Card doesnt exists"
                    });
                });
        })
}