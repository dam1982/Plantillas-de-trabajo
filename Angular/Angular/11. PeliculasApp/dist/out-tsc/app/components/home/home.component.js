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
var HomeComponent = (function () {
    function HomeComponent(_ps) {
        var _this = this;
        this._ps = _ps;
        this._ps.getCartelera()
            .subscribe(function (data) { return _this.cartelera = data; });
        this._ps.getPopulares()
            .subscribe(function (data) { return _this.populares = data; });
        this._ps.getPopularesNinos()
            .subscribe(function (data) { return _this.popularesNinos = data; });
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styles: []
    }),
    __metadata("design:paramtypes", [PeliculasService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=../../../../../src/app/components/home/home.component.js.map