import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent }  from './app.component';
import { ReefPageComponent} from './reef-comment.component';
import { ReefPageService } from './reef-page.service';
import { ReefZoneComponent } from "./reef-zones.component";
import {ReefTableComponent} from "./reef-table.component";
import {ReefGraphsComponent} from "./reef-graphs.component";

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
  ],
  declarations: [
      AppComponent,
      ReefPageComponent,
      ReefZoneComponent,
      ReefTableComponent,
      ReefGraphsComponent
  ],
  providers:    [ ReefPageService ],
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
