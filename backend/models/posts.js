const mongoose=require('mongoose');

const PostSchema= mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    state1: {type: String, required: true},
    state2: {type:String, required: true},
    passengers: {type:Number ,required:true},
    creator: {type: mongoose.Schema.Types.ObjectId,  ref: "User" ,required:true},

});

module.exports= mongoose.model('PostModel',PostSchema);
