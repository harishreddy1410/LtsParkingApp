import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalGenericService } from '../../services/globalgeneric.service';

/*
  Generated class for the ParkingAreaApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ParkingAreaApiProvider{    
    
    constructor(public http: HttpClient,private genericService:GlobalGenericService) {      
    }

    GetParkingLocations(){      
        return this.http.get(this.genericService.ltsParkingApiDomain.toString().concat("api/ParkingArea/GetParkingLocations"),this.genericService.httpOptions);
    }

    GetParkingLocationCompanies(locationId){
        return this.http.get(this.genericService.ltsParkingApiDomain.toString().concat("api/ParkingArea/GetLocationCompanies/",locationId),this.genericService.httpOptions);
    }

    GetParkingLocationDivisions(locationId){
        return this.http.get(this.genericService.ltsParkingApiDomain.toString().concat("api/ParkingArea/GetLocationParkingDivisions/",locationId),this.genericService.httpOptions);
    }
}