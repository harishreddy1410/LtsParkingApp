import { Component,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController,Tabs, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { UserProfileApiProvider } from '../../providers/user-profile-api/user-profile-api';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder,
		public storage:Storage,
		public userProfileApiProvider : UserProfileApiProvider,
		public platform:Platform
	) {		
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});		
	}

	

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() =>  this.platform.ready().then(()=> this.navCtrl.setRoot(HomePage)),
				error => this.loginError = error.message
			)
			.then( x=>{
				if(this.auth.authenticated){
					this.userProfileApiProvider.GetUserProfile(this.auth.getEmail())
					.subscribe(res => {
						this.storage.set('userObj',res);
					});						
				}
		});
    }

		//Sign up not implemented yet
  signup(){
    //this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
  this.auth.signInWithGoogle()
    .then(
      () => this.navCtrl.setRoot(HomePage),
      error => console.log(error.message)
    );
  }

}
