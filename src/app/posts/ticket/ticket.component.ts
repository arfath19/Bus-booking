import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import * as Twilio from 'twilio';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  passDetailsValues:any[]=[];
  passDetailsSeatsArray:any[]=[];
  
  name;
  phoneno;
  gender;
  seatno;
  ticketcost;
  boardingState;
  destinationState;
  bookingDate;


  constructor(public postsService:PostsService) { }

  ngOnInit(): void {
    this.passDetailsValues=this.postsService.getPassDetailsValues();
    this.passDetailsSeatsArray =this.postsService.getPassDetailsSeatsArray();
    console.log('ticket :',this.passDetailsValues,this.passDetailsSeatsArray);
    
    if(this.passDetailsValues.length&&this.passDetailsSeatsArray){
      this.name=this.passDetailsValues[0][0].name1;
      this.phoneno=this.passDetailsValues[0][0].phoneno1;
      this.gender=this.passDetailsValues[0][0].gender1;
      this.ticketcost=this.passDetailsValues[1];
      this.seatno=this.passDetailsSeatsArray[0];
      this.boardingState=this.postsService.boardingState;
      this.destinationState=this.postsService.destinationState;
      this.bookingDate=this.postsService.bookingDate;
      // console.log(this.name,this.phoneno,this.gender,this.ticketcost,this.seatno,this.bookingDate,this.boardingState,this.destinationState);
      this.postsService.saveTicket(this.name,this.phoneno,this.gender,this.ticketcost,this.seatno,this.boardingState,this.destinationState,this.bookingDate);
    }

  }
  


}
