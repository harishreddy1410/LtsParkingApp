import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the ParkingTrafficApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingTrafficApiProvider {
  apiUrl = "http://10.1.50.123:88/";  
      httpOptions = {
        headers: new HttpHeaders({
          'ApiAuthToken': "4586E9EC-7CF1-4F9C-BFF4-3E626DEF9E4B"
        })
      };
      constructor(public http: HttpClient) {
        console.log('Hello ParkingTrafficApiProvider Provider');
      }
  // constructor(public http: HttpClient) {
  //   console.log('Hello ParkingTrafficApiProvider Provider');
  // }
      GetParkingReport(fromDate:string,toDate:string){
       return this.http.get(this.apiUrl.toString().concat("api/ParkingTraffic/Report/",fromDate.toString(),'/',toDate.toString()),this.httpOptions)

      }

      GetParkingLocations(){
        return this.http.get(this.apiUrl.toString().concat("api/ParkingTraffic/ParkingLocations"),this.httpOptions)
      }
}
