import { Component,ViewChild, ElementRef } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GlobalGenericService } from '../../services/globalgeneric.service';

import { SlotsPage } from '../slots/slots';
import { ReportsPage } from '../reports/reports';
import { NotificationsPage } from '../notifications/notificaitons';
import { NavController,MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UserProfileViewModel } from '../../dto/UserProfileViewModel';
import { isUndefined } from 'ionic-angular/util/util';
import { UserProfileApiProvider } from '../../providers/user-profile-api/user-profile-api';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("content")rootElement : ElementRef;
  isValid = false;
  loggedInUserProfile:UserProfileViewModel = new UserProfileViewModel();

  homeRoot = HomePage;
  aboutRoot = AboutPage;
  contactRoot = ContactPage;
  slotsRoot = SlotsPage;
  reportsRoot = ReportsPage;

  constructor(public navCtrl: NavController,public menuCtrl: MenuController,
    public genericService:GlobalGenericService,
    private auth: AuthService,
    public userProfileApiProvider:UserProfileApiProvider
  ) {

        if(genericService.isAdmin == true){
          this.isValid = true;          
        }
        genericService.StoreUserObj();
        
      } 

      //This method is used to check the logged in usser role and change the flag value to access tabs
      CheckRole(userProfileViewModel:UserProfileViewModel){
        if(!isUndefined(userProfileViewModel) && !isUndefined(userProfileViewModel.Role) && userProfileViewModel.Role == 0)
            {
              this.genericService.isAdmin = true;
              this.isValid = true;
            }
      }
      //loading the tabs content after view is loaded
      ionViewDidLoad(){
        this.genericService.GetLoggedInUserProfile()
        .then(res=>{  
          if(!isUndefined(res) && !isUndefined(res.Id) && res.Id > 0)  
          {            
            Object.assign(this.loggedInUserProfile, res);
            Object.assign(this.genericService.loggedInUser,res);
            this.CheckRole(this.genericService.loggedInUser);          
          }
          return this.loggedInUserProfile;
        })
        .then((resp2) => {
          //Fall back if the storage is not ready/not found
          if(isUndefined(resp2.Id)){
            if(this.auth.authenticated && !isUndefined(this.auth.getEmail()))
            {
              this.userProfileApiProvider.GetUserProfile(this.auth.getEmail())
              .subscribe(resp3 =>{
                  Object.assign(this.loggedInUserProfile,resp3);
                  Object.assign(this.genericService.loggedInUser,resp3);
                  this.CheckRole(this.genericService.loggedInUser);
              })
            }
          }
        });
      } 
  
  GotoSlots(){    
     this.rootElement["root"] = this.slotsRoot;
     this.menuCtrl.close();
  }
  GotoReports(){
    this.rootElement["root"] = this.reportsRoot;
    this.menuCtrl.close();
  }
  signOut(){
    this.auth.signOut();
  }
  GotoHome(){
    this.rootElement["root"]=this.homeRoot;
    this.menuCtrl.close();
  }
  GotoAbout(){
    this.rootElement["root"]=this.aboutRoot;
    this.menuCtrl.close();
  }
  GotoContact(){
    this.rootElement["root"]=this.contactRoot;
    this.menuCtrl.close();    
  }
}
