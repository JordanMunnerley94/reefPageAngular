"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var reef_page_service_1 = require("./reef-page.service");
var AppComponent = (function () {
    function AppComponent(reefPageService) {
        this.reefPageService = reefPageService;
        this.title = 'Reef Page Test';
    }
    AppComponent.prototype.getReefData = function () {
        var _this = this;
        this.reefPageService.getData().then(function (reefData) {
            _this.reefData = reefData;
            // console.log("Zone data " + this.reefData);
        });
    };
    ;
    AppComponent.prototype.ngOnInit = function () {
        this.getReefData();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n<h1>{{title}}</h1>\n<my-reefzone></my-reefzone>\n<my-reefpage></my-reefpage>\n<my-reeftable></my-reeftable>\n\n",
        }), 
        __metadata('design:paramtypes', [reef_page_service_1.ReefPageService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map