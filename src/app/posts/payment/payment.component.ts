import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public postsService:PostsService) { }

  ngOnInit(): void {
  }
  pay(form:NgForm){
    if(form.invalid){
      return;
    }
    this.postsService.pay(form.value);
  }
}
