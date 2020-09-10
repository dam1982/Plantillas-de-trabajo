var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
var CapitalizadoPipe = (function () {
    function CapitalizadoPipe() {
    }
    CapitalizadoPipe.prototype.transform = function (value, todas) {
        if (todas === void 0) { todas = true; }
        value = value.toLowerCase();
        var nombres = value.split(" ");
        if (todas) {
            for (var i in nombres) {
                nombres[i] = nombres[i][0].toUpperCase() + nombres[i].substr(1);
            }
        }
        else {
            nombres[0] = nombres[0][0].toUpperCase() + nombres[0].substr(1);
        }
        return nombres.join(" ");
    };
    return CapitalizadoPipe;
}());
CapitalizadoPipe = __decorate([
    Pipe({
        name: 'capitalizado'
    }),
    __metadata("design:paramtypes", [])
], CapitalizadoPipe);
export { CapitalizadoPipe };
//# sourceMappingURL=../../../../src/app/pipes/capitalizado.pipe.js.map