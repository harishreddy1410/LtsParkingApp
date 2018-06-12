import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
/*
  Generated class for the ParkingSlotApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProfileApiProvider {
      
  apiUrl = "http://10.1.50.123:88/";  
  httpOptions = {
    headers: new HttpHeaders({
      'ApiAuthToken': "4586E9EC-7CF1-4F9C-BFF4-3E626DEF9E4B"
    })
  };
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  GetUserProfile(email:string)
  {
      return this.http.get(this.apiUrl.concat("api/userprofile/byemail/",email),this.httpOptions);
  }
      
}