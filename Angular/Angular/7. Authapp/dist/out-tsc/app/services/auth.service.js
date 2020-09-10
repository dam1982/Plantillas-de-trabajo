var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
var Auth = (function () {
    function Auth(router) {
        var _this = this;
        this.router = router;
        this.opciones = {
            allowedConnections: ["Username-Password-Authentication", "facebook", "twitter", "google-oauth2"],
            rememberLastLogin: false,
            socialButtonStyle: "small",
            theme: { "primaryColor": "#3A99D8" },
            languageDictionary: { "title": "AuthApp" },
            language: "es",
            additionalSignUpFields: [{
                    name: "direccion",
                    placeholder: "Ingrese su dirección",
                    validator: function (direccion) {
                        return {
                            valid: direccion.length >= 10,
                            hint: "La dirección debe de ser mayor a 10 caracteres"
                        };
                    }
                },
                {
                    name: "nombre_completo",
                    placeholder: "Ingrese su nombre"
                }]
        };
        this.lock = new Auth0Lock('LfPMsB9kyLyj0TDbXNXoSl9jWQR5cfEt', 'klerith.auth0.com', this.opciones);
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    alert(error);
                    return;
                }
                localStorage.setItem('profile', JSON.stringify(profile));
                _this.userProfile = profile;
            });
        });
    }
    Auth.prototype.getProfile = function () {
        if (this.authenticated()) {
            return JSON.parse(localStorage.getItem('profile'));
        }
        else {
            return {};
        }
    };
    Auth.prototype.login = function () {
        this.lock.show();
    };
    Auth.prototype.authenticated = function () {
        return tokenNotExpired();
    };
    Auth.prototype.logout = function () {
        this.router.navigate(['home']);
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    };
    return Auth;
}());
Auth = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router])
], Auth);
export { Auth };
//# sourceMappingURL=../../../../src/app/services/auth.service.js.map