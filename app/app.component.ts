import 'rxjs/add/operator/switchMap';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {ReefPageService} from "./reef-page.service";

@Component({
  selector: 'my-app',
  template: `
<h1>{{title}}</h1>
<my-reefzone></my-reefzone>
<my-reeftable></my-reeftable>
<my-graphs></my-graphs>
<my-reefcomments></my-reefcomments>

`,
})
export class AppComponent implements OnInit {

  public reefData: any;

  public title: String = 'Reef Page Test';

  constructor(
    private reefPageService: ReefPageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // getReefData(): void {
  //   this.reefPageService.getData().then(reefData => {
  //     this.reefData = reefData;
  //     this.title = reefData.reefComment.reefName + " PAGE.";
  //   });
  // };

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.reefPageService.getData(params['reefid']))
  }
}
