import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  isLoading=false;
  private authStatusSub: Subscription;
  genders: string;
  genderType: string[] = ['Male', 'Female'];
  // startDate = new Date(1990, 0, 1);


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub =this.authService.getAuthStatusListener()
      .subscribe(authStatus=>{
        this.isLoading=false;
      });
  }
  onSignup(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true;
    this.authService.createUser(form.value.name,form.value.phoneno,form.value.gender,form.value.email,form.value.password,form.value.date);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
