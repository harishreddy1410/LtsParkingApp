import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the ParkingAreaApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ParkingAreaApiProvider{
    apiUrl = "http://10.1.50.123:88/";  
    httpOptions = {
      headers: new HttpHeaders({
        'ApiAuthToken': "4586E9EC-7CF1-4F9C-BFF4-3E626DEF9E4B"
      })
    };
    constructor(public http: HttpClient) {
      console.log('Hello ParkingAreaApiProvider Provider');
    }

    GetParkingLocations(){
        return this.http.get(this.apiUrl.toString().concat("api/ParkingArea/GetParkingLocations"),this.httpOptions)
    }

    GetParkingLocationCompanies(locationId){
        return this.http.get(this.apiUrl.toString().concat("api/ParkingArea/GetLocationCompanies/",locationId),this.httpOptions)
    }

    GetParkingLocationDivisions(locationId){
        return this.http.get(this.apiUrl.toString().concat("api/ParkingArea/GetLocationParkingDivisions/",locationId),this.httpOptions)
    }
}