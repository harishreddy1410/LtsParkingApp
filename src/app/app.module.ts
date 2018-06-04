import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../custom_config/config'
import { LoginPage } from '../pages/login/login';
import { SignupPage} from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { GlobalGenericService } from '../services/globalgeneric.service';
import { NgxErrorsModule} from '@ultimate/ngxerrors';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import {Geolocation} from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    TabsPage,
    AboutPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    TabsPage,
    ContactPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AuthService,
<<<<<<< HEAD
    GlobalGenericService
=======
    GlobalGenericService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
>>>>>>> 6891ce978f7dddb5645ce9c4e401e374e5f8424e
  ]
})
export class AppModule {}
