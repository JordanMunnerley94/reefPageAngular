import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent }  from './app.component';
import { ReefPageComponent} from './reef-comment.component';
import { ReefPageService } from './reef-page.service';
import { ReefZoneComponent } from "./reef-zones.component";

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
  ],
  declarations: [
      AppComponent,
      ReefPageComponent,
      ReefZoneComponent,
  ],
  providers:    [ ReefPageService ],
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
