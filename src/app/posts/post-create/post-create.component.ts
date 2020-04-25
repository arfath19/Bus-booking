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


  isLoading=false;
  private mode='create';
  form: FormGroup;
  private postId:string; //for edit
  post:Post; //refers in create-component.html
  passengers_count:number=0;
  private authStatusSub:Subscription;

  constructor(public selectedService: ServiceLayerService,public postsService:PostsService,public route: ActivatedRoute , private authService:AuthService){} //activated route to identify whether its create or edit post
  
  ngOnInit(){
    this.states=this.selectedService.getStates();
    // console.log(this.selectedService.getCountries)
    //  this.onSelect(this.selectedCountry.id);

    this.authStatusSub=this.authService.getAuthStatusListener()
      .subscribe(authStatus=>{
        this.isLoading=false;
      });

    this.form=new FormGroup({
      
      state1: new FormControl(null,{
        validators: [Validators.required]
      }),
      state2: new FormControl(null,{
        validators: [Validators.required]
      }),
      passengers: new FormControl(null,{
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
            passengers: postData.passengers,
            creator: postData.creator
          }; //to remove squigly lines we need to add the type to our get<> method of http params to tell what we expect from db 
          this.form.setValue({
            state1:this.post.state1,
            state2: this.post.state2,
            passengers: this.post.passengers

          }); //for edit option for value to be extracted from db
        
        })
      }
      else{
        this.mode='create';
        this.postId=null;
      }
    })
  }

  
  // onSelect(countryid) {
  //   this.states = this.selectedService.getStates().filter((item) => item.countryid == countryid);
   
  // }

  // onImagePick(event:Event){
  //   // const file=event.target.files;gives error as TS doesnt know 
  //   // it is an html input type so we need to cast it
  //   const file=(event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   this.form.get('image').updateValueAndValidity();
  //   console.log(file);
  //   console.log(this.form);
  //   const reader=new FileReader();
  //   reader.onload=()=>{
  //     this.imagePreview=reader.result as string; //as it has 2 type string or arrayBuffer we r expeting string
  //   }
  //   reader.readAsDataURL(file); 

  // }



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
      this.form.value.passengers
      ); //title and content r from formControl names
    }
    else{
      this.postsService.updatePost(this.postId,this.form.value.state1,this.form.value.state2,this.form.value.passengers);
    }
    this.form.reset();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
