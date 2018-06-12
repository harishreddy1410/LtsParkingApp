import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalGenericService } from '../../services/globalgeneric.service';


/*
  Generated class for the ParkingTrafficApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingTrafficApiProvider {  
      constructor(public http: HttpClient,public genericService:GlobalGenericService) {        
      }
  
      GetParkingReport(fromDate:string,toDate:string,locationId:number){
       return this.http.get(this.genericService.ltsParkingApiDomain.toString().concat("api/ParkingTraffic/Report/",
       fromDate.toString(),'/',toDate.toString(),'/',locationId.toString()),this.genericService.httpOptions)

      }

      GetParkingLocations(){
        return this.http.get(this.genericService.ltsParkingApiDomain.toString().concat("api/ParkingTraffic/ParkingLocations"),this.genericService.httpOptions)
      }
}
