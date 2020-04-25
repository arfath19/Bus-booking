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
      new State(3,'Tamil Nadu'),
      new State(4,'Karnataka'),
      new State(5,'Kerala'),
      new State(6,'Alabama' ),
      new State(7,'Alaska' ),
      new State(8,' Kansas'),
      new State(9,'Hawaii'),
    ]
  // this.http.get<{message:string,data:State[]}>('http://localhost:3000/api/add/states')
    // .subscribe((postData)=>{
    //   this.states_data=postData.data;
    //   console.log(this.states_data);

    // });
  }
}
