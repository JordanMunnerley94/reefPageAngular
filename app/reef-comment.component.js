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
var router_1 = require("@angular/router");
var ReefCommentComponent = (function () {
    function ReefCommentComponent(reefPageService, route) {
        this.reefPageService = reefPageService;
        this.route = route;
    }
    ReefCommentComponent.prototype.getReefData = function (id) {
        var _this = this;
        this.reefPageService.getData(id).then(function (reefData) {
            _this.reefData = reefData;
            _this.reefComments = _this.reefData.reefComment.comments;
            // Removing out of place <P> tags from the received comment.
            if (_this.reefComments !== null) {
                _this.reefComments = _this.reefComments.replace('<P>', '');
                _this.reefComments = _this.reefComments.replace('</P>', '');
            }
        });
    };
    ;
    ReefCommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['reefid'];
            _this.getReefData(_this.id);
        });
    };
    ReefCommentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-reefcomments',
            templateUrl: 'reef-comment.component.html',
            styleUrls: ['reef-comment.component.css'],
        }), 
        __metadata('design:paramtypes', [reef_page_service_1.ReefPageService, router_1.ActivatedRoute])
    ], ReefCommentComponent);
    return ReefCommentComponent;
}());
exports.ReefCommentComponent = ReefCommentComponent;
//# sourceMappingURL=reef-comment.component.js.map