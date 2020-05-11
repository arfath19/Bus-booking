const mongoose=require('mongoose');

const CardSchema=mongoose.Schema({
    card:{type:String,required:true},
    expiry:{type:String,required:true},
    code:{type: String,required:true}
});

module.exports=mongoose.model('Card',CardSchema);