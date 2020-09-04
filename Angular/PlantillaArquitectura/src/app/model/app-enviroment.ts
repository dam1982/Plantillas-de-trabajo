

export class AppEnviroment {
   static ApiEndPoint: string;
   static MediaRepository: string;
   static Db: any;

   

   static get SessionToken(): string {
      if (sessionStorage.getItem("Token"))
         return sessionStorage.getItem("Token");
      else
         return "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
   }

   static set SessionToken(token: string) {
      sessionStorage.setItem("Token", token);
   }


   static IsConnected(): boolean {
      return true;
   }

  

}


