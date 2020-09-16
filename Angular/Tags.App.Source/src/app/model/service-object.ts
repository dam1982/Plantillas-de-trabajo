import { AppEnviroment } from './app-enviroment';
import { User } from './user';

export class ServiceObject {

    constructor(public Service?:string, public Module?:string,public Action?:string, ){
        this.Service = Service;
        this.Module= Module;
        this.Action = Action;                
    }

    Success:boolean;
    Message:string;
    SessionToken:string;
    Data:any;
    User:User;
    IpAddress:string;       
    ApiKey:string;
    Version:string;
}
