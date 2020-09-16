import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import {CustomerFilter} from '../../model/customer-filter';
import {ProductFilter} from '../../model/product-filter';
import {ProductionLines} from '../../model/production-lines';
import {WarehouseFilter} from '../../model/ware-house-filter';
import{QueryInternalTag} from '../../model/query-internal-tag';
import {User} from '../../model/user';

import { ServiceObject } from 'src/app/model/service-object';
import { QueryInternalTagData } from 'src/app/model/query-internal-tag-data';

@Injectable({
  providedIn: 'root'
})
export class QueryInternalTagBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }



  
  GetCollectionCustomers(filters: any): Promise<CustomerFilter[]> {
      var servObj = new ServiceObject("TagsLogic","QueryInternalTag","GetCustomers");
        servObj.Data = { filters:{  Name:filters, Code:filters} };
        return this.apiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);
  
                return Promise.resolve( <CustomerFilter[]>servObj.Data);
            })
            .catch(x => {
                throw x.message;
            });
  }




  GetCollectionProducts(filters: any): Promise<ProductFilter[]> {
    var servObj = new ServiceObject("TagsLogic", "QueryInternalTag", "GetProducts");
        servObj.Data = { filters: { Name:filters, Code:filters} };
        return this.apiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);
                  
                return Promise.resolve(<ProductFilter[]>servObj.Data);
            })
            .catch(x => {
                throw x.message;
            });
  }







  GetCollectionProductLines(filters: any): Promise<ProductionLines[]> {
    var servObj = new ServiceObject("TagsLogic", "QueryInternalTag", "GetProductionLines");
        servObj.Data = { filters: filters };
        return this.apiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                
                if (!servObj.Success)
                    throw new Error(servObj.Message);
                      
                return Promise.resolve(<ProductionLines[]>servObj.Data);
            })
            .catch(x => {
                throw x.message;
            });
  }






  GetCollectionUsers(filters: any): Promise<User[]> {
    var servObj = new ServiceObject("TagsLogic", "QueryInternalTag", "GetUsers");
        servObj.Data = { filters: filters };
        return this.apiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);
  
                return Promise.resolve( <User[]>servObj.Data);
            })
            .catch(x => {
                throw x.message;
            });
  }


  GetCollectionWarehouses(filters: any): Promise<WarehouseFilter[]> {
    var servObj = new ServiceObject("TagsLogic", "QueryInternalTag", "GetWarehouses");
        servObj.Data = { filters: { Name:filters, Code:filters } };
        return this.apiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                
                if (!servObj.Success)
                    throw new Error(servObj.Message);
                return Promise.resolve(<WarehouseFilter[]>servObj.Data);
            })
            .catch(x => {
                throw x.message;
            });
  }


  GetCollectionQueriInternalTags(filters: any): Promise<QueryInternalTag> {
    var servObj = new ServiceObject("TagsLogic", "QueryInternalTag", "GetTags");
        servObj.Data = { filters: filters };
        return this.apiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);
               
                var result : QueryInternalTag = new QueryInternalTag();
                (<QueryInternalTag>servObj.Data).Tags.forEach(x=>{
                    let tag : QueryInternalTagData = new QueryInternalTagData();
                    Object.assign(tag,x);
                    result.Tags.push(tag);
                });
                Object.assign(result.Totals,(<QueryInternalTag>servObj.Data).Totals);
                
                return result;
            })
            .catch(x => {
                throw x.message;
            });
  }


}
