
const mongoose=require('mongoose');

const Ticket=mongoose.Schema({
    name:{type:String,required:true},
    phoneno:{type:Number,required:true},
    gender:{type:String,required:true},
    ticketcost:{type:Number,required:true},
    seatno:{type:Number,required:true},
    state1:{type:String,required:true},
    state2:{type:String,required:true},
    booking_date:{type:Date,required:true}

});

module.exports= mongoose.model('Ticket',Ticket);
