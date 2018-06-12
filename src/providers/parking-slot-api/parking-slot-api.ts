import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ParkingSlotViewModel } from '../../dto/ParkingSlotViewModel';
/*
  Generated class for the ParkingSlotApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingSlotApiProvider {

  apiUrl = "http://10.1.50.123:88/";  
      httpOptions = {
        headers: new HttpHeaders({
          'ApiAuthToken': "4586E9EC-7CF1-4F9C-BFF4-3E626DEF9E4B"
        })
      };
      constructor(public http: HttpClient) {
        console.log('Hello ApiProvider Provider');
      }
      
      GetAllParkingSlots()
      {
        return this.http.get(this.apiUrl.concat("api/ParkingSlot"),this.httpOptions);
      }
      GetParkingSlot(id:number)
      {
        return this.http.get(this.apiUrl.concat("api/ParkingSlot/",id.toString()),this.httpOptions);
      }

      GetparkingSlotDetails(id:number){
        return this.http.get(this.apiUrl.concat("api/ParkingSlot/GetparkingSlotDetails/",id.toString()),this.httpOptions);
      }
      
      UpdateParkingSlot(parkingSlotViewModel:ParkingSlotViewModel)
      {
        return this.http.put(this.apiUrl.concat("api/ParkingSlot/"),parkingSlotViewModel,this.httpOptions)
      }
     
      CreateParkingSlot(parkingSlotViewModel:ParkingSlotViewModel)
      {
        return this.http.post(this.apiUrl.concat("api/ParkingSlot"),parkingSlotViewModel,this.httpOptions);
      }
      
      DeleteParkingSlot(id:number){
        return this.http.delete(this.apiUrl.concat("api/ParkingSlot/",id.toString()),this.httpOptions);
      }
     
      GetLocationParkingArea(locationId:number){        
          return this.http.get(this.apiUrl.concat("api/ParkingSlot/GetLocationParkingSlots/",locationId.toString()),this.httpOptions);  
      }
      OccupyParkingSlot(parkingSlotViewModel:ParkingSlotViewModel){
        return this.http.put(this.apiUrl.concat("api/ParkingSlot/OccupyUnoccupySlot"),parkingSlotViewModel,this.httpOptions);
      }

}
