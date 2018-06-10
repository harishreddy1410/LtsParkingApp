import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, List } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ParkingAreaApiProvider } from '../../providers/parking-area-service/parking-service-api';
import { ParkingSlotApiProvider } from '../../providers/parking-slot-api/parking-slot-api';
import { LocationViewModel } from '../../dto/LocationViewModel';
import { CompanyViewModel } from '../../dto/CompanyViewModel';
import { ParkingDivisionViewModel } from '../../dto/ParkingDivisionViewModel';
import { ParkingSlotViewModel } from '../../dto/ParkingSlotViewModel';
import { ViewOrContainerState } from '@angular/core/src/render3/interfaces';
import { GlobalGenericService } from '../../services/globalgeneric.service';


@Component({
  templateUrl: 'slots.html'
})
export class SlotsPage {
  addSlotForm: FormGroup;

  locationId: number = 0;
  companyId: number = 0;
  parkingDivisionId: number = 0;
  slotName: string = "";
  slotType: number = -1;
  slotFormValidationMessage: string = "";
  currentUserId:number;

  parkingLocations: LocationViewModel[] = [];
  locationCompanies: CompanyViewModel[] = [];
  parkingDivisions: ParkingDivisionViewModel[] = [];
  parkingSlot:ParkingSlotViewModel = new ParkingSlotViewModel();

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
    private parkingAreaService: ParkingAreaApiProvider,
    private parkingSlotService:ParkingSlotApiProvider,private genericService:GlobalGenericService
  ) {
    // Form validation
    this.addSlotForm = formBuilder.group({
      locationId: [0, Validators.compose([Validators.required])],
      companyId: [0, Validators.compose([Validators.required])],
      parkingDivisionId: [0, Validators.compose([Validators.required])],
      slotName: ['', Validators.compose([Validators.maxLength(5),Validators.minLength(1),
        Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      slotType: [-1, Validators.compose([Validators.required])],
    });

    //Add Slot Form : Loading the locations to the locations dropdown - 
    this.parkingAreaService.GetParkingLocations()
    .subscribe(locationsResp => {
      Object.assign(this.parkingLocations, locationsResp);
    });

   
  }
  


  //Add Slot Form : On selection of location ppulate the company drop down
  PopulateCompanyForLocation($event): void {
      //To Disable the division dropdowns
      this.companyId = 0;
      if (this.locationId > 0) {
        this.locationCompanies = [];
        this.parkingAreaService.GetParkingLocationCompanies(this.locationId)
                                .subscribe(companiesRes => {
                                  Object.assign(this.locationCompanies, companiesRes)
                                });
      } 
  }

  //Add slot form : On Selection of company - populate the location divisions
  PopulateLocationDivisions($event):void{
    this.parkingDivisions = []
    this.parkingDivisionId = 0;
    if(this.locationId > 0){
      
        this.parkingAreaService.GetParkingLocationDivisions(this.locationId)
                                .subscribe(divisionsResp => {
                                  Object.assign(this.parkingDivisions,divisionsResp);
                                  this.parkingDivisions = this.parkingDivisions.sort(x=>x.SequenceOrder);
                                });
    }else{
      //To disable the slot name input
      this.parkingDivisionId = 0;
    }
  }

  saveParkingSlot($event): void {
    debugger
    // Prevent default submit action
    this.parkingSlot.IsOccupied = false;
    this.parkingSlot.Level = 0;
    this.parkingSlot.ParkingDivisionId = this.parkingDivisionId;
    this.parkingSlot.CompanyId = this.companyId;
    debugger
    this.parkingSlot.CreatedBy =  this.genericService.loggedInUser.Id;
    this.parkingSlotService.CreateParkingSlot(this.parkingSlot)
    .subscribe(res =>{
        this.slotFormValidationMessage ="slot added successfully";
    },
    error => {
      this.slotFormValidationMessage ="error while adding slot";
    }
  );
  }

}