import {Injectable} from '@angular/core';
import  {Subject} from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Ticket } from './ticket.model';
import { Card } from './card.model';

@Injectable({providedIn: 'root'})
export class PostsService{
    values:any[]=[];
    seatsArray:any[]=[];
    boardingState;
    destinationState;
    bookingDate;
    data;

    private posts: Ticket[]=[];
    private postsUpdated=new Subject<{posts:Ticket[],postCount:number}>();
    constructor(private http:HttpClient, private router:Router){}

    getPost(id:string) { //to get post for edit
        return this.http.get<{_id:string,state1:string,state2:string,booking_date:Date,creator : string}>('http://localhost:12000/posts/'+id);
        
    }

    getPassDetailsValues(){
        return this.values;
    }

    getPassDetailsSeatsArray(){
        return this.seatsArray;
    }
    getPosts(){

        this.http.get<{message: string,posts:any,maxPosts:number}>(
            'http://localhost:12000/ticket'
        )
        .pipe(map((postData)=>{
            return { posts: postData.posts.map(post=>{
                return {
                        _id: post._id,
                        name:post.name,
                        phoneno:post.phoneno,
                        gender:post.gender,
                        ticketcost:post.ticketcost,
                        seatno:post.seatno,
                        state1: post.state1,
                        state2: post.state2,
                        booking_date: post.booking_date,    
                         creator : post.creator
                };
            }),
                maxPosts:postData.maxPosts
            };
        }))
        .subscribe(transformedPostData=>{
            // console.log("test for creator chck :", transformedPostData)
            this.posts=transformedPostData.posts;
            this.postsUpdated.next({
                posts:[...this.posts],
                postCount:transformedPostData.maxPosts
            });
        });
        // return [...this.posts];
    }

    getPostsUpdateListener(){
        return this.postsUpdated.asObservable(); 
    }

    addPost(state1:string , state2: string, booking_date:Date){
        this.boardingState=state1;
        this.destinationState=state2;
        this.bookingDate=booking_date;
        console.log(this.boardingState,this.destinationState,this.bookingDate)
        const postData={state1:state1,state2:state2,booking_date:booking_date}
        console.log("post data:",postData)
        this.http.post<{message:string,post:Post}>('http://localhost:12000/posts',postData) //postid is from posts.js route where we update the id to fix the error of deleting the same post when added bug
            .subscribe((responseData)=>{
                this.router.navigate(['/seats']);
            });
    }

    submitPassengers(seats,formdata,price){
        this.seatsArray=seats;
        this.values.push(formdata);
        this.values.push(price);
        this.values.push(this.boardingState);
        this.values.push(this.destinationState);
        this.values.push(this.bookingDate)
        console.log('in service :',this.values,this.seatsArray);
        this.submitDataPassenger();
        // this.router.navigate(['/ticket']);
    }
    submitDataPassenger(){
        this.router.navigate(['/payment'])
        console.log('value are: ',this.values);
    }

    pay(values){
        const card:Card={card:values.card,expiry:values.expiry,code:values.code};
        this.http.post('http://localhost:12000/card',card)
            .subscribe(res=>{
                console.log(res,card)
                this.router.navigate(['/ticket']);
            });
        
    }

    // updatePost(id:string ,state1:string,state2:string,booking_date:Date){
    //     // const post:Post={id:id,title:title,content:content,productImage:null};
    //     // this.boardingState=state1;
    //     // this.destinationState=state2;
    //     // this.bookingDate=booking_date;
    //     const postData={id:id,state1:state1,state2:state2,booking_date:booking_date}
    //     // console.log("posdata is : ",postData)
            
    

    //     this.http.patch("http://localhost:12000/posts/"+id,postData)
    //     .subscribe(response=>{
    //         this.router.navigate(['/']);

    //     })
    // }

    saveTicket(name,phoneno,gender,ticketcost,seatno,state1,state2,booking_date,creator){
        const ticket:Ticket={name:name,phoneno:phoneno,gender:gender,ticketcost:ticketcost,seatno:seatno,state1:state1,state2:state2,booking_date:booking_date,creator:creator};
        this.data=ticket;
        this.http.post('http://localhost:12000/ticket',ticket).subscribe(result=>{
            alert('Ticket generated and message is sent for the same.');
        });
    }

}