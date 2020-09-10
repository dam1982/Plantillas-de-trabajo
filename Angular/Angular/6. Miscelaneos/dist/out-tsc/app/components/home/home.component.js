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
var HomeComponent = (function () {
    function HomeComponent() {
        console.log("constructor");
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit");
    };
    HomeComponent.prototype.ngOnChanges = function () {
        console.log("ngOnChanges");
    };
    HomeComponent.prototype.ngDoCheck = function () {
        console.log("ngDoCheck");
    };
    HomeComponent.prototype.ngAfterContentInit = function () {
        console.log("ngAfterContentInit");
    };
    HomeComponent.prototype.ngAfterContentChecked = function () {
        console.log("ngAfterContentChecked");
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        console.log("ngAfterViewInit");
    };
    HomeComponent.prototype.ngAfterViewChecked = function () {
        console.log("ngAfterViewChecked");
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy");
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        template: "\n\n  <app-ng-style></app-ng-style>\n  <br>\n\n  <app-css></app-css>\n  <br>\n\n  <app-clases></app-clases>\n  <br><br/>\n\n  <p [appResaltado]=\"'red'\">\n    Hola Mundo\n  </p>\n\n  <br>\n  <app-ng-switch></app-ng-switch>\n\n  ",
        styles: []
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=../../../../../src/app/components/home/home.component.js.map