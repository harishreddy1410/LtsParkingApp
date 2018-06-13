import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, List,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ParkingAreaApiProvider } from '../../providers/parking-area-service/parking-service-api';
import { ParkingSlotApiProvider } from '../../providers/parking-slot-api/parking-slot-api';
import { LocationViewModel } from '../../dto/LocationViewModel';
import { CompanyViewModel } from '../../dto/CompanyViewModel';
import { ParkingDivisionViewModel } from '../../dto/ParkingDivisionViewModel';
import { ParkingSlotViewModel } from '../../dto/ParkingSlotViewModel';
import { ParkingSlotUpdateViewModel } from '../../dto/ParkingSlotUpdateViewModel';
import { ParkingSlotEditFormViewModel } from '../../dto/ParkingSlotEditFormViewModel';
import { ViewOrContainerState } from '@angular/core/src/render3/interfaces';
import { GlobalGenericService } from '../../services/globalgeneric.service';


@Component({
  templateUrl: 'slots.html'
})
export class SlotsPage {
  addSlotForm: FormGroup;
  editSlotForm:FormGroup;

  locationId: number = 0;
  companyId: number = 0;
  parkingDivisionId: number = 0;
  slotName: string = "";
  slotType: number = -1;
  slotFormValidationMessage: string = "";
  currentUserId:number;
//Add slot form variables 
  parkingLocations: LocationViewModel[] = [];
  locationCompanies: CompanyViewModel[] = [];
  parkingDivisions: ParkingDivisionViewModel[] = [];
  parkingSlot:ParkingSlotViewModel = new ParkingSlotViewModel();

  //Edit slot form variables 
  editFormparkingSlots:ParkingSlotEditFormViewModel[] = [];
  editFormParkingSlotId:number = -1;
  editFormSlotStatus:boolean = false;
  editFormparkingSlot:ParkingSlotEditFormViewModel = new ParkingSlotEditFormViewModel();
  editFormCompanyId:number = -1;
  editFormLocationCompanies: CompanyViewModel[] = [];
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
    private parkingAreaService: ParkingAreaApiProvider,
    private parkingSlotService:ParkingSlotApiProvider,private genericService:GlobalGenericService,
    public alertCtrl: AlertController
  ) {
    // Add slot form builder and validation
    this.addSlotForm = formBuilder.group({
      locationId: [0, Validators.compose([Validators.required])],
      companyId: [0, Validators.compose([Validators.required])],
      parkingDivisionId: [0, Validators.compose([Validators.required])],
      //slotName: ['', Validators.compose([Validators.maxLength(5),Validators.minLength(1),
        //Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      slotType: [-1, Validators.compose([Validators.required])],
    });

    //Edit slot form builder 
    this.editSlotForm = formBuilder.group({
      locationId : [0,Validators.compose([Validators.required])],
      parkingDivisionId :  [0, Validators.compose([Validators.required])],
      editFormParkingSlotId : [0,Validators.compose([Validators.required])],
      editFormSlotStatus : [false,Validators.compose([Validators.required])],
      editFormCompanyId:[-1,Validators.compose([Validators.required])]
    })

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
                                }, 
                                err => {
                                  console.log(err);
                                },
                                () => {
                                  this.genericService.presentToast("Please select the company for this location")
                                });
      }
      
  }

  //Edit slot form - Populate the parking division 
  PopulateDivisionSlots($event)
  {    
    if(this.parkingDivisionId > 0)
    {
      this.parkingSlotService.GetParkingSlotsOfDivision(this.parkingDivisionId)
                              .subscribe(respParkingSlots =>{
                                Object.assign(this.editFormparkingSlots,respParkingSlots);
                              }, 
                              err => {
                                console.log(err);
                              },
                              () => {
                                this.genericService.presentToast("Parking slots are populated for the selected division")
                              })
    }else{
      this.alertCtrl.create({
        title: 'Error',
        message: 'Sorry! there is a problem in reading division data, please try again after some time.',
        buttons: ['Close']
      })
    }
  }

  //Edit slot form - Populate the slot details
  PopulateSlotDetail(parkingSlotId){    
    this.editFormparkingSlots;
    if(this.editFormparkingSlots.filter( x=> x.Id == parkingSlotId).length)
    {
      var resp = this.editFormparkingSlots.filter( x=> x.Id == parkingSlotId)[0];
      Object.assign(this.editFormparkingSlot,resp);
      if (this.locationId > 0) {
        this.editFormLocationCompanies = [];
        this.parkingAreaService.GetParkingLocationCompanies(this.locationId)
                                .subscribe(companiesRes => {
                                  Object.assign(this.editFormLocationCompanies, companiesRes);
                                  this.editFormCompanyId = resp.CompanyId;
                                  this.editFormSlotStatus = resp.IsActive;
                                }, 
                                err => {
                                  console.log(err);
                                },
                                () => {
                                  this.genericService.presentToast("Companies are populated for the selected location")
                                }
                            );
      } 
    }else{
      //To disable the dropdowns 
      this.editFormCompanyId = -1;
      this.editFormSlotStatus = false;      
    }
  }


 //Edit slot form - update parking slot on submit
 updateParkingSlot($event) : void {  
    var tempParkingSlotToUpdate = new ParkingSlotUpdateViewModel();
    tempParkingSlotToUpdate.Id = this.editFormParkingSlotId;
    tempParkingSlotToUpdate.CompanyId = this.editFormCompanyId;
    tempParkingSlotToUpdate.IsActive = this.editFormSlotStatus;

    this.parkingSlotService.UpdateParkingSlot(tempParkingSlotToUpdate).subscribe( resp => {
      if(resp){
        this.genericService.presentToast("Parking slot is updated successfully")
      }
    });
  
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
                                }, 
                                err => {
                                  console.log(err);
                                },
                                () => {
                                  this.genericService.presentToast("Parking divisions are populated for the selected location")
                                });
    }else{
      //To disable the slot name input
      this.parkingDivisionId = 0;
    }
  }

  saveParkingSlot($event): void {    
    // Prevent default submit action
    this.parkingSlot.IsOccupied = false;
    this.parkingSlot.Level = 0;
    this.parkingSlot.ParkingDivisionId = this.parkingDivisionId;
    this.parkingSlot.CompanyId = this.companyId;    
    this.parkingSlot.CreatedBy =  this.genericService.loggedInUser.Id;
    this.parkingSlotService.CreateParkingSlot(this.parkingSlot)
    .subscribe(res =>{
        this.slotFormValidationMessage ="slot added successfully";
        this.genericService.presentToast("Parking slot is created successfully");
    },
    error => {
      this.slotFormValidationMessage ="error while adding slot";
    }
  );
  }

}