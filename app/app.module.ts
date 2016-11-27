import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ReefPageComponent} from './reef-page.component';
import { ReefPageService } from './reef-page.service';
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
  ],
  declarations: [
      AppComponent,
      ReefPageComponent,
  ],
  providers:    [ ReefPageService ],
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
