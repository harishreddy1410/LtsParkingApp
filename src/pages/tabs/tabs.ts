import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GlobalGenericService } from '../../services/globalgeneric.service';
import { SlotsPage } from '../slots/slots';
import { ReportsPage } from '../reports/reports';
import { NotificationsPage } from '../notifications/notificaitons';
import { NavController } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  isValid = false;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  constructor(public navCtrl: NavController,public singleton:GlobalGenericService) {
    if(singleton.isAdmin == true){
      this.isValid = true;
    }
    
  }
  GotoSlots(){
      this.navCtrl.push(SlotsPage);
  }
  GotoReports(){
    this.navCtrl.push(ReportsPage);
  }
  GotoNotifications(){
    this.navCtrl.push(NotificationsPage);
  }
}
