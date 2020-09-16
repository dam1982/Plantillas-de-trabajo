import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ServiceObject } from 'src/app/model/service-object';
import { User } from 'src/app/model/user';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {
  private user:User;
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private router:Router){  //, private security: SecurityBusiness) {  
    
  }

  LoadUser()
  {    
    this.user = AppEnviroment.User;
    if(this.user == null)
      this.CloseSession();
  }

  CloseSession()
  {
    AppEnviroment.CloseSession();
    this.router.navigate(['/auth/signin']);
  }
  async CreateSession(login, password): Promise<ServiceObject> {
    
    
    return this.http
      .post(`${AppEnviroment.ApiEndPoint}Authorization/CreateSession`, { login: login, password: password })
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async RememberPassword(mail): Promise<ServiceObject> {
    return this.http
      .post(`${AppEnviroment.ApiEndPoint}Authorization/RememberPassword`, { mail: mail })
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }


  async PostAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    this.LoadUser();
    serviceObject.SessionToken = this.user.SessionToken;
    return this.http
      .post(`${AppEnviroment.ApiEndPoint}ServiceRouter/PostAction`, serviceObject)
      .toPromise()
      .then(x => {
        return Promise.resolve(this.ValidateSecurity(<ServiceObject>x));
      })
      .catch(x => {
        throw x;
      });
  }

   /**
   * Procesa una llamada que se espera siempre exitosa, throw error dlc 
   */
  PostActionSuccess(serviceObject: ServiceObject):  any {
    let response = this.PostAction(serviceObject).then(servObj => {      
     if (!servObj.Success)
       throw new Error(servObj.Message);
     this.ValidateSecurity(<ServiceObject>servObj);    
     return servObj.Data;
   });      
   return response;     
 }

  async PostFileAction(serviceObject: ServiceObject,fileName:string, file: File): Promise<ServiceObject> {
    this.LoadUser();
    serviceObject.SessionToken = this.user.SessionToken;
    const formData = new FormData();
    formData.append('ServiceObject', JSON.stringify(serviceObject));
    formData.append(fileName, file, fileName);
    const url: string = `${AppEnviroment.ApiEndPoint}ServiceRouter/PostFileAction`;
    return this.http.post(url, formData)
      .toPromise()
      .then(x => {
        return Promise.resolve(this.ValidateSecurity(<ServiceObject>x));
      })
      .catch(x => {
        throw x;
      });
  }

  async GetFileAction(serviceObject: ServiceObject) {
    try {
      this.LoadUser();
      serviceObject.SessionToken = this.user.SessionToken;
      const url: string = `${AppEnviroment.ApiEndPoint}ServiceRouter/GetFileAction?Service=${serviceObject.Service}&Module=${serviceObject.Module}&Action=${serviceObject.Action}&SessionToken=${serviceObject.SessionToken}&Data=` + encodeURIComponent(JSON.stringify(serviceObject.Data));
      var win = window.open(url, '_blank');
      win.focus();      
    } catch (x) {
      throw x;
    }
  }

  ValidateSecurity(serviceObject:ServiceObject):ServiceObject
  {
    if(serviceObject.Data && serviceObject.Data.ClassName && serviceObject.Data.ClassName == "System.Security.SecurityException")
    {
      this.CloseSession(); 
      throw new Error(serviceObject.Message);
    }      
    return serviceObject;
  }
}
