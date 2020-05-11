import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  seat_number;
  farePrice;
  fares:any[]=[];
  random:number[]=[];
  genders1: string;
  genders2: string;
  genders3: string;
  genders4: string;
  formval:any[]=[];
  isLoading=false;
  genderType: string[] = ['Male', 'Female'];
  selectedSeats:any[]=[];
  constructor(public postsService:PostsService) { }

  ngOnInit(): void {
   
    for(let i=0;i<5;i++){
      this.random.push(Math.floor(Math.random()*(21-1+1)+1));

    }
    this.random=this.random.filter((a,b)=> (this.random.indexOf(a)===b));
   

    let base:any[]=[];
    let disabled:any[]=[];
    for(let i=0;i<this.random.length;i++){
        let test=document.querySelectorAll(`button[value="${this.random[i]}"] svg`);
        base.push(test);
    }
      console.log(base)
      for(let i=0;i<base.length;i++){
        console.log(base[i]);
        let test=base[i];
        test[0].classList.add('disabled');
        

    }


  }

count=1;

  valueCapture(val:any,event){
    let buttons=document.querySelectorAll(`button .disabled `);
    for(let i=0;i<buttons.length;i++){
      let button=buttons[i];
      button.parentElement.parentElement.toggleAttribute('disabled',true)

    }


    this.seat_number=val;



    let property=event.currentTarget;
    if(this.count===0){
      event.currentTarget.style.backgroundColor="#fff";
      this.count=1;
    }
    else{
      event.currentTarget.style.backgroundColor="#bada55";
      this.selectedSeats.push(this.seat_number);
      this.count=0;
    }



 
    const selected=document.querySelectorAll(`button[style="background-color: rgb(186, 218, 85);"]`);
    console.log(selected);
  
   
    this.calculateFare(selected.length);
  }


  calculateFare(val){
    this.farePrice=val*900;
    this.fares.push(val);
    let finalarr:any[]=[];
    finalarr.push(this.farePrice/900);
    for(let i=0;i<finalarr.length;i++){
      if(this.farePrice>0){
       
        document.getElementById('show').style.display='block';
      } else{
        document.getElementById('show').style.display="none"
      }

     
    }

  }

  passengerDetails(form:NgForm){
      if(form.invalid){
        return;
      }
      this.formval.push(form.value);
  }

  fillDetails(){
    if(this.formval.length)
    this.postsService.submitPassengers(this.selectedSeats,this.formval,this.farePrice)
  }

}
