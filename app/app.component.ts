import 'rxjs/add/operator/switchMap';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {ReefPageService} from "./reef-page.service";

@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>
`,
})

export class AppComponent { }