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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require("@angular/http");
var app_component_1 = require('./app.component');
var reef_comment_component_1 = require('./reef-comment.component');
var reef_page_service_1 = require('./reef-page.service');
var reef_zones_component_1 = require("./reef-zones.component");
var reef_table_component_1 = require("./reef-table.component");
var reef_graphs_component_1 = require("./reef-graphs.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                reef_comment_component_1.ReefPageComponent,
                reef_zones_component_1.ReefZoneComponent,
                reef_table_component_1.ReefTableComponent,
                reef_graphs_component_1.ReefGraphsComponent
            ],
            providers: [reef_page_service_1.ReefPageService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map