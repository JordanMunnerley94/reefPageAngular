import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexPageComponent } from './index-page.component'
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full'},
    { path: 'index', component: IndexPageComponent },
    { path: 'reefpage/:reefid', component: AppComponent},
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}