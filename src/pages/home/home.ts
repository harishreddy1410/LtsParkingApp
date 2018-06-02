import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

  parkingSlots =[
        {
        "Id":1,
        "Name": "1",
        "IsOccupied": true,
        "SequenceOrder":1,
        "IsActive":true
      },
      {
        "Id":2,
        "Name": "2",
        "IsOccupied": false,
        "SequenceOrder":2,
        "IsActive":true
      },
      {
        "Id":3,
        "Name": "3",
        "IsOccupied": false,
        "SequenceOrder":3,
        "IsActive":true
      },
      {
        "Id":4,
        "Name": "4",
        "IsOccupied": false,
        "SequenceOrder":4,
        "IsActive":true
      },
      {
        "Id":5,
        "Name": "5",
        "IsOccupied": false,
        "SequenceOrder":5,
        "IsActive":true
      },
      {
        "Id":6,
        "Name": "6",
        "IsOccupied": false,
        "SequenceOrder":6,
        "IsActive":true
      },
      {
        "Id":7,
        "Name": "7",
        "IsOccupied": false,
        "SequenceOrder":7,
        "IsActive":true
      },
      {
        "Id":8,
        "Name": "8",
        "IsOccupied": false,
        "SequenceOrder":8,
        "IsActive":true
      }
    ];

  constructor(public navCtrl: NavController,public alerCtrl: AlertController) {
   
  }

  ionViewDidLoad(){
    //this.initMap();
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

  selectSlotToOccupy(event) {
    let confirm = this.alerCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to occupy this slot?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Slot Id'+event.target.attributes["data-slot-id"].value);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    if(event.target.className.indexOf("slotOccupied") < 0){
      confirm.present();
    }    
  }
}