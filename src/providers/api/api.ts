import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParkingSlotViewModel } from '../../dto/ParkingSlotViewModel';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  apiUrl = "http://192.168.56.1:88/";  
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
  UpdateParkingSlot(parkingSlotViewModel:ParkingSlotViewModel)
  {
    return this.http.put(this.apiUrl.concat("api/ParkingSlot/"),parkingSlotViewModel,this.httpOptions)
  }
  CreateParkingSlot(parkingSlotViewModel:ParkingSlotViewModel)
  {
    return this.http.post(this.apiUrl.concat("api/ParkingSlot/"),parkingSlotViewModel,this.httpOptions);
  }
  
}
