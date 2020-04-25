import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}
    intercept(req:HttpRequest<any>,next:HttpHandler){ //next represents to continue in sequence like before but of handler type to check for token and forward to next elements
        const authToken=this.authService.getToken();
        const authRequest=req.clone({
            headers:req.headers.set('Authorization',"Bearer "+ authToken) //Authorization coming from check-auth.js file(authorization)
        }); // we need bearer as its a convention used for api's
        return next.handle(authRequest);
    }
}