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
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var reef_page_service_1 = require("./reef-page.service");
var AppComponent = (function () {
    function AppComponent(reefPageService, route, location) {
        this.reefPageService = reefPageService;
        this.route = route;
        this.location = location;
        this.title = 'Reef Page Test';
    }
    // getReefData(): void {
    //   this.reefPageService.getData().then(reefData => {
    //     this.reefData = reefData;
    //     this.title = reefData.reefComment.reefName + " PAGE.";
    //   });
    // };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.reefPageService.getData(params['reefid']); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n<h1>{{title}}</h1>\n<my-reefzone></my-reefzone>\n<my-reeftable></my-reeftable>\n<my-graphs></my-graphs>\n<my-reefcomments></my-reefcomments>\n\n",
        }), 
        __metadata('design:paramtypes', [reef_page_service_1.ReefPageService, router_1.ActivatedRoute, common_1.Location])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map