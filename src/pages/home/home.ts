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

  public parkingDivisionsViewModel = [];
  
    constructor(public navCtrl: NavController,public alertCtrl: AlertController, 
    public geolocation: Geolocation, public genericService : GlobalGenericService,
  public loadingCtrl : LoadingController,
  private parkingSlotApiProvider :ParkingSlotApiProvider,
  public storage:Storage ,
public auth: AuthService,
public userProfileApiProvider:UserProfileApiProvider, public modalCtrl : ModalController) {
        // //Store - LoggedIn User in local sqllite storage
        // storage.get('userObj').then((val) => {
        //         if(val=== undefined || val === null){
        //           this.genericService.StoreUserObj();
        //         }
        //  });       

        //  var test = this.genericService.GetLoggedInUserProfile();
        //  debugger
        
this.parkingSlotApiProvider.GetLocationParkingArea(1).subscribe(res=>{    
    Object.assign(this.parkingDivisionsViewModel,res);
    console.log(this.parkingDivisionsViewModel);
});

//for static slots
this.parkingDivisionsViewModel = [{Id:9,IsActive:false,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:1,Type:0,CompanyId:1,ParkingDivisionId:1},{Id:10,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:2,Type:0,CompanyId:1,ParkingDivisionId:1},{Id:11,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:3,Type:1,CompanyId:1,ParkingDivisionId:1},{Id:12,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:4,Type:1,CompanyId:1,ParkingDivisionId:1},{Id:13,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:1,Type:0,CompanyId:1,ParkingDivisionId:2},{Id:14,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:2,Type:0,CompanyId:1,ParkingDivisionId:2},{Id:15,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:3,Type:0,CompanyId:3,ParkingDivisionId:2},{Id:16,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:4,Type:0,CompanyId:3,ParkingDivisionId:2},{Id:17,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:1,Type:1,CompanyId:4,ParkingDivisionId:2},{Id:18,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:2,Type:1,CompanyId:4,ParkingDivisionId:2},{Id:19,IsActive:true,IsDeleted:false,IsOccupied:false,Level:0,Location:"",SequenceOrder:3,Type:1,CompanyId:5,ParkingDivisionId:2},{Id:20,IsActive:true,IsDeleted:false,IsOccupied:true,Level:0,Location:"",SequenceOrder:4,Type:1,CompanyId:5,ParkingDivisionId:2}];
this.parkingLeftSlots = this.parkingDivisionsViewModel.filter(this.findLeftSlots);
this.parkingRightSlots = this.parkingDivisionsViewModel.filter(this.findRightSlots);
//end of static slots

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
  //Sample : Parking slot update call
    var updateParkingSlotVm = new ParkingSlotViewModel();
    updateParkingSlotVm.Id = 10;
    updateParkingSlotVm.IsOccupied = true;
    
    this.parkingSlotApiProvider.UpdateParkingSlot(updateParkingSlotVm)
    .subscribe(data => {
      console.log("update successful");
      console.log(data);
    });

    var createParkingSlotVm = new ParkingSlotViewModel();
    createParkingSlotVm.Id = 11;
    createParkingSlotVm.IsOccupied = false;
    createParkingSlotVm.Level = 0;
    createParkingSlotVm.Location = "BLR";
    createParkingSlotVm.SequenceOrder = 6;
    createParkingSlotVm.Id = 8;
    console.log("creating parking slot");
    this.parkingSlotApiProvider.CreateParkingSlot(createParkingSlotVm).subscribe(resp=>{
      console.log("Parking slot creation successfull");
      console.log(resp);
    });
    
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

  showSlotDetailsModalPopup(){
    let modal = this.modalCtrl.create(ModalContentPage);
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
        <span ion-text color="primary">Cancel</span>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
        <b> Slot Id</b>: {{slotDetail.Id}}
      </ion-item>
      <ion-item>
        <b> Occupied By</b>: {{slotDetail.OccupiedBy}}
      </ion-item>
      <ion-item>
        <b> In Time</b>: {{slotDetail.InTime}}
      </ion-item>
      <ion-item>
        <b> Expires In</b>: <span #mins>{{minsLeft}}</span>:<span #secs>{{secsLeft}}</span>
      </ion-item>
      <button ion-button icon-left block clear (click)="selectSlotToOccupy($event)" *ngIf="slotDetail.IsOccupied === false">
					Occupy
			</button>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  slotDetail:any;
  minsLeft:any;
  secsLeft:any;
  timer:any;
  @ViewChild('mins') minsElement: ElementRef;
  @ViewChild('secs') secsElement: ElementRef;
  constructor(
    public platform: Platform, public viewCtrl: ViewController, 
    public alertCtrl : AlertController,public geolocation: Geolocation, 
    public genericService : GlobalGenericService, public loadingCtrl : LoadingController
  ) {
    this.getSlotDetails();
  }

  calculateExpirationTime(){
    let outTime = this.slotDetail.OutTime;
    let mins,secs;
    this.timer = setInterval(()=> {      
      // Find the distance between now an the count down date
      var distance = outTime.getTime() - new Date().getTime();
      
      // Time calculations for minutes and seconds      
      this.minsLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.secsLeft = Math.floor((distance % (1000 * 60)) / 1000);
      //this.minsElement.value = mins;
      //this.secsElement.value = secs;
  }, 1000);
  }

  getSlotDetails(){
    this.slotDetail = {
      Id: 1,
      OccupiedBy: "Murugan",
      InTime : new Date("June 10, 2018 14:00:00").toLocaleTimeString(),
      OutTime: new Date("June 10, 2018 23:00:00"),
      IsOccupied: false
  };
  this.calculateExpirationTime();
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
    //loader.present();
    let userLatitude;
      let userLongitude; 
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to occupy this slot?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //console.log('Slot Id:'+event.target.attributes["data-slot-id"].value);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Slot Id:'+event.target.attributes["data-slot-id"].value);
          }
        }
      ]
    });
    let alert = this.alertCtrl.create({
      title: 'Warning',
      message: 'Oops! Your distance from parking space is beyond the limit.',
      buttons: ['Close']
    });
    this.geolocation.getCurrentPosition().then((position) => { 
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude; 
      console.log(userLatitude + "," + userLongitude);
      let distance = this.genericService.getDistanceBetweenCoordinates(userLatitude,userLongitude);
      console.log(distance);
      if(event.target.className.indexOf("slotOccupied") < 0 && distance < 0.1){
        loader.dismiss();
        confirm.present();
      }
      else{
        loader.dismiss();
        alert.present();

      }
      
    });
    
  }
}