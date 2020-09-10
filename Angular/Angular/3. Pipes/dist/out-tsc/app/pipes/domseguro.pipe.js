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
import { DomSanitizer } from '@angular/platform-browser';
var DomseguroPipe = (function () {
    function DomseguroPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    DomseguroPipe.prototype.transform = function (value, url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
    };
    return DomseguroPipe;
}());
DomseguroPipe = __decorate([
    Pipe({
        name: 'domseguro'
    }),
    __metadata("design:paramtypes", [DomSanitizer])
], DomseguroPipe);
export { DomseguroPipe };
//# sourceMappingURL=../../../../src/app/pipes/domseguro.pipe.js.map