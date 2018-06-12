import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { UserProfileApiProvider } from '../providers/user-profile-api/user-profile-api'
import { UserProfileViewModel } from '../dto/UserProfileViewModel';
import { Injectable } from '@angular/core';

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
    public set(settingName,value){
        return this.storage.set(`setting:${ settingName }`,value);
      }
      public async get(settingName){
        return await this.storage.get(`setting:${ settingName }`);
      }
      public async remove(settingName){
        return await this.storage.remove(`setting:${ settingName }`);
      }
      public clear() {
        this.storage.clear().then(() => {
          console.log('all keys cleared');
        });
      }

    ///-----------------------------------------------------------
    ///This Method is used to store the Logged in user obect in Storage
    ///-----------------------------------------------------------
    async StoreUserProfileInStorage(){		
		if(this.auth.getEmail() !== undefined && this.auth.getEmail() !== null){
			var userProfile:UserProfileViewModel = null;
		    await this.userProfileApiProvider.GetUserProfile(this.auth.getEmail()).subscribe(
                res =>{
                    this.storage.set("userObj",res);
                }
            )
		}
    }
    
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
         if(userProfileViewModel.Id === undefined)
         {             
           await this.userProfileApiProvider.GetUserProfile(this.auth.getEmail()).subscribe(
                res =>{
                    this.storage.set("userObj",res);
                    Object.assign(userProfileViewModel,tempObj);
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