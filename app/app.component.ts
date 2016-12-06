import 'rxjs/add/operator/switchMap';

import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>
`,
})

export class AppComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    }
}