import { Injectable } from '@angular/core';
import { ServiceObject } from '../../model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';
import { Profile } from '../../model/profile'
import { User } from '../../model/user'


@Injectable({
    providedIn: 'root'
})
export class UserBusiness {

    constructor(private ApiGatewayService: ApiGatewayService) { }

    GetUsers(filters: any): Promise<User[]> {

        var servObj = new ServiceObject("Users", "User", "GetUsers");
        servObj.Data = { filter: filters };
        return this.ApiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);

                return Promise.resolve(<User[]>servObj.Data);
            })
            .catch(x => {
                throw x;
            });
    }


    SaveUser(User: User): Promise<User> {
        var servObj = new ServiceObject("Users", "User", "SaveUser");
        if (User.UserId == 0)
            User.Password = User.Document;

        servObj.Data = { user: User };
        return this.ApiGatewayService.PostAction(servObj)

            .then(x => {
                servObj = <ServiceObject>x;

                if (!servObj.Success)
                    throw new Error(servObj.Message);

                return <User>servObj.Data;
            })
            .catch(x => {
                throw x;
            });
    }



    InactiveUser(userId: number, check: Boolean): Promise<boolean> {
        var servObj = new ServiceObject("Users", "User", "InactivateUser");
        servObj.Data = { userId: userId, active: check };
        return this.ApiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);

                return Promise.resolve(<boolean>servObj.Data);
            })
            .catch(x => {
                throw x;
            });
    }



    GeneratePassword(userId: number): Promise<boolean> {
        var servObj = new ServiceObject("Users", "User", "GeneratePassword");
        servObj.Data = { userId: userId };
        return this.ApiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);

                return Promise.resolve(<boolean>servObj.Data);
            })
            .catch(x => {
                throw x;
            });
    }

    GetUser(userId: number): Promise<User> {

        if (userId == 0)
            return Promise.resolve(new User());

        var servObj = new ServiceObject("Users", "User", "GetUser");
        servObj.Data = { userId: userId };
        return this.ApiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);
                var user:User= new User();
                Object.assign(user,servObj.Data) ; 
                if(user.Personalize2)
                    user.Personalize2 = Number(user.Personalize2);
                return Promise.resolve(user);
            })
            .catch(x => {
                throw x;
            });
    }


    GetProfiles(): Promise<Profile[]> {
        var servObj = new ServiceObject("Users", "User", "GetProfiles");
        servObj.Data = {};
        return this.ApiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);

                return Promise.resolve(<Profile[]>servObj.Data);
            })
            .catch(x => {
                throw x;
            });
    }


    GetProccessTypes(): Promise<string[]> {
        var servObj = new ServiceObject("TagsLogic", "CatalogValue", "GetCatalogValue");
        servObj.Data = { "catalogId": "TipoProceso" };
        return this.ApiGatewayService.PostAction(servObj)
            .then(x => {
                servObj = <ServiceObject>x;
                if (!servObj.Success)
                    throw new Error(servObj.Message);

                return Promise.resolve(<string[]>servObj.Data);
            })
            .catch(x => {
                throw x;
            });
    }






}
