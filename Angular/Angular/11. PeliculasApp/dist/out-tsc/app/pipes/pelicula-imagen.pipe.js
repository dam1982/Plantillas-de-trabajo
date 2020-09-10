var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var PeliculaImagenPipe = (function () {
    function PeliculaImagenPipe() {
    }
    PeliculaImagenPipe.prototype.transform = function (pelicula, poster) {
        if (poster === void 0) { poster = false; }
        var url = "http://image.tmdb.org/t/p/w500";
        if (poster) {
            return url + pelicula.poster_path;
        }
        if (pelicula.backdrop_path) {
            return url + pelicula.backdrop_path;
        }
        else {
            if (pelicula.poster_path) {
                return url + pelicula.poster_path;
            }
            else {
                return "assets/img/no-image.gif";
            }
        }
    };
    return PeliculaImagenPipe;
}());
PeliculaImagenPipe = __decorate([
    Pipe({
        name: 'peliculaImagen'
    })
], PeliculaImagenPipe);
export { PeliculaImagenPipe };
//# sourceMappingURL=../../../../src/app/pipes/pelicula-imagen.pipe.js.map