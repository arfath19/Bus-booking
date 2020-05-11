import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
}) 
export class HeaderComponent implements OnInit,OnDestroy { 
  //we're saving the status of the subscription i.e subject from service so that 
  // we can save the status of the token so that we can identify whether the user is authenticated or not  
  private authListenerSubs:Subscription;
  userIsAuthenticated=false;
  username:string;  

  constructor(private authService :AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated=this.authService.getIsAuth(); // we call this to chck if authenticated ..
    //and save the token in localstorage of browser
    this.username=this.authService.getUsername();

    this.authListenerSubs=this.authService.getAuthStatusListener()
      .subscribe((isAuthenticated)=>{
        this.userIsAuthenticated=isAuthenticated;
        this.username=this.authService.getUsername();

      });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  onLogout(){
     this.authService.logout();
  }

}
