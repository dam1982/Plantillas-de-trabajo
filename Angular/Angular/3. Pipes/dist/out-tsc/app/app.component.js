var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
var AppComponent = (function () {
    function AppComponent() {
        this.nombre = "Fernando";
        this.nombre2 = "fernAndo alberto heRRera jimenez";
        this.arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.PI = Math.PI;
        this.a = 0.234;
        this.salario = 1234.5;
        this.heroe = {
            nombre: "Logan",
            clave: "Wolverine",
            edad: 500,
            direccion: {
                calle: "Primera",
                casa: "19"
            }
        };
        this.valorDePromesa = new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve('LLego la data!'); }, 3500);
        });
        this.fecha = new Date();
        this.video = "mOeSfOJrUIk";
        this.activar = true;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map