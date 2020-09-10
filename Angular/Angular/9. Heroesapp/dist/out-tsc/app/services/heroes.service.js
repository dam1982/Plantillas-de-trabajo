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
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
var HeroesService = (function () {
    function HeroesService(http) {
        this.http = http;
        this.heroesURL = "https://heroesapp-59949.firebaseio.com/heroes.json";
        this.heroeURL = "https://heroesapp-59949.firebaseio.com/heroes/";
    }
    HeroesService.prototype.nuevoHeroe = function (heroe) {
        var body = JSON.stringify(heroe);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(this.heroesURL, body, { headers: headers })
            .map(function (res) {
            console.log(res.json());
            return res.json();
        });
    };
    HeroesService.prototype.actualizarHeroe = function (heroe, key$) {
        var body = JSON.stringify(heroe);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var url = this.heroeURL + "/" + key$ + ".json";
        return this.http.put(url, body, { headers: headers })
            .map(function (res) {
            console.log(res.json());
            return res.json();
        });
    };
    HeroesService.prototype.getHeroe = function (key$) {
        var url = this.heroeURL + "/" + key$ + ".json";
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    HeroesService.prototype.getHeroes = function () {
        return this.http.get(this.heroesURL)
            .map(function (res) { return res.json(); });
    };
    HeroesService.prototype.borrarHeroe = function (key$) {
        var url = this.heroeURL + "/" + key$ + ".json";
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    return HeroesService;
}());
HeroesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], HeroesService);
export { HeroesService };
//# sourceMappingURL=../../../../src/app/services/heroes.service.js.map