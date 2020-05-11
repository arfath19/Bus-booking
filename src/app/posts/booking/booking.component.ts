import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import { Ticket } from '../ticket.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit,OnDestroy {
  isLoading=false;
  data:Ticket[]=[];
  private ticketsSub:Subscription;
  totalPosts;
  displayedColumns: string[] = ['state1', 'state2', 'booking_date', 'seatno','ticketcost'];

  constructor(private postsService:PostsService) { }

  

  ngOnInit(){
    this.isLoading=true;
    this.ticketsSub=this.postsService
    .getPostsUpdateListener()
    .subscribe((postData:{posts:Ticket[],postCount:number})=>{
      this.totalPosts=postData.postCount;
      this.data=postData.posts;
      this.isLoading=false;
    });

    this.postsService.getPosts();
  }

  // getData(){
  //   console.log(this.totalPosts);
  //   console.log(this.data)
  // }


  ngOnDestroy(){
    this.ticketsSub.unsubscribe();

  }
}
