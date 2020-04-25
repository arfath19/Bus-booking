import {Injectable} from '@angular/core';
import  {Subject} from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService{
    private posts: Post[]=[];
    private postsUpdated=new Subject<{posts:Post[],postCount:number}>();
    constructor(private http:HttpClient, private router:Router){}

    getPost(id:string) { //to get post for edit
        return this.http.get<{_id:string,state1:string,state2:string,passengers:number,creator : string}>('http://localhost:12000/posts/'+id);
        
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

    addPost(state1:string , state2: string, passengers:number){
        // const post:Post={id:null,title:title, content:content};
        const postData={state1:state1,state2:state2,passengers:passengers}
        
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
                this.router.navigate(['/']);
            });
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]); commented bcz it should add posts to local when it was succesful
    }


    updatePost(id:string ,state1:string,state2:string,passengers:number){
        // const post:Post={id:id,title:title,content:content,productImage:null};
        const postData={id:id,state1:state1,state2:state2,passengers:passengers}

            
    

        this.http.patch("http://localhost:12000/posts/"+id,postData)
        .subscribe(response=>{
            this.router.navigate(['/']);

        })
    }


    deletePost(postId:string){
        return this.http.delete("http://localhost:12000/posts/"+postId);
    }
}