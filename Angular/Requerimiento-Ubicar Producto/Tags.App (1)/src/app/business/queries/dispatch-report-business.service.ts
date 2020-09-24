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
    var link = `${AppEnviroment.ApiEndPoint}ServiceRouter/GetFileAction?Service=TagsLogic&Module=DispatchReport&Action=GetDispatchReport&Data={"filters":${JSON.stringify(filters)}}&SessionToken=${AppEnviroment.User.SessionToken}`;

    return link;
   }


}
