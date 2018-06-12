import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController,AlertController,LoadingController, ModalController,IonicPage,
NavParams,ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { forEach } from '@firebase/util';

import { AuthService } from '../../services/auth.service';
import { UserProfileApiProvider } from '../../providers/user-profile-api/user-profile-api';
import { UserProfileViewModel } from '../../dto/UserProfileViewModel';
import { ParkingDivisionViewModel } from '../../dto/ParkingDivisionViewModel';
import { ParkingSlotApiProvider } from './../../providers/parking-slot-api/parking-slot-api';
import { GlobalGenericService } from '../../services/globalgeneric.service';
import { ParkingSlotViewModel } from '../../dto/ParkingSlotViewModel';

//declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
  // @ViewChild('map') mapElement: ElementRef;
  //map: any;
  // directionsService = new google.maps.DirectionsService;
  // directionsDisplay = new google.maps.DirectionsRenderer;
  parkingLeftSlots:any;
  parkingRightSlots: any;
  public parkingDivisionsViewModels = [];
  public locationName:string = "";
  public tempLoggedInUserId:number = 0;
  
    constructor(public navCtrl: NavController,public alertCtrl: AlertController, 
                public geolocation: Geolocation, public genericService : GlobalGenericService,
                public loadingCtrl : LoadingController,
                private parkingSlotApiProvider :ParkingSlotApiProvider,
                public storage:Storage ,
                public auth: AuthService,
                public userProfileApiProvider:UserProfileApiProvider, 
                public modalCtrl : ModalController,
              ) {
        // //Store - LoggedIn User in local sqllite storage
        // storage.get('userObj').then((val) => {
        //         if(val=== undefined || val === null){
        //           this.genericService.StoreUserObj();
        //         }
        //  });               

  
        this.genericService.GetLoggedInUserProfile()
        .then((resp) => {          
            this.locationName = resp.Location.Name;
            return resp.LocationId;            
        })
        .then((resp)=>{    
          if(resp != undefined)      
          {
              this.parkingSlotApiProvider.GetLocationParkingArea(resp)
              .subscribe(res=>{                       
                Object.assign(this.parkingDivisionsViewModels,res);
                this.parkingDivisionsViewModels = this.parkingDivisionsViewModels.sort()
                this.tempLoggedInUserId = this.genericService.loggedInUser.Id;
                
           });
          }else{
            //refresh the page 
            location.reload();            
          }
        });


// //for static slots
// this.parkingDivisionsViewModels = [{Id:9,IsActive:false,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:1,Type:0,CompanyId:1,ParkingDivisionId:1},{Id:10,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:2,Type:0,CompanyId:1,ParkingDivisionId:1},{Id:11,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:3,Type:1,CompanyId:1,ParkingDivisionId:1},{Id:12,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:4,Type:1,CompanyId:1,ParkingDivisionId:1},{Id:13,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:1,Type:0,CompanyId:1,ParkingDivisionId:2},{Id:14,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:2,Type:0,CompanyId:1,ParkingDivisionId:2},{Id:15,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:3,Type:0,CompanyId:3,ParkingDivisionId:2},{Id:16,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:4,Type:0,CompanyId:3,ParkingDivisionId:2},{Id:17,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:1,Type:1,CompanyId:4,ParkingDivisionId:2},{Id:18,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:2,Type:1,CompanyId:4,ParkingDivisionId:2},{Id:19,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:3,Type:1,CompanyId:5,ParkingDivisionId:2},{Id:20,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:4,Type:1,CompanyId:5,ParkingDivisionId:2}];
// this.parkingLeftSlots = this.parkingDivisionsViewModels.filter(this.findLeftSlots);
// this.parkingRightSlots = this.parkingDivisionsViewModels.filter(this.findRightSlots);
// //end of static slots

//Sample : Parking slot get call
    this.parkingSlotApiProvider.GetAllParkingSlots().subscribe(
      allParkingSlots => {
        console.log("Resp 1");
        //this.parkingSlots = allParkingSlots;
      },
      err => {
        console.log("eror " + err);
      },
      () => { console.log("Pulling slots pull successful");}
    );
//Sample : Parking slot get call
    this.parkingSlotApiProvider.GetParkingSlot(5).subscribe(
        parkingSlotRes =>{
          console.log("Parking slot pull successful")
          console.log(parkingSlotRes);
        }
    );
  // //Sample : Parking slot update call
  //   var updateParkingSlotVm = new ParkingSlotViewModel();
  //   updateParkingSlotVm.Id = 10;
  //   updateParkingSlotVm.IsOccupied = true;
    
  //   this.parkingSlotApiProvider.UpdateParkingSlot(updateParkingSlotVm)
  //   .subscribe(data => {
  //     console.log("update successful");
  //     console.log(data);
  //   });

    // var createParkingSlotVm = new ParkingSlotViewModel();
    // createParkingSlotVm.Id = 11;
    // createParkingSlotVm.IsOccupied = false;
    // createParkingSlotVm.Level = 0;
    // createParkingSlotVm.Location = "BLR";
    // createParkingSlotVm.SequenceOrder = 6;
    // createParkingSlotVm.UserId = 8;
    // console.log("creating parking slot");
    // this.parkingSlotApiProvider.CreateParkingSlot(createParkingSlotVm).subscribe(resp=>{
    //   console.log("Parking slot creation successfull");
    //   console.log(resp);
    // });
    
    //Sample : Parking slot delete call
    this.parkingSlotApiProvider.DeleteParkingSlot(12).subscribe(
      resp =>{
        console.log("Parking slot delete successfull");
        console.log(resp);
      }
    );   

    }

  ionViewDidLoad(){
  }

  // initMap() {

  //   var officeLocation = new google.maps.LatLng(12.9235184,77.5993086)      ;

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     zoom: 18,
  //     center: officeLocation      
  //   });
  //   var marker = new google.maps.Marker({position:officeLocation});
  //   marker.setMap(this.map);
  //   var infowindow = new google.maps.InfoWindow({
  //     content: "LTS"
  //   });
  //   infowindow.open(this.map,marker);
  //   this.directionsDisplay.setMap(this.map);
  // }

  // calculateAndDisplayRoute() {
  //   this.directionsService.route({
  //     origin: this.start,
  //     destination: this.end,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

  showSlotDetailsModalPopup(slotId:number){    
    let modal = this.modalCtrl.create(ModalContentPage,{slotId : slotId,currentUserId:this.genericService.loggedInUser.Id});
    modal.present();
    //modal.onDidDismiss(()=> loader.dismiss());
  }
  findLeftSlots(value, index, aray){
    if(value.ParkingDivisionId == 1){
        return true;
    }
    else{
      return false;
    }
  }

  findRightSlots(value, index, aray){
    if(value.ParkingDivisionId == 2){
        return true;
    }
    else{
      return false;
    }
  }
}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Description
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary">Close</span>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
        <b> Slot Id</b>: {{(slotDetail) ? slotDetail.Id : ""}}
      </ion-item>
      <ion-item>
        <b> Occupied By</b>: {{(slotDetail) ? slotDetail.OccupiedBy : ""}}
      </ion-item>
      <ion-item>
        <b> In Time</b>: {{(slotDetail) ? slotDetail.InTime : ""}}
      </ion-item>
      <ion-item>
        <b> Company </b>: {{(slotDetail) ? slotDetail.CompanyName : ""}}
      </ion-item>      
      <ion-item>
        <b> Expected Out Time In</b>: <span #hrs>{{hrsLeft}}</span>:<span #mins>{{minsLeft}}</span>:<span #secs>{{secsLeft}}</span>
      </ion-item>
      <button ion-button icon-left block clear (click)="selectSlotToOccupy($event)" *ngIf="(slotDetail) ? slotDetail.IsOccupied === false : false" 
       [disabled]="slotOccupiedByUserId > 0"
      >
					Occupy
      </button>
      <button ion-button icon-left block clear (click)="selectSlotToRelease($event)" *ngIf="(slotDetail) ? slotDetail.IsOccupied === true && currentId === slotOccupiedByUserId : false">
					Release
      </button>
      <div>
          <b> {{ (slotUpdateMessage) ? slotUpdateMessage : "" }}</b>
      </div>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  slotDetail:any;

  hrsLeft:any;
  minsLeft:any;
  secsLeft:any;
  timer:any;
  slotId:number;
  currentId:number = 0;
  slotUpdateMessage:string="";
  slotOccupiedByUserId:number = -1;

  @ViewChild('mins') minsElement: ElementRef;
  @ViewChild('secs') secsElement: ElementRef;
  constructor(
    public platform: Platform, public viewCtrl: ViewController, 
    public alertCtrl : AlertController,public geolocation: Geolocation, 
    public genericService : GlobalGenericService, public loadingCtrl : LoadingController,
    public parkingSlotApiProvider:ParkingSlotApiProvider,
    public params: NavParams
  ) {
    this.slotId = params.get('slotId');
    this.currentId = params.get('currentUserId');
    this.getSlotDetails(this.slotId);
    this.slotUpdateMessage = "";
  }

  calculateExpirationTime(){
    let outTime = this.slotDetail.OutTime;
    let hrs,mins,secs;
    this.timer = setInterval(()=> {      
      // Find the distance between now an the count down date
      var distance = outTime.getTime() - new Date().getTime();
      
      // Time calculations for minutes and seconds 
      this.hrsLeft = Math.floor((distance/60/1000/60));
      this.minsLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.secsLeft = Math.floor((distance % (1000 * 60)) / 1000);
      //this.minsElement.value = mins;
      //this.secsElement.value = secs;
  }, 1000);
  }

  getSlotDetails(slotIdParam:number){
    var tempParkingSlot = new ParkingSlotViewModel();
        this.parkingSlotApiProvider.GetparkingSlotDetails(slotIdParam)
        .subscribe(slotResp => {
            debugger
            Object.assign(tempParkingSlot,slotResp);
            debugger
            if(tempParkingSlot.IsOccupied){
              this.slotOccupiedByUserId = tempParkingSlot.SlotOccupiedByUserId;
            }
            this.slotDetail = {
                                  Id: tempParkingSlot.Id,
                                  InTime : new Date(tempParkingSlot.InTime).toLocaleTimeString(),
                                  OutTime: new Date(tempParkingSlot.OutTime),
                                  IsOccupied: tempParkingSlot.IsOccupied,
                                  CompanyName : tempParkingSlot.CompanyName,
                                  OccupiedBy: tempParkingSlot.OccupiedBy,
                                  CurrentUserId : this.params.get('currentUserId'),
                                  SlotOccupiedByUserId : tempParkingSlot.SlotOccupiedByUserId
                              };
            this.calculateExpirationTime();
        })

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  selectSlotToRelease($event){
    
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
        <div class="custom-spinner-text">Please wait...</div>
      </div>`,
    });
    loader.present();
    //Release slot
    var tempParkingSlot: ParkingSlotViewModel = new ParkingSlotViewModel();
    tempParkingSlot.Id = this.slotId;
    tempParkingSlot.UserId = this.currentId;
    tempParkingSlot.IsOccupied = false;
    this.parkingSlotApiProvider.OccupyParkingSlot(tempParkingSlot)
                                .subscribe(resp =>{     
                                  debugger                                   
                                  if(resp != undefined){
                                    this.slotUpdateMessage = resp.toString();
                                  }
                                  this.parkingSlotApiProvider.GetparkingSlotDetails(tempParkingSlot.Id).subscribe(resp =>{
                                    Object.assign(tempParkingSlot,resp);
                                    if(tempParkingSlot.IsOccupied){
                                      this.slotOccupiedByUserId = tempParkingSlot.SlotOccupiedByUserId; 
                                      this.currentId = this.params.get('currentUserId')      ;                                     
                                    }
                                    loader.dismiss();  
                                });                                
                                },
                              err =>{
                                console.log(err);
                                loader.dismiss();    
                              }
                              );
    
  }
  selectSlotToOccupy(event) {
    clearInterval(this.timer);
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
        <div class="custom-spinner-text">Please wait...</div>
      </div>`,
    });
    loader.present();
    let userLatitude;
    let userLongitude;       
    this.geolocation.getCurrentPosition()
      .then((position) => {         
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude; 
        console.log(userLatitude + "," + userLongitude);
        let distance = this.genericService.getDistanceBetweenCoordinates(userLatitude,userLongitude);
        console.log(distance);
        if(event.target.className.indexOf("slotOccupied") < 0 && distance < 0.2){
          loader.dismiss();          
          //Occupy slot
          var tempParkingSlot: ParkingSlotViewModel = new ParkingSlotViewModel();
          tempParkingSlot.Id = this.slotId;
          tempParkingSlot.UserId = this.currentId;
          tempParkingSlot.IsOccupied = true;
          this.parkingSlotApiProvider.OccupyParkingSlot(tempParkingSlot)
                                      .subscribe(resp =>{                                        
                                        if(resp != undefined){
                                          this.slotUpdateMessage = resp.toString();
                                        }
                                        this.parkingSlotApiProvider.GetparkingSlotDetails(tempParkingSlot.Id).subscribe(resp =>{
                                          Object.assign(tempParkingSlot,resp);
                                          if(tempParkingSlot.IsOccupied){
                                            this.slotOccupiedByUserId = tempParkingSlot.SlotOccupiedByUserId; 
                                            this.currentId = this.params.get('currentUserId')      ;                                     
                                          }
                                      });
                                      
                                      });
          
        }
        else{
          loader.dismiss();
          alert.present();  
        }
        
      })
      .catch(err =>{
        debugger
        console.log(err.toString())
      });

    let alert = this.alertCtrl.create({
      title: 'Warning',
      message: 'Oops! Your distance from parking space is beyond the limit.',
      buttons: ['Close']
    });

    
  }
}