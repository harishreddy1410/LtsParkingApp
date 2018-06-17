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
    public singleton:GlobalGenericService,
    private auth: AuthService) {

        if(singleton.isAdmin == true){
          this.isValid = true;          
        }
        singleton.StoreUserObj();
        singleton.GetLoggedInUserProfile().then(res=>{            
          if(!isUndefined(res) && !isUndefined(res.Id) && res.Id > 0)  {            
            Object.assign(this.loggedInUserProfile, res);
            Object.assign(this.singleton.loggedInUser,res);
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
