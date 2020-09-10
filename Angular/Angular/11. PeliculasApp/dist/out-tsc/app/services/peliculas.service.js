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
import { Jsonp } from "@angular/http";
import 'rxjs/Rx';
var PeliculasService = (function () {
    function PeliculasService(jsonp) {
        this.jsonp = jsonp;
        this.apikey = "9d6a90c2b95d4a700ee5cb9705c94b0f";
        this.urlMoviedb = "https://api.themoviedb.org/3";
        this.peliculas = [];
    }
    PeliculasService.prototype.getCartelera = function () {
        var desde = new Date();
        var hasta = new Date();
        hasta.setDate(hasta.getDate() + 7);
        var desdeStr = desde.getFullYear() + "-" + (desde.getMonth() + 1) + "-" + desde.getDate();
        var hastaStr = hasta.getFullYear() + "-" + (hasta.getMonth() + 1) + "-" + hasta.getDate();
        var url = this.urlMoviedb + "/discover/movie?primary_release_date.gte=" + desdeStr + "&primary_release_date.lte=" + hastaStr + "&api_key=" + this.apikey + "&language=es&callback=JSONP_CALLBACK";
        return this.jsonp.get(url)
            .map(function (res) { return res.json().results; });
    };
    PeliculasService.prototype.getPopulares = function () {
        var url = this.urlMoviedb + "/discover/movie?sort_by=popularity.desc&api_key=" + this.apikey + "&language=es&callback=JSONP_CALLBACK";
        return this.jsonp.get(url)
            .map(function (res) { return res.json().results; });
    };
    PeliculasService.prototype.getPopularesNinos = function () {
        var url = this.urlMoviedb + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=" + this.apikey + "&language=es&callback=JSONP_CALLBACK";
        return this.jsonp.get(url)
            .map(function (res) { return res.json().results; });
    };
    PeliculasService.prototype.buscarPelicula = function (texto) {
        var _this = this;
        var url = this.urlMoviedb + "/search/movie?query=" + texto + "&sort_by=popularity.desc&api_key=" + this.apikey + "&language=es&callback=JSONP_CALLBACK";
        return this.jsonp.get(url)
            .map(function (res) {
            _this.peliculas = res.json().results;
            console.log(_this.peliculas);
            return res.json().results;
        });
    };
    PeliculasService.prototype.getPelicula = function (id) {
        var url = this.urlMoviedb + "/movie/" + id + "?api_key=" + this.apikey + "&language=es&callback=JSONP_CALLBACK";
        return this.jsonp.get(url)
            .map(function (res) { return res.json(); });
    };
    return PeliculasService;
}());
PeliculasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Jsonp])
], PeliculasService);
export { PeliculasService };
//# sourceMappingURL=../../../../src/app/services/peliculas.service.js.map