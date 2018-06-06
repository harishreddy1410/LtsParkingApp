import { Injectable } from '@angular/core';
import { StorageHelper } from '../helpers/StorageHelper';
import { UserProfileViewModel } from '../dto/UserProfileViewModel';
@Injectable()
export class GlobalGenericService{

  public loggedInUser:UserProfileViewModel = new UserProfileViewModel();    
    
    constructor(private storageHelper:StorageHelper) {        
    }

    public isAdmin:boolean = true;
    public userName:string = "Aqueel Rahman";
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
}