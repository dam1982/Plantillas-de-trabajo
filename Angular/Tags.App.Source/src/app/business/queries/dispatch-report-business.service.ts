import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { AppEnviroment } from 'src/app/model/app-enviroment';

@Injectable({
  providedIn: 'root'
})
export class DispatchReportBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) {
    
   }

   GetDispatchReport(filters:any) :string {

    if(filters["EnlistmentDateMin"] && !filters["OrderNumber"] && !filters["EnlistmentNumber"] )
     throw new Error("Al ingresar fechas de alistamiento, debe seleccionar Nro. de Orden o Nro. de Alistamiento.");

    if(filters["OrderNumber"] &&  !filters["ProductCode"])
     throw new Error("Al ingresar un número de orden, debe seleccionar un producto.");

    var link = `${AppEnviroment.ApiEndPoint}ServiceRouter/GetFileAction?Service=TagsLogic&Module=DispatchReport&Action=GetDispatchReport&Data={"filters":${JSON.stringify(filters)}}&SessionToken=${AppEnviroment.User.SessionToken}`;

    return link;
   }


}
