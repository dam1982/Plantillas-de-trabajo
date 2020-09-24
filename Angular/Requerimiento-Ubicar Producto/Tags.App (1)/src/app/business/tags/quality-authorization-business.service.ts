import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class QualityAuthorizationBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }


  
  ValidateAuthorization(login:string, password:string) : Promise<number>
  {
    let serviceObj = new ServiceObject("TagsLogic", 'QualityAuthorization', 'ValidateAuthorization');
    serviceObj.Data = { user:login, password: btoa(password)};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }  
        let result =serviceObj.Data as number; 
        if(result == 0)             
          throw new Error("Credenciales inválidas.");
        return result;
      })
      .catch(x => {
        throw x;
      });
  }

}
