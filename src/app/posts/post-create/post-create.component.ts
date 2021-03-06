import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl ,Validators} from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType} from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ServiceLayerService } from './service-layer.service';
import { Country } from './files/country.model';
import { State } from './files/state.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit,OnDestroy {
  selectedCountry:Country= new Country(0,'');
  countries: Country[];
  states: State[];
  date;

  

  isLoading=false;
  private mode='create';
  form: FormGroup;
  private postId:string; //for edit
  post:Post; //refers in create-component.html
  passengers_count:number=0;
  private authStatusSub:Subscription;

  constructor(public selectedService: ServiceLayerService,public postsService:PostsService,public route: ActivatedRoute , private authService:AuthService){} //activated route to identify whether its create or edit post
  
 

  ngOnInit(){
    this.isLoading=true;
    var d = new Date();
   var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

  this.date= [year, month, day].join('-');
    console.log(this.date)
    this.states=this.selectedService.getStates();
    // console.log(this.selectedService.getCountries)
    //  this.onSelect(this.selectedCountry.id);

    this.authStatusSub=this.authService.getAuthStatusListener()
      .subscribe(authStatus=>{
        this.isLoading=false;
      });
      this.isLoading=false;
    this.form=new FormGroup({
      
      state1: new FormControl(null,{
        validators: [Validators.required]
      }),
      state2: new FormControl(null,{
        validators: [Validators.required]
      }),
      booking_date: new FormControl(null,{
        validators: [Validators.required]
      })

    })
    
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId=paramMap.get('postId');
        this.isLoading=true;


        // this.post=this.postsService.getPost(this.postId);this  wont work anymore bcz we made getPost() as a observable so we need to subscribe to get that post
        this.postsService.getPost(this.postId)
        .subscribe(postData=>{
          this.isLoading=false;
          this.post= {
            id: postData._id,
            state1: postData.state1,
            state2: postData.state2,  
            booking_date: postData.booking_date,
            creator: postData.creator
          }; //to remove squigly lines we need to add the type to our get<> method of http params to tell what we expect from db 
          this.form.setValue({
            state1:this.post.state1,
            state2: this.post.state2,
            booking_date: this.post.booking_date

          }); //for edit option for value to be extracted from db
        
        })
      }
      else{
        this.mode='create';
        this.postId=null;
      }
    })
  }

  // valueIs(val){
  //   console.log(val)
  // }

  showBuses(val){
    console.log("post val :",val)

    document.getElementById('showBuses').style.display="block";
    document.getElementById('hide_seek1').style.display="block";
    document.getElementById('hide_seek2').style.display="block";

  }
 
  hideAgain(){
    document.getElementById('showBuses').style.display='none';
  }

  onSavePost(){

    if(this.form.invalid){
      return;
    }
    console.log(this.form.value)
    this.isLoading=true;
    if(this.mode==='create'){
    this.postsService.addPost(
      this.form.value.state1,
      this.form.value.state2,
      this.form.value.booking_date
      ); //title and content r from formControl names
    }
    // else{
    //   this.postsService.updatePost(this.postId,this.form.value.state1,this.form.value.state2,this.form.value.booking_date);
    // }
    this.form.reset();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
