import { Injectable } from '@angular/core';
import { StorageHelper } from '../helpers/StorageHelper';
import { UserProfileViewModel } from '../dto/UserProfileViewModel';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { ToastController } from 'ionic-angular';

@Injectable()
export class GlobalGenericService{

  public loggedInUser:UserProfileViewModel = new UserProfileViewModel();    
    
    constructor(private storageHelper:StorageHelper,private toastCtrl: ToastController) {  
      this.StoreUserObj();
      this.storageHelper.GetLoggedInUserFromStorage().then(
        res =>{
          Object.assign(this.loggedInUser,res)
        }
      )
      
    }

    public isAdmin:boolean = true;
    //public userName:string = "Aqueel Rahman";
    public ltsParkingApiDomain = "http://10.1.50.123:88/";
    public httpOptions = {
      headers: new HttpHeaders({
        'ApiAuthToken': "4586E9EC-7CF1-4F9C-BFF4-3E626DEF9E4B"
      })
    };
    private officeLatitude = 12.914649;
    private officeLongitude = 77.598765;
    
    //calulate the distance between the user and parking slots
    getDistanceBetweenCoordinates(userLatitude,userLongitude) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.convertDegreeToRadian(userLatitude-this.officeLatitude);
        var dLon = this.convertDegreeToRadian(userLongitude-this.officeLongitude); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.convertDegreeToRadian(this.officeLatitude)) * Math.cos(this.convertDegreeToRadian(userLatitude)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      convertDegreeToRadian(deg) {
        return deg * (Math.PI/180)
      }

      StoreUserObj(){
        this.storageHelper.StoreUserProfileInStorage();
      }

      async GetLoggedInUserProfile() {
        var userProfile:UserProfileViewModel;
        userProfile = await this.storageHelper.GetLoggedInUserFromStorage()
        return userProfile;
      }

       async GetLoggedInUserLocationId() {      
        var userProfile:UserProfileViewModel;
        await this.storageHelper.GetLoggedInUserFromStorage().then(res => {          
          userProfile = res;
        });
        return userProfile.LocationId;         
      }

      ///
      /// Generic flash popup
      ///
      presentToast(toastMessage) {
        let toast = this.toastCtrl.create({
          message: toastMessage,         
          position: 'bottom',
          showCloseButton : true,
          closeButtonText : 'Ok'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }
      
}