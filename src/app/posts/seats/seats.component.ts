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
        // let dis=document.getElementById(`${this.random[i]}`).setAttribute('disabled',true);
        base.push(test);
        // disabled.push(dis);
    }
    // console.log(disabled)
      // disabled[0].setAttribute('disabled',true)
      console.log(base)
      for(let i=0;i<base.length;i++){
        console.log(base[i]);
        let test=base[i];
        test[0].classList.add('disabled');
        const disabling=(test[0].parentElement.parentElement);
        

    }


  }

count=1;

  valueCapture(val:any,event){
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
      if(this.farePrice>=901){
      
      
          document.getElementById('show1').style.display='block';
       
      } else{
        document.getElementById('show1').style.display="none"
      }

      if(this.farePrice>=1801){
      
      
          document.getElementById('show2').style.display='block';
       
      }
      else{
        document.getElementById('show2').style.display="none"
      }
      if(this.farePrice>=2701){
      
          document.getElementById('show3').style.display='block';
       
      }
      else{
        document.getElementById('show3').style.display="none"
      }
     
    }
    console.log('array val:  ',finalarr);

  }

  passengerDetails(form:NgForm){
    // console.log(this.selectedSeats)
      console.log("before submitting:",form.value)
      if(form.invalid){
        return;
      }
      this.formval.push(form.value);
  }

  fillDetails(){
    console.log("Fill: ",this.formval)
    if(this.formval.length)
    this.postsService.submitPassengers(this.selectedSeats,this.formval,this.farePrice)
  }

}
