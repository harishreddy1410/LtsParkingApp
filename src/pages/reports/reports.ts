import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { ParkingTrafficViewModel } from '../../dto/ParkingTrafficViewModel';
import { ParkingTrafficApiProvider } from '../../providers/parking-traffic-api/parking-traffic-api';
import { LocationViewModel } from '../../dto/LocationViewModel';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { GlobalGenericService } from '../../services/globalgeneric.service';
@Component({
  templateUrl: 'reports.html'
})
export class ReportsPage {

  parkingTrafficViewModel: ParkingTrafficViewModel[];
  locations: LocationViewModel[];
  locationId: number = 0;
  currentDate: Date = new Date();
  fromDate: string = (new Date()).toISOString();
  toDate: string = "";
  tomorrow: Date = new Date();

  dtOptions: any = {};
  parkingReport: any = [];


  constructor(public navCtrl: NavController,
    public parkingTrafficApiProvider: ParkingTrafficApiProvider,
    private genericService: GlobalGenericService
  ) {

    this.tomorrow.setDate(this.currentDate.getDate() + 1);
    this.toDate = this.tomorrow.toISOString();

    this.genericService.GetLoggedInUserLocationId()
      .then(resp => {
        this.locationId = resp;
      })
      .catch(err => {
        console.log("Reports : Error while fetching location id")
        console.log(err);
      })
      .then(resp => {
        //Pull all the parking locations to populate drop down 
        this.parkingTrafficApiProvider.GetParkingLocations().subscribe(resp => {
          this.locations = [];
          Object.assign(this.locations, resp);
        })
      })
      .catch(err => {
        console.log("Reports : Error while fetching locations")
        console.log(err);
      })
      .then(resp => {
        //Populating the current days parking traffic on page load
        // let fromDateStr = this.fromDate.getFullYear() +'-'+ (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate();
        // let toDateStr = this.toDate.getFullYear() +'-'+ (this.toDate.getMonth() + 1) + '-' + this.toDate.getDate();

        this.parkingTrafficApiProvider.GetParkingReport(this.fromDate, this.toDate, this.locationId)
          .subscribe(report => {
            this.GenerateReportsDataTable(report);
          });
      }).catch(err => {
        console.log("Reports : Error while fetching parking traffic for current day")
        console.log(err);
      });    

    this.dtOptions = {
      pageLength: 10,
      // Use this attribute to enable the responsive extension
      responsive: true
    };
  }

  //Function used to get parking traffic in the given date range
  async GetParkingReports() {
    if (this.locationId == 0) {
      this.locationId = await this.genericService.GetLoggedInUserLocationId();
    }
    this.parkingTrafficApiProvider.GetParkingReport(this.fromDate, this.toDate, this.locationId).subscribe(report => {
      this.GenerateReportsDataTable(report);
    });
  }


  GenerateReportsDataTable(reportData: object) {    
    let someString: any = [];
    someString = reportData;
    if ($.fn.dataTable.isDataTable("#tblReports")) {
      $("#tblReports").DataTable().destroy();
    }
    $("#tblReports").DataTable({
      data: someString,
      columnDefs: [
        {"className": "dt-center", "targets": "_all"}
      ],
      columns: [
        {
          "data": "UserName"
        },
        {
          "data": "ParkingSlotId"
        },
        {
          "data": "VehicleNumber"
        },
        {
          "data": "InTime"
        },
        {
          "data": "OutTime"
        },
        {
          "data": "VehicleType"
        },
        {
          "data": "ParkingSlotType"
        }
      ]
    });
  }
}