import {Injectable} from '@angular/core';
import  {Subject} from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Ticket } from './ticket.model';

@Injectable({providedIn: 'root'})
export class PostsService{
    values:any[]=[];
    seatsArray:any[]=[];
    boardingState;
    destinationState;
    bookingDate;

    private posts: Post[]=[];
    private postsUpdated=new Subject<{posts:Post[],postCount:number}>();
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
    // getPosts(postsPerPage:number,currentPage:number){
    //     const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;

    //     this.http.get<{message: string,posts:any,maxPosts:number}>(
    //         'http://localhost:12000/posts'+queryParams
    //     )
    //     .pipe(map((postData)=>{
    //         return { posts: postData.posts.map(post=>{
    //             return {
    //                 state1: post.state1,
    //                 state2: post.state2,
    //                 id: post._id,
    //                 passengers: post.passengers,
    //                 creator : post.creator
    //             };
    //         }),
    //             maxPosts:postData.maxPosts
    //         };
    //     }))
    //     .subscribe(transformedPostData=>{
    //         // console.log("test for creator chck :", transformedPostData)
    //         this.posts=transformedPostData.posts;
    //         this.postsUpdated.next({
    //             posts:[...this.posts],
    //             postCount:transformedPostData.maxPosts
    //         });
    //     });
    //     // return [...this.posts];
    // }

    getPostsUpdateListener(){
        return this.postsUpdated.asObservable(); 
    }

    addPost(state1:string , state2: string, booking_date:Date){
        // const post:Post={id:null,title:title, content:content};
        this.boardingState=state1;
        this.destinationState=state2;
        this.bookingDate=booking_date;
        console.log(this.boardingState,this.destinationState,this.bookingDate)
        const postData={state1:state1,state2:state2,booking_date:booking_date}
        
        this.http.post<{message:string,post:Post}>('http://localhost:12000/posts',postData) //postid is from posts.js route where we update the id to fix the error of deleting the same post when added bug
            .subscribe((responseData)=>{
                // const post:Post={
                //     id:responseData.post.id,
                //     title:title,
                //     content:content,
                //     productImage:responseData.post.productImage
                // };
                // console.log(responseData.message);
                // // const id=responseData.postId;//post.id is updated with the new id when we add a new post 
                // // post.id=id;
                // this.posts.push(post);
                // this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/seats']);
            });
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]); commented bcz it should add posts to local when it was succesful
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
        this.router.navigate(['/ticket'])
        console.log('value are: ',this.values);
    }

    updatePost(id:string ,state1:string,state2:string,booking_date:Date){
        // const post:Post={id:id,title:title,content:content,productImage:null};
        // this.boardingState=state1;
        // this.destinationState=state2;
        // this.bookingDate=booking_date;
        const postData={id:id,state1:state1,state2:state2,booking_date:booking_date}
        // console.log("posdata is : ",postData)
            
    

        this.http.patch("http://localhost:12000/posts/"+id,postData)
        .subscribe(response=>{
            this.router.navigate(['/']);

        })
    }

    saveTicket(name,phoneno,gender,ticketcost,seatno,state1,state2,booking_date){
        const ticket:Ticket={name:name,phoneno:phoneno,gender:gender,ticketcost:ticketcost,seatno:seatno,state1:state1,state2:state2,booking_date:booking_date};
        this.http.post('http://localhost:12000/ticket',ticket).subscribe(result=>{
            alert('Ticket generated and message is sent for the same.');
        });
    }


    deletePost(postId:string){
        return this.http.delete("http://localhost:12000/posts/"+postId);
    }
}