import { User } from './user';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';



export class AppEnviroment {
   static ApiEndPoint: string;
   static Home:string;

   static get User (): User {
      if (localStorage.getItem("u"))
         return  JSON.parse(atob( localStorage.getItem("u")));
      else
         return new User();
               
   }

   static set User(user: User) {
      localStorage.setItem("u", btoa(JSON.stringify(user)));
   }


   static IsConnected(): boolean {
      return true;
   }

   static LoadConfiguration() {
      AppEnviroment.Home = '/dashboard/analytics';
      const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
      const jsonFile = `assets/config.json`;
      return new Promise<void>((resolve, reject) => {
        httpClient.get(jsonFile).toPromise().then((response) => {
          var result: any = response;
          AppEnviroment.ApiEndPoint = result.ApiEndPoint;
          resolve();
        }).catch((response: any) => {
          reject(`No puede cargar el archivo de configuración: ' ${JSON.stringify(response)}`);
        });
      });
      
    }
    
    static CloseSession()
    {
      localStorage.clear();
    }

}


