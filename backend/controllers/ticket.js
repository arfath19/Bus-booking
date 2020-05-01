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
        booking_date:req.body.booking_date

    });
    const account_sid = 'AC40f3810b7c7f9a84a38c1c15256b57fc';
    const auth_token = 'c79e673924b1cd06911848e1c640abb6';
    var client = new twilio(account_sid, auth_token);
    client.messages.create({
                            body: `your ticket has been booked .Details are- Name: ${ticket.name} , Phoneno : ${ticket.phoneno}, seat number: ${ticket.seatno }, Boarding State: ${ticket.state1}, Destination State: ${ticket.state2}, Travelling Date: ${ticket.booking_date} and the price for ticket is
                            ${ticket.ticketcost}       
                         `,
                         to :`+91${ticket.phoneno}`,
                         from :'+15183230418'
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