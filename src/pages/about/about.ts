import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalGenericService } from '../../services/globalgeneric.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  isValid=false;
  constructor(public navCtrl: NavController,public singleton:GlobalGenericService) {
    if(singleton.isAdmin == true){
      this.isValid = true;
    }
  }
  
}
