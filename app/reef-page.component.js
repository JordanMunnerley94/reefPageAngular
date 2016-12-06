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
var ReefPageComponent = (function () {
    function ReefPageComponent(reefPageService, route, location) {
        this.reefPageService = reefPageService;
        this.route = route;
        this.location = location;
        this.title = 'Reef Page Test';
    }
    ReefPageComponent.prototype.getReefData = function (id) {
        var _this = this;
        this.reefPageService.getData(id).then(function (reefData) {
            _this.reefData = reefData;
            console.log("Reef Data : ", reefData);
            _this.title = reefData.reef.reefName + " PAGE.";
        });
    };
    ;
    ReefPageComponent.prototype.ngOnInit = function () {
        // this.route.params
        //     .switchMap((params: Params) => this.reefPageService.getData(params['reefid']))
        //     .subscribe(test => this.testing = test );
        // console.log(this.testing);
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['reefid'];
            _this.getReefData(_this.id);
        });
        console.log(this.id);
        // console.log()
    };
    ReefPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-reef-page',
            templateUrl: 'reef-page.component.html',
            styleUrls: [
                'reef-page.component.css'
            ],
        }), 
        __metadata('design:paramtypes', [reef_page_service_1.ReefPageService, router_1.ActivatedRoute, common_1.Location])
    ], ReefPageComponent);
    return ReefPageComponent;
}());
exports.ReefPageComponent = ReefPageComponent;
//# sourceMappingURL=reef-page.component.js.map