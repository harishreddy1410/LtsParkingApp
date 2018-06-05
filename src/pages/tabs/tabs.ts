import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GlobalGenericService } from '../../services/globalgeneric.service';
import { UserProfileViewModel } from '../../dto/UserProfileViewModel';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  isValid = false;
  loggedInUserProfile:UserProfileViewModel = new UserProfileViewModel();
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public singleton:GlobalGenericService) {
    if(singleton.isAdmin == true){
      this.isValid = true;
    }
    singleton.StoreUserObj();    
    singleton.GetLoggedInUserProfile().then(res=>{      
      this.loggedInUserProfile = res;
    });
  }  
}
