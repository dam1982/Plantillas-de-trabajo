import { Injectable } from '@angular/core';
import { TransferPT, TransferTypes } from 'src/app/model/transfer-pt';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { CustomerFilter } from 'src/app/model/customer-filter';
import { ProductFilter } from 'src/app/model/product-filter';
import { User } from 'src/app/model/user';
import { State } from 'src/app/model/state';
import { QueryTransferPT } from 'src/app/model/query-transfer-pt';

@Injectable({
  providedIn: 'root'
})
export class ConfirmTransferBusinessService {


  CurrentTransfer: TransferPT;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentTransfer = new TransferPT(TransferTypes.Transfer);
  }

  public async GetCustomers(filters: any): Promise<CustomerFilter[]> {
    let serviceObj = new ServiceObject("TagsLogic", 'ConfirmTransfer', 'GetCustomers');
    serviceObj.Data = { filters: { Name: filters, Code: filters } };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const customers = serviceObj.Data as CustomerFilter[];
        return customers;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetProducts(filters: any): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'ConfirmTransfer', 'GetProducts');
    serviceObj.Data = { filters: { Name: filters, Code: filters } };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const prods = serviceObj.Data as ProductFilter[];
        return prods;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetUsers(filters: any): Promise<User[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'ConfirmTransfer', 'GetUsers');
    serviceObject.Data = { filters: filters };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        }
        const transferPT = serviceObject.Data as User[];
        return transferPT;
      })
      .catch(x => {
        throw x.message;
      });
  }


  public async GetStates(filters: any): Promise<State[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'ConfirmTransfer', 'GetStates');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;

        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const states = serviceObj.Data as State[];
        return states;
      }).catch(x => {
        throw x.message;
      });
  }

  public async GetTransfersbyConfirm(filters: QueryTransferPT): Promise<QueryTransferPT[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'ConfirmTransfer', 'GetTransfersbyConfirm');
    serviceObject.Data = { filters: filters };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        }
        const transferPT = serviceObject.Data as QueryTransferPT[];
        return transferPT;
      })
      .catch(x => {
        throw x;
      });
  }

  public GetTransfer(id: number): Promise<TransferPT> {
    var servObj = new ServiceObject("TagsLogic", "ConfirmTransfer", "GetTransfer");
    servObj.Data = { transferId: id };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        this.CurrentTransfer = x.Data;
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public GetReasonsNoConfirmation(): Promise<any> {
    var servObj = new ServiceObject("TagsLogic", "ConfirmTransfer", "GetReasonsNoConfirmation");
    servObj.Data = { filter: null };
    return this.apiGatewayService.PostActionSuccess(servObj);
  }

  public async ConfirmTransfer(transfer: TransferPT): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'ConfirmTransfer', 'ConfirmTransfer');
    serviceObject.Data = { transfer: transfer };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success || !serviceObject.Data)
          throw new Error(serviceObject.Message);

        return Promise.resolve(true);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
