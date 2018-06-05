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
import { SlotsPage } from '../pages/slots/slots';
import { ReportsPage } from '../pages/reports/reports';
import { NotificationsPage } from '../pages/notifications/notificaitons';

import {Geolocation} from '@ionic-native/geolocation';
import {HttpModule} from '@angular/http';
import { ParkingSlotService } from '../services/rest/parkingslot.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    TabsPage,
    AboutPage,
    ContactPage,
    SlotsPage,
    ReportsPage,
    NotificationsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    TabsPage,
    ContactPage,
    AboutPage,
    SlotsPage,
    ReportsPage,
    NotificationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AuthService,
    GlobalGenericService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParkingSlotService,
    HttpModule,
    ApiProvider,
    HttpClientModule
    
  ]
})
export class AppModule {}
