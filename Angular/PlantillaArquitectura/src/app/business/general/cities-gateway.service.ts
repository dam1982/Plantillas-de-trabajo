import { Injectable } from '@angular/core';
import { IGateway } from '../services/igateway';
import { City } from 'src/app/model/city';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesGatewayService implements IGateway<City> {
  constructor(private apiGatewayService: ApiGatewayService) { }

  GetSingle(filters: any): Promise<City> {
    throw new Error("Method not implemented.");
  }
  GetCollection(filters: any): Promise<City[]> {
    var servObj = new ServiceObject("BackendService", "City", "GetCities");
        servObj.Data = { filter: filters };
        return this.apiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);

                var cities = <City[]>servObj.Data;
                return Promise.resolve(cities);
            })
            .catch(x => {
                throw x.message;
            });
  }
  Save(object: City): void {
    throw new Error("Method not implemented.");
  }
  SaveCollection(object: City[]): void {
    throw new Error("Method not implemented.");
  }

  
}
