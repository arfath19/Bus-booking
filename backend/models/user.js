const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const userSchema= mongoose.Schema({
   email:{ type: String,required:true,unique: true },
   password: {type: String,required: true},
   gender:{type:String,required:true},
   phoneno:{type:Number,required:true},
   name:{type:String,required:true},
   date:{type:Date,required:true}

});
userSchema.plugin(uniqueValidator);

module.exports= mongoose.model('User',userSchema);


//npm install --save mongoose-unique-validator
//npm install --save bcrypt