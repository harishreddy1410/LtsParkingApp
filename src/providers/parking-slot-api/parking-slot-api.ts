import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ParkingSlotViewModel } from '../../dto/ParkingSlotViewModel';
import { GlobalGenericService } from '../../services/globalgeneric.service';

/*
  Generated class for the ParkingSlotApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingSlotApiProvider {

      constructor(public http: HttpClient,private genericService:GlobalGenericService) {        
      }
      
      GetAllParkingSlots()
      {
        return this.http.get(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot"),this.genericService.httpOptions);
      }
      GetParkingSlot(id:number)
      {
        return this.http.get(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot/",id.toString()),this.genericService.httpOptions);
      }

      GetparkingSlotDetails(id:number){
        return this.http.get(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot/GetparkingSlotDetails/",id.toString()),this.genericService.httpOptions);
      }
      
      UpdateParkingSlot(parkingSlotViewModel:ParkingSlotViewModel)
      {
        return this.http.put(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot/"),parkingSlotViewModel,this.genericService.httpOptions)
      }
     
      CreateParkingSlot(parkingSlotViewModel:ParkingSlotViewModel)
      {
        return this.http.post(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot"),parkingSlotViewModel,this.genericService.httpOptions);
      }
      
      DeleteParkingSlot(id:number){
        return this.http.delete(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot/",id.toString()),this.genericService.httpOptions);
      }
     
      GetLocationParkingArea(locationId:number){                
          return this.http.get(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot/GetLocationParkingSlots/",locationId.toString()),this.genericService.httpOptions);  
      }
      OccupyParkingSlot(parkingSlotViewModel:ParkingSlotViewModel){
        return this.http.put(this.genericService.ltsParkingApiDomain.concat("api/ParkingSlot/OccupyUnoccupySlot"),parkingSlotViewModel,this.genericService.httpOptions);
      }

}
