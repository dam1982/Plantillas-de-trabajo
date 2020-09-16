import { Injectable } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { Printer } from 'src/app/model/printer';
import { PrinterPoint } from 'src/app/model/printer-point';
import { ApiGatewayService } from '../services/api-gateway.service';
import { TagType } from 'src/app/model/tag-type';
import { User } from 'src/app/model/user';
import { Template } from 'src/app/model/template';

@Injectable({
  providedIn: 'root'
})
export class AdminPrinterPointsBusinessService {

  CurrentPrinterPoint: PrinterPoint;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.resetCurrentPrinterPoint();
  }
  resetCurrentPrinterPoint() {
    this.CurrentPrinterPoint = new PrinterPoint();
    this.CurrentPrinterPoint.Printer = new Printer();
    this.CurrentPrinterPoint.TagType = new TagType();
    this.CurrentPrinterPoint.Template = new Template();
    this.CurrentPrinterPoint.Users = [];
  }


  public async GetPrinterPoints(filters: any): Promise<PrinterPoint[]> {
    let serviceObj = new ServiceObject("PrintingService", 'AdminPrinterPoint', 'GetPrinterPoints');
    serviceObj.Data = { filters };

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const printers = serviceObj.Data as PrinterPoint[];
        return printers;
      })
      .catch(x => {
        throw x.message;
      });
  }
  public async GetPrinterPoint(printerPointId: number): Promise<PrinterPoint> {
    let serviceObj = new ServiceObject("PrintingService", 'AdminPrinterPoint', 'GetPrinterPoint');
    serviceObj.Data = { printerPointId };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const printerPoint = serviceObj.Data as PrinterPoint;
        Object.assign(this.CurrentPrinterPoint, printerPoint)
        return printerPoint;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetTagTypes(): Promise<Object[]> {
    let serviceObj = new ServiceObject('PrintingService', 'AdminPrinterPoint', 'GetTagTypes');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;

        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const TagTypes = serviceObj.Data as Object[];
        return TagTypes;
      }).catch(x => {
        throw x.message;
      });
  }

  public async GetTemplates(): Promise<Object[]> {
    let serviceObj = new ServiceObject('PrintingService', 'AdminPrinterPoint', 'GetTemplates');
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;

        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const templates = serviceObj.Data as Object[];
        return templates;
      }).catch(x => {
        throw x.message;
      });
  }

  public async GetPrinters(): Promise<Printer[]> {
    let serviceObj = new ServiceObject("PrintingService", 'AdminPrinterPoint', 'GetPrinters');
    serviceObj.Data = { printerName: "" };
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

  public GetUsers(): Promise<Object[]> {
    let serviceObj = new ServiceObject("PrintingService", 'AdminPrinterPoint', 'GetUsers');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const users = serviceObj.Data as User[];
        return users;
      })
      .catch(x => {
        throw x;
      });
  }

  public SavePrinterPoint(printerPoint: PrinterPoint): Promise<boolean> {
    let serviceObject = new ServiceObject('PrintingService', 'AdminPrinterPoint', 'SavePrinterPoint');
    serviceObject.Data = { printerPoint };

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

  DeletePrinterPoint(printerPointId: number) {
    let serviceObject = new ServiceObject('PrintingService', 'AdminPrinterPoint', 'DeletePrinterPoint');
    serviceObject.Data = { printerPointId };

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
