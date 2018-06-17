import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalGenericService } from '../../services/globalgeneric.service';
import { CommunicationViewModel } from '../../dto/CommunicationViewModel';

/*
  Generated class for the CommunicationServiceApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CommunicationServiceApiProvider{    
    
    constructor(public http: HttpClient,private genericService:GlobalGenericService) {      
    }

    SendContactUsFormToManager(communicationViewModel:CommunicationViewModel){      
        return this.http.post(this.genericService.ltsParkingApiDomain.toString().concat("api/Email"),
        communicationViewModel,
        this.genericService.httpOptions).subscribe(resp =>{
            console.log(resp);
        })
        ;
    }
}