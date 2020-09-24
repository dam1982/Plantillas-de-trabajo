import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationBusinessService {

  constructor(private apigateway:ApiGatewayService,private router: Router) { }

  public async CreateSession(login : string, password : string) 
  {
    return this.apigateway.CreateSession(login, password)
      .then(x => {
        let serviceResponse = <ServiceObject>x;
        if (!serviceResponse.Success)
          throw new Error(serviceResponse.Message);
        //Guarda Usuario en Session
        serviceResponse.Data.SessionToken = serviceResponse.SessionToken;
        AppEnviroment.User = serviceResponse.Data;

        //Mapea objeto   
        return Promise.resolve(serviceResponse.User);
      })
      .catch(x => {
        throw x;
      });
  }

  public CloseSession() 
  {
    AppEnviroment.CloseSession();
    this.router.navigate(['/auth/signin']);
  }

  public ValidateSession() : boolean
  {
    if(AppEnviroment.User == null)
      {
        this.CloseSession();     
        return false;
      }
      return true;
  }

  public async RememberPassword(mail:string): Promise<string>
  {
    return this.apigateway.RememberPassword(mail)
      .then(x => {
        let serviceResponse = <ServiceObject>x;
        if (!serviceResponse.Success)
          throw new Error(serviceResponse.Message);
        
        //Mapea objeto   
        return Promise.resolve(serviceResponse.Message);
      })
      .catch(x => {
        throw x;
      });
  }


  public GetUser()
  {
    this.ValidateSession();
    return AppEnviroment.User;
  }

  public GetApiEndPoint()
  {
    return AppEnviroment.ApiEndPoint;
  }

}
