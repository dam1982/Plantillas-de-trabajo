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
import { PeliculasService } from "../../services/peliculas.service";
import { ActivatedRoute } from "@angular/router";
var BuscarComponent = (function () {
    function BuscarComponent(_ps, route) {
        var _this = this;
        this._ps = _ps;
        this.route = route;
        this.buscar = "";
        this.route.params.subscribe(function (parametros) {
            console.log(parametros);
            if (parametros['texto']) {
                _this.buscar = parametros['texto'];
                _this.buscarPelicula();
            }
        });
    }
    BuscarComponent.prototype.ngOnInit = function () {
    };
    BuscarComponent.prototype.buscarPelicula = function () {
        if (this.buscar.length == 0) {
            return;
        }
        this._ps.buscarPelicula(this.buscar)
            .subscribe();
    };
    return BuscarComponent;
}());
BuscarComponent = __decorate([
    Component({
        selector: 'app-buscar',
        templateUrl: './buscar.component.html',
        styles: []
    }),
    __metadata("design:paramtypes", [PeliculasService,
        ActivatedRoute])
], BuscarComponent);
export { BuscarComponent };
//# sourceMappingURL=../../../../../src/app/components/buscar/buscar.component.js.map