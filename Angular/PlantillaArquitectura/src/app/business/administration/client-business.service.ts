import { Injectable } from '@angular/core';
import { City } from 'src/app/model/city';
import { CitiesGatewayService } from '../general/cities-gateway.service';




@Injectable({
  providedIn: 'root'
})
export class ClientBusinessService {
  
  constructor(private citiesGateway : CitiesGatewayService) {
    
   }

   public async GetCities(): Promise< City[]> {

    return await this.citiesGateway.GetCollection(null)
            .then(x => {
                return Promise.resolve(x);
            })
            .catch(x => {
                throw x;
            });    
  }
}
