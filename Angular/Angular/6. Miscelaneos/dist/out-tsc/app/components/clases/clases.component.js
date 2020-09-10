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
var ClasesComponent = (function () {
    function ClasesComponent() {
        this.alerta = "alert-danger";
        this.loading = false;
        this.propiedades = {
            danger: false
        };
    }
    ClasesComponent.prototype.ngOnInit = function () {
    };
    ClasesComponent.prototype.ejecutar = function () {
        var _this = this;
        this.loading = true;
        setTimeout(function () { return _this.loading = false; }, 3000);
    };
    return ClasesComponent;
}());
ClasesComponent = __decorate([
    Component({
        selector: 'app-clases',
        templateUrl: './clases.component.html'
    }),
    __metadata("design:paramtypes", [])
], ClasesComponent);
export { ClasesComponent };
//# sourceMappingURL=../../../../../src/app/components/clases/clases.component.js.map