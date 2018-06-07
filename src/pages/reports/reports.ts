import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkingTrafficViewModel } from '../../dto/ParkingTrafficViewModel';
import { ParkingTrafficApiProvider } from '../../providers/parking-traffic-api/parking-traffic-api';
import { LocationViewModel } from '../../dto/LocationViewModel';
import { locateHostElement } from '@angular/core/src/render3/instructions';
@Component({
    templateUrl: 'reports.html'
  })
  export class ReportsPage {
    
    parkingTrafficViewModel:ParkingTrafficViewModel[];
    locations:LocationViewModel[];
    locationId:number = 0;
    fromDate:string;
    toDate:string;

    constructor(public navCtrl: NavController,
      public parkingTrafficApiProvider:ParkingTrafficApiProvider
    ) {
     

      this.parkingTrafficApiProvider.GetParkingReport('2018-05-05','2018-07-07').subscribe(report => {
        alert("Report");
        console.log(report);
      });

      //Pull all the parking locations to populate drop down 
      this.parkingTrafficApiProvider.GetParkingLocations().subscribe(resp=>{
        debugger
        this.locations=[];
        Object.assign(this.locations,resp);
        debugger
      })
    }
    
  }