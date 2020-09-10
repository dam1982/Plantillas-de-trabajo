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
import { HeroesService } from "../../services/heroes.service";
var HeroesComponent = (function () {
    function HeroesComponent(_heroesService) {
        var _this = this;
        this._heroesService = _heroesService;
        this.heroes = [];
        this.loading = true;
        this._heroesService.getHeroes()
            .subscribe(function (data) {
            _this.heroes = data;
            _this.loading = false;
        });
    }
    HeroesComponent.prototype.ngOnInit = function () {
    };
    HeroesComponent.prototype.borraHeroe = function (key$) {
        var _this = this;
        this._heroesService.borrarHeroe(key$)
            .subscribe(function (respuesta) {
            if (respuesta) {
                console.error(respuesta);
            }
            else {
                delete _this.heroes[key$];
            }
        });
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    Component({
        selector: 'app-heroes',
        templateUrl: './heroes.component.html',
        styles: []
    }),
    __metadata("design:paramtypes", [HeroesService])
], HeroesComponent);
export { HeroesComponent };
//# sourceMappingURL=../../../../../src/app/components/heroes/heroes.component.js.map