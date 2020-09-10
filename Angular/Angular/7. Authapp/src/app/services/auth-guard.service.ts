import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Auth } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth:Auth,
    private router:Router
  ) { }

  canActivate( ){

    if( this.auth.authenticated() ){
      console.log("El guard paso!");
      return true;
    }else{
      console.error("Bloqueado por el Guard");
      this.router.navigate(['/home']);
      return false;
    }

  }

}
