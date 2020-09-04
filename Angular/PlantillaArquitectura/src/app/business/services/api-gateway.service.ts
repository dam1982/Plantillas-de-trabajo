import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ServiceObject } from 'src/app/model/service-object';
import { AppEnviroment } from 'src/app/model/app-enviroment';





@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {

  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private router: Router){  //, private security: SecurityBusiness) {
  }

  async CreateSession(mail, password): Promise<ServiceObject> {
    return this.http
      .post(`${AppEnviroment.ApiEndPoint}Authorization/CreateSession`, { mail: mail, password: password })
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
    return this.http
      .post(`${AppEnviroment.ApiEndPoint}ServiceRouter/PostAction`, serviceObject)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }
/*
  async PostFileAction(file: FormData): Promise<ServiceObject> {

    const url: string = `${AppEnviroment.ApiEndPoint}ServiceRouter/PostFileAction`;
    return this.http.post(url, file)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async GetFileAction(serviceObject: ServiceObject) {
    try {
      //const url: string = `${AppEnviroment.ApiEndPoint}ServiceRouter/GetFileAction?Service=Indicators&Module=IndicatorsAdmin&Action=GetTemplate&SessionToken=${serviceObject.SessionToken}&Data=` + encodeURIComponent(`{"viewCode":"EducacionMapa"}`);
      const url: string = `${AppEnviroment.ApiEndPoint}ServiceRouter/GetFileAction?Service=${serviceObject.Service}&Module=${serviceObject.Module}&Action=${serviceObject.Action}&SessionToken=${serviceObject.SessionToken}&Data=` + encodeURIComponent(JSON.stringify(serviceObject.Data));
      window.location.href = url;
    } catch (x) {
      return this.security.VerificarSession(x);
    }
  }

  downLoadFile(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
*/
}
