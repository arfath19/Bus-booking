import { Component,OnInit,OnDestroy } from '@angular/core';
import { Post } from '../post.model';

import { Subscription} from 'rxjs';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { Ticket } from '../ticket.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  // posts=[
  //   // {title: 'First Post', content:'this is the first post content '},
  //   // {title: 'Second Post', content:'this is the second post content'},
  //   // {title: 'Third Post', content:'this is the third post content'},
    
  // ];
  posts:Ticket[]=[]; // to display value in appcompo .html [posts] ...[ represents val to print from ts file]
  private postsSub:Subscription;
  isLoading=false;
  totalPosts= 0;
  postsPerPage=2;
  currentPage=1;
  pageSizeOptions=[1,2,5,10];
  userId:string;
  username:string;
  private authStatusSubs:Subscription;  //for token save and based on authentication we show edit or delte buttons
  
  public userIsAuthenticated;//for token save and based on authentication we show edit or delte buttons

  constructor(public postsService: PostsService, private authService:AuthService) { }

  ngOnInit() {
    this.isLoading=true;
    this.userId=this.authService.getUserId();

    console.log("user id is ;",this.userId)
    console.log(this.userId)
    this.postsSub=this.postsService
    .getPostsUpdateListener()
    .subscribe((postData:{posts:Ticket[],postCount:number})=>{
      this.isLoading=true;
      this.totalPosts=postData.postCount;
      this.posts=postData.posts;
    });
    this.isLoading=false;
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authStatusSubs=this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated=>{
        this.isLoading=false;
        this.userIsAuthenticated=isAuthenticated; 
        this.userId=this.authService.getUserId();
      });

  } 


  
  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }
} 
