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
import { HomePage, ModalContentPage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { SlotsPage } from '../pages/slots/slots';
import { ReportsPage } from '../pages/reports/reports';
import { NotificationsPage } from '../pages/notifications/notificaitons';

import {Geolocation} from '@ionic-native/geolocation';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ParkingSlotApiProvider } from '../providers/parking-slot-api/parking-slot-api';
import { ParkingTrafficApiProvider } from '../providers/parking-traffic-api/parking-traffic-api';
import { ParkingAreaApiProvider } from '../providers/parking-area-service/parking-service-api';
import { IonicStorageModule } from '@ionic/storage';
import { UserProfileApiProvider } from '../providers/user-profile-api/user-profile-api'
import { StorageHelper } from '../helpers/StorageHelper';
import { DataTablesModule } from 'angular-datatables';

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
    NotificationsPage,
    ModalContentPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule,
    HttpClientModule,
    DataTablesModule
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
    NotificationsPage,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AuthService,
    GlobalGenericService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageHelper,
    HttpModule,
    HttpClientModule,
    ParkingSlotApiProvider,
    ParkingTrafficApiProvider,
    UserProfileApiProvider ,
    ParkingAreaApiProvider   
  ]
})
export class AppModule {}
