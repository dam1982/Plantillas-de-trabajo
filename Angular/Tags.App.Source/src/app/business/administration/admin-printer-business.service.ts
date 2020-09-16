import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { Printer } from 'src/app/model/printer';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class AdminPrinterBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) {
  }

  public async GetPrinters(printerName: string): Promise<Printer[]> {
    let serviceObj = new ServiceObject("PrintingService", 'AdminPrinter', 'GetPrinters');
    serviceObj.Data = { printerName };

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const printers = serviceObj.Data as Printer[];
        return printers;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public SavePrinter(printer: Printer): Promise<boolean> {
    let serviceObject = new ServiceObject('PrintingService', 'AdminPrinter', 'SavePrinter');
    serviceObject.Data = { printer };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as boolean;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

  public DeletePrinter(printerId: number): Promise<boolean> {
    let serviceObject = new ServiceObject('PrintingService', 'AdminPrinter', 'DeletePrinter');
    serviceObject.Data = { printerId };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as boolean;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

}
