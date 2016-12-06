import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { ReefPageComponent }  from './reef-page.component';
import { ReefCommentComponent} from './reef-comment.component';
import { ReefPageService } from './reef-page.service';
import { ReefZoneComponent } from "./reef-zones.component";
import { ReefTableComponent } from "./reef-table.component";
import { ReefGraphsComponent } from "./reef-graphs.component";
import { IndexPageComponent } from "./index-page.component";
import { AppRoutingModule } from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CapitalizePipe} from "./capitalize.pipe";
import {ReefMapsComponent} from "./reef-maps.component";
import {ReefResolver} from "./reef.resolver";

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      ReefPageComponent,
      ReefCommentComponent,
      ReefZoneComponent,
      ReefTableComponent,
      ReefGraphsComponent,
      IndexPageComponent,
      ReefMapsComponent,
      CapitalizePipe
  ],
  providers:    [
      ReefPageService,
      ReefResolver
  ],
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
