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
var reef_page_component_1 = require('./reef-page.component');
var reef_comment_component_1 = require('./reef-comment.component');
var reef_page_service_1 = require('./reef-page.service');
var reef_zones_component_1 = require("./reef-zones.component");
var reef_table_component_1 = require("./reef-table.component");
var reef_graphs_component_1 = require("./reef-graphs.component");
var index_page_component_1 = require("./index-page.component");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var capitalize_pipe_1 = require("./capitalize.pipe");
var reef_maps_component_1 = require("./reef-maps.component");
var reef_resolver_1 = require("./reef.resolver");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                reef_page_component_1.ReefPageComponent,
                reef_comment_component_1.ReefCommentComponent,
                reef_zones_component_1.ReefZoneComponent,
                reef_table_component_1.ReefTableComponent,
                reef_graphs_component_1.ReefGraphsComponent,
                index_page_component_1.IndexPageComponent,
                reef_maps_component_1.ReefMapsComponent,
                capitalize_pipe_1.CapitalizePipe
            ],
            providers: [
                reef_page_service_1.ReefPageService,
                reef_resolver_1.ReefResolver
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map