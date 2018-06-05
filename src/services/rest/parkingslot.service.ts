import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 

@Injectable()
export class ParkingSlotService{
    /**
     *
     */
    apiUrl = "http://192.168.56.1:88/";
    constructor(private http:Http) {
        
    }

    Get(parkingSlotId:number){
        var parkingSlot = this.http.get(this.apiUrl.concat("api/ParkingSlot")).map(res=>res.json());
        return parkingSlot;
    }
}