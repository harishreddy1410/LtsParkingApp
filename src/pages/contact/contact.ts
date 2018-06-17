import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Email } from '../../services/email.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalGenericService } from '../../services/globalgeneric.service';
import { CommunicationServiceApiProvider } from '../../providers/communication-api/communication-api';
import { CommunicationViewModel } from '../../dto/CommunicationViewModel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contactEmail:Email;
  contactEmailSubject:string;
  contactEmailDescription:string;

  contactusForm: FormGroup;
  constructor(public navCtrl: NavController,
  private formBuilder:FormBuilder,
  public genericService:GlobalGenericService,
  public communicationServiceApiProvider:CommunicationServiceApiProvider,
  public auth:AuthService
) {
        this.contactusForm =  this.formBuilder.group({
          //contactEmail:['',Validators.compose([Validators.required,Validators.minLength(8)])],
          contactEmailSubject:['',Validators.compose([Validators.required,Validators.minLength(8)])],
          contactEmailDescription:['',Validators.compose([Validators.required,Validators.minLength(8)])]
        });
  }


  SubmitContactForm(){
    if(this.contactusForm.valid && this.auth.authenticated){
          //Write the code to send email
          var communication = new CommunicationViewModel();
          communication.FromEmail = this.auth.getEmail();
          communication.Message = this.contactEmailDescription;
          communication.Subject = this.contactEmailSubject;
          communication.FromAlias = 'Contact Form';
          this.communicationServiceApiProvider.SendContactUsFormToManager(communication);
          this.genericService.presentToast("Thank you for writing to us!");
          this.contactusForm.reset();
    }else{
      this.genericService.presentToast("Form submission failed, please try again.");
    }

  }

}
