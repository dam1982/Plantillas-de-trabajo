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
import { Router, ActivatedRoute } from "@angular/router";
import { HeroesService } from "../../services/heroes.service";
var HeroeComponent = (function () {
    function HeroeComponent(_heroesService, router, route) {
        var _this = this;
        this._heroesService = _heroesService;
        this.router = router;
        this.route = route;
        this.heroe = {
            nombre: "",
            bio: "",
            casa: "Marvel"
        };
        this.nuevo = false;
        this.route.params
            .subscribe(function (parametros) {
            _this.id = parametros['id'];
            if (_this.id !== "nuevo") {
                _this._heroesService.getHeroe(_this.id)
                    .subscribe(function (heroe) { return _this.heroe = heroe; });
            }
        });
    }
    HeroeComponent.prototype.ngOnInit = function () {
    };
    HeroeComponent.prototype.guardar = function () {
        var _this = this;
        console.log(this.heroe);
        if (this.id == "nuevo") {
            this._heroesService.nuevoHeroe(this.heroe)
                .subscribe(function (data) {
                _this.router.navigate(['/heroe', data.name]);
            }, function (error) { return console.error(error); });
        }
        else {
            this._heroesService.actualizarHeroe(this.heroe, this.id)
                .subscribe(function (data) {
                console.log(data);
            }, function (error) { return console.error(error); });
        }
    };
    HeroeComponent.prototype.agregarNuevo = function (forma) {
        this.router.navigate(['/heroe', 'nuevo']);
        forma.reset({
            casa: "Marvel"
        });
    };
    return HeroeComponent;
}());
HeroeComponent = __decorate([
    Component({
        selector: 'app-heroe',
        templateUrl: './heroe.component.html',
        styles: []
    }),
    __metadata("design:paramtypes", [HeroesService,
        Router,
        ActivatedRoute])
], HeroeComponent);
export { HeroeComponent };
//# sourceMappingURL=../../../../../src/app/components/heroes/heroe.component.js.map