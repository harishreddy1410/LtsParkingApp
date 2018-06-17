import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { UserProfileApiProvider } from '../providers/user-profile-api/user-profile-api'
import { UserProfileViewModel } from '../dto/UserProfileViewModel';
import { Injectable } from '@angular/core';
import { isUndefined } from 'ionic-angular/util/util';

@Injectable()
export class StorageHelper{
    /**
     *Used to store and pull object from local storage 
     */
    constructor(private storage:Storage,
        private auth:AuthService,
        private userProfileApiProvider:UserProfileApiProvider
    ) {
        

    }
 

    ///-----------------------------------------------------------
    ///This Method is used to store the Logged in user obect in Storage
    ///-----------------------------------------------------------
    async StoreUserProfileInStorage(){		

        if(this.auth.authenticated && isUndefined(this.auth.getEmail()))
        {
            //console.log('don"t exit');
            this.doAdelay();
        }
		if(this.auth.getEmail() !== undefined && this.auth.getEmail() !== null){
			var userProfile:UserProfileViewModel = null;
		    await this.userProfileApiProvider.GetUserProfile(this.auth.getEmail()).subscribe(
                res =>{
                    this.storage.set("userObj",res);
                }
            )
        }        
    }

    doAdelay(){
        setTimeout(function(){return true;},1000);
    };
    
    ///-----------------------------------------------------------
    ///This Method is used to get the Logged in user from Storage
    ///-----------------------------------------------------------
   async GetLoggedInUserFromStorage(){        
        //pulling object from storage
        var userProfileViewModel = new UserProfileViewModel();
         await this.storage.get('userObj').then(
             (val) => {
                        if(val === undefined || val === null){
                            if(this.auth.authenticated){
                                //Try again
                                this.StoreUserProfileInStorage();                     
                            }
            }
         });

         var tempObj =  await this.storage.get('userObj');
        

         Object.assign(userProfileViewModel,tempObj);                  
         if(isUndefined(userProfileViewModel.Id))
         {             
           await this.userProfileApiProvider.GetUserProfile(this.auth.getEmail()).subscribe(
                res =>{
                    this.storage.set("userObj",res);
                    Object.assign(userProfileViewModel,res);
                }
            )
            return userProfileViewModel;
         }
         else
         {
            return  userProfileViewModel;
         }
    }

}