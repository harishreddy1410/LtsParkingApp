import { Component,ViewChild  } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home'
import { AuthService } from '../services/auth.service';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:string = 'HomePage';
  rootPage:any  = TabsPage;
  private platform;
  isValid=false;

  constructor(platform: Platform,private statusBar: StatusBar,private splashScreen: SplashScreen,
    private auth: AuthService) {

    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    this.platform = platform;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.rootPage = LoginPage;
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
}
}

