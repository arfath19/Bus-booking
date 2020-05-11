const TicketModel=require('../models/ticket');
const twilio = require('twilio');

exports.saveTicket=(req,res,next)=>{
  
    const ticket=new TicketModel({
        name: req.body.name,
        phoneno: req.body.phoneno,
        gender:req.body.gender,
        ticketcost:req.body.ticketcost,
        seatno:req.body.seatno,
        state1:req.body.state1,
        state2:req.body.state2,
        booking_date:req.body.booking_date,
        creator:req.userData.userId

    });
    const account_sid = '';
    const auth_token = '';
    var client = new twilio(account_sid, auth_token);
    client.messages.create({
                            body: `your ticket has been booked .Details are-
                            Name: ${ticket.name} ,
                            Phoneno : ${ticket.phoneno},
                            seat number: ${ticket.seatno },
                            Boarding State: ${ticket.state1},
                            Destination State: ${ticket.state2},
                            Travelling Date: ${ticket.booking_date}
                            and 
                            the price for ticket is ${ticket.ticketcost}       
                         `,
                         to :`+91${ticket.phoneno}`,
                         from :'+'
                     }).then(message=>(console.log(message.sid))).done();
    


    ticket.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Saved Successfully...',
            ticket: {
                ...result
            }
      
        });
    
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json({
            message: "Ticket Generation failed..Contact support"
        })
    });

    
};

exports.getTicket=(req,res,next)=>{
        let fetchedPosts;
    
        TicketModel.find()
        .exec()
        .then((docs)=>{
            fetchedPosts=docs;
            return TicketModel.count();
        })
        .then(count=>{
            const response={
                count: fetchedPosts.length,
                posts: fetchedPosts.map(doc=>{
                    return{
                        _id: doc._id,
                        name:doc.name,
                        phoneno:doc.phoneno,
                        gender:doc.gender,
                        ticketcost:doc.ticketcost,
                        seatno:doc.seatno,
                        state1: doc.state1,
                        state2: doc.state2,
                        booking_date: doc.booking_date,
                creator:doc.userId

                    }
                })
            };
            console.log(fetchedPosts);
            res.status(200).json({
                message:'Bookings fetched Successfully',
                posts:fetchedPosts,
                maxPosts:count
            });
        })
        .catch((err)=>{
           
            res.status(500).json({
               message:"Fetching bookings failed!"
            })
        })
    
}
