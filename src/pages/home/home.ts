import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Geolocation } from '@ionic-native/geolocation';
import { ParkingSlotApiProvider } from './../../providers/parking-slot-api/parking-slot-api';
import { GlobalGenericService } from '../../services/globalgeneric.service';
import { ParkingSlotViewModel } from '../../dto/ParkingSlotViewModel';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';

import { UserProfileApiProvider } from '../../providers/user-profile-api/user-profile-api'

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
  parkingSlots:any;
  
    constructor(public navCtrl: NavController,public alertCtrl: AlertController, 
    public geolocation: Geolocation, public genericService : GlobalGenericService,
  public loadingCtrl : LoadingController,
  private parkingSlotApiProvider :ParkingSlotApiProvider,
  public storage:Storage ,
public auth: AuthService,
public userProfileApiProvider:UserProfileApiProvider) {
      
        // storage.set('LoginUserEmail',this.auth.getEmail());
        // storage.get('LoginUserEmail').then((val) => {
        //         console.log('stoage email '+val);          
        //  });
        storage.get("LogInUser").then((userObj)=>{
          if(userObj === null)
          {
            console.log("Storing Login user obje")
          //   storage.set("LogInUser",
          //   this.userProfileApiProvider.GetUserProfile(this.auth.getEmail()).subscribe(
          //     res => {
          //       console.log(res);
          //     },
          //     err => {
          //       console.log("Erre : "+ err);
          //     })
          // );
          }
        })
storage.get("LogInUser").then((val) => {
  console.log("stored user obj");
  console.log(val);
})
  //Sample : Parking slot get call
    this.parkingSlotApiProvider.GetAllParkingSlots().subscribe(
      allParkingSlots => {
        console.log("Resp 1");
        this.parkingSlots = allParkingSlots;
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
    createParkingSlotVm.UserId = 8;
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

  //ionViewDidLoad(){
    //this.initMap();
  //}

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

  selectSlotToOccupy(event) {
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
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to occupy this slot?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Slot Id:'+event.target.attributes["data-slot-id"].value);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Slot Id:'+event.target.attributes["data-slot-id"].value);
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