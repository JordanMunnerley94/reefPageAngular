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
var router_1 = require("@angular/router");
var ReefCommentComponent = (function () {
    function ReefCommentComponent(route) {
        this.route = route;
    }
    ReefCommentComponent.prototype.ngOnInit = function () {
        this.reefData = this.route.snapshot.data['reefData'];
        this.reefCommentEmpty = (this.reefData.reefComment === undefined || this.reefData.reefComment.comments === null);
        console.log(this.reefCommentEmpty, this.reefData);
        if (!this.reefCommentEmpty) {
            this.reefComments = this.reefData.reefComment.comments;
            this.reefComments = this.reefComments.replace('<P>', '');
            this.reefComments = this.reefComments.replace('</P>', '');
        }
    };
    ReefCommentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-reefcomments',
            templateUrl: 'reef-comment.component.html',
            styleUrls: ['reef-comment.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], ReefCommentComponent);
    return ReefCommentComponent;
}());
exports.ReefCommentComponent = ReefCommentComponent;
//# sourceMappingURL=reef-comment.component.js.map