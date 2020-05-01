import { Injectable } from '@angular/core';
import { Country } from './files/country.model';
import { State } from './files/state.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject }from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceLayerService {
  // private data:Country[]=[];
  private states_data:State[]=[];
  
  // private postUpdated=new Subject<Country[]>();

  constructor(private http:HttpClient) { }

  // getCountries(){
  //   return [
  //     new Country(1,'India'),
  //     new Country(2,'USA')
  //   ]
  //   // this.http.get<{message:string,data: Country[]}>('http://localhost:3000/api/add')
  //   // .subscribe((postData)=>{
  //   //     this.data= postData.data;

  //   //     // this.data=[...postData.data]; //try this one
  //   //     console.log(this.data);
  //   // });
  // }

  getStates(){
    return[
      new State(1,'Telangana'),
      new State(2,'Andhra'),
      new State(3,'Arunachal Pradesh'),
      new State(4,'Assam'),
      new State(5,'Bihar'),
      new State(6,'Chhattisgarh' ),
      new State(7,'Goa' ),
      new State(8,' Gujarat'),
      new State(9,'Haryana'),
      new State(10,'Himachal Pradesh'),
      new State(11,'Jharkhand'),
      new State(12,'Karnataka'),
      new State(13,'Kerala'),
      new State(14,'Haryana'),
      new State(15,'Madhya Pradesh'),
      new State(16,'Maharashtra'),
      new State(17,'Tamil Nadu')
    ]
  // this.http.get<{message:string,data:State[]}>('http://localhost:3000/api/add/states')
    // .subscribe((postData)=>{
    //   this.states_data=postData.data;
    //   console.log(this.states_data);

    // });
  }
}
