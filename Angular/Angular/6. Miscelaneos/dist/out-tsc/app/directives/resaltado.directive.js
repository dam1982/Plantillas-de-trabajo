var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
var ResaltadoDirective = (function () {
    function ResaltadoDirective(el) {
        this.el = el;
    }
    ResaltadoDirective.prototype.mouseEntro = function () {
        this.resaltar(this.nuevoColor || 'yellow');
    };
    ResaltadoDirective.prototype.mouseSalio = function () {
        this.resaltar(null);
    };
    ResaltadoDirective.prototype.resaltar = function (color) {
        this.el.nativeElement.style.backgroundColor = color;
    };
    return ResaltadoDirective;
}());
__decorate([
    Input("appResaltado"),
    __metadata("design:type", String)
], ResaltadoDirective.prototype, "nuevoColor", void 0);
__decorate([
    HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResaltadoDirective.prototype, "mouseEntro", null);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResaltadoDirective.prototype, "mouseSalio", null);
ResaltadoDirective = __decorate([
    Directive({
        selector: '[appResaltado]'
    }),
    __metadata("design:paramtypes", [ElementRef])
], ResaltadoDirective);
export { ResaltadoDirective };
//# sourceMappingURL=../../../../src/app/directives/resaltado.directive.js.map