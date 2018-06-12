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
  public currentUserCompanyId:number = -1;

    constructor(public navCtrl: NavController,public alertCtrl: AlertController, 
                public geolocation: Geolocation, public genericService : GlobalGenericService,
                public loadingCtrl : LoadingController,
                private parkingSlotApiProvider :ParkingSlotApiProvider,
                public storage:Storage ,
                public auth: AuthService,
                public userProfileApiProvider:UserProfileApiProvider, 
                public modalCtrl : ModalController,
              ) {
  
    }
///Method used to update the parking slot after user actions (Occupy / release)
    PopulateParkingLayout(locationIdParam){
      this.parkingSlotApiProvider.GetLocationParkingArea(locationIdParam)
      .subscribe(res=>{                   
              Object.assign(this.parkingDivisionsViewModels,res);
              this.parkingDivisionsViewModels = this.parkingDivisionsViewModels.sort()
              this.tempLoggedInUserId = this.genericService.loggedInUser.Id;                  
              this.currentUserCompanyId = this.genericService.loggedInUser.CompanyId;            
        });
    }


    ionViewDidLoad(){      

       this.genericService.GetLoggedInUserProfile()
        .then((resp) => {          
            this.locationName = resp.Location.Name;
            return resp.LocationId;            
        })
        .then((resp)=>{    
          if(resp != undefined)      
          {            
             this.PopulateParkingLayout(resp);
          }
          else
          {
            //refresh the page 
            if(this.auth.authenticated === true){              
              this.userProfileApiProvider.GetUserProfile(this.auth.getEmail())
                              .subscribe(resp2 =>{
                                      if(resp2 != null)
                                      {
                                          var userProfileResp2 = new UserProfileViewModel();
                                          Object.assign(userProfileResp2,resp2);
                                          this.locationName = userProfileResp2.Location.Name;
                                         this.PopulateParkingLayout(userProfileResp2.LocationId);
                                      }
                            });
            }  
          }
        });
    }

  showSlotDetailsModalPopup($event){    
    if($event.currentTarget.dataset.companymatches == "true")
    {
        let modal = this.modalCtrl.create(ModalContentPage,{
          slotId : $event.currentTarget.dataset.slotid,
          currentUserId:this.genericService.loggedInUser.Id
        });
        modal.present();
        //modal.onDidDismiss(()=> loader.dismiss());
    }else{
      alert("This parking slot belongs to other company");
    }
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

        <div class="slotDetailHeading"> Slot Id</div>: {{(slotDetail) ? slotDetail.Id : ''}}
      </ion-item>
      <ion-item>
        <div class="slotDetailHeading"> Occupied By</div>: {{(slotDetail) ? slotDetail.OccupiedBy : '' }}
      </ion-item>
      <ion-item>
        <div class="slotDetailHeading"> In Time</div>: {{(slotDetail) ? slotDetail.InTime : ''   }}
      </ion-item>
      <ion-item *ngIf="(slotDetail) ? slotDetail.IsOccupied === true : false">
      <div class="slotDetailHeading"> Expires In</div>: <span #mins>{{minsLeft}}</span>:<span #secs>{{secsLeft}}</span>
      </ion-item>
      <ion-item *ngIf="(slotDetail) ? slotDetail.IsOccupied === false : true">
      <div class="slotDetailHeading"> Expires In</div>: --:--
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
    public params: NavParams,public navCtrl: NavController
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
      var distance = new Date().getTime() - outTime.getTime();
      
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
            Object.assign(tempParkingSlot,slotResp);            
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
                                  //On error                             
                                  loader.dismiss();    
                                },
                                () => {
                                  //On complete 
                                  //this.navCtrl.setRoot(HomePage);
                                  window.location.reload();
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
        let distance = this.genericService.getDistanceBetweenCoordinates(userLatitude,userLongitude);        
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
                                      });},
                                      err => console.log(err),
                                      () => { 
                                        //On completion 
                                        //this.navCtrl.setRoot(HomePage);
                                        window.location.reload();
                                      }
                                    );
          
        }
        else{
          loader.dismiss();
          alert.present();  
        }
        
      })
      .catch(err =>{        
        console.log(err.toString())
      });

    let alert = this.alertCtrl.create({
      title: 'Warning',
      message: 'Oops! Your distance from parking space is beyond the limit.',
      buttons: ['Close']
    });

    // this.geolocation.getCurrentPosition().then((position) => { 
    //   userLatitude = position.coords.latitude;
    //   userLongitude = position.coords.longitude; 
    //   console.log(userLatitude + "," + userLongitude);
    //   let distance = this.genericService.getDistanceBetweenCoordinates(userLatitude,userLongitude);
    //   console.log(distance);
    //   if(event.target.className.indexOf("slotOccupied") < 0 && distance < 1){
    //     loader.dismiss();
    //     confirm.present();
    //   }
    //   else{
    //     loader.dismiss();
    //     alert.present();


    
  }
}