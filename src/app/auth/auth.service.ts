import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class AuthService{
    private token:string;

    private tokenTimer:any;
    private userId:string;
    private authStatusListener=new Subject<boolean>();
    private isAuthenticated=false;// we need this bcz when we login also we r not able to see the edit and delete buttons bcz oninit get the token but cant create the information it just pushes it after we login so we need to do it automatically without manually setting it
    //then we use getIsAuth method to send the value true or false based on token is registered
    constructor(private http:HttpClient, private router:Router){}
    
    getToken(){
        return this.token;
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    getUserId(){
        return this.userId;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(name:string,phoneno:number,gender:string,email:string,password:string,date:Date){
        const authData: AuthData={ name:name,phoneno:phoneno,gender:gender, email: email, password: password,date:date};
        this.http.post("http://localhost:12000/user/signup",authData)
            .subscribe(response=>{
                this.router.navigate(['/']);
            },error=>{
                this.authStatusListener.next(false);
            })
    }

    login(email:string,password:string){
        const authData:AuthData={name:null,phoneno:null,gender:null,email:email,password:password,date:null};
        this.http.post<{token:string, expiresIn:number, userId:string}>('http://localhost:12000/user/login',authData)
            .subscribe(response=>{
                const token=response.token;
                this.token=token;
                if(token){
                    const expiresInDuration=response.expiresIn;
                    // console.log(expiresInDuration);
                   this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated=true;
                    this.userId=response.userId;
                    this.authStatusListener.next(true);
                    const now=new Date();
                    const expirationDate=new Date(now.getTime()+expiresInDuration*1000);
                    this.saveAuthData(token,expirationDate,this.userId);
                    console.log(expirationDate)

                    this.router.navigate(['/']);
                }
              
            },error=>{
                this.authStatusListener.next(false);
            })
    }

    logout(){
        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        this.userId=null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);

    }
    //also we're call this mehtod from appComponent so that this is accessible when the page is loaded..
    //alos in headerComponent we chck if userIsAuthenticated on loaded  page so that if we have token then
    //just let him continue without logging him out

    autoAuthUser(){
        const authInformation=this.getAuthData();
        if(!authInformation){
            return; //if not logged in dont throw error just return back
        }
        const now =new Date();
        const expiresIn=authInformation.expirationDate.getTime()-now.getTime();
        // console.log(authInformation,expiresIn)
        if(expiresIn>0){
            this.token=authInformation.token;
            this.isAuthenticated=true;
            this.userId=authInformation.userId;
            this.setAuthTimer(expiresIn/1000);
            this.authStatusListener.next(true);

        }
    }
    
    //storage for browser (token and time)
    private saveAuthData(token:string,expirationDate:Date,userId:string){
        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expirationDate.toISOString());
        localStorage.setItem('userId',userId);
    }
    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');

    }

    private setAuthTimer(duration:number){
        console.log("Setting timer"+duration);
        this.tokenTimer= setTimeout(()=>{
            this.logout();  
        }, duration* 1000);
    }

    private getAuthData(){
        const token=localStorage.getItem('token');
        const expirationDate=localStorage.getItem('expiration');
        const userId=localStorage.getItem('userId');

        if(!token || !expirationDate){
            return;
        }

        return {
            token:token,
            expirationDate:new Date(expirationDate),
            userId: userId
        }
    }

}
