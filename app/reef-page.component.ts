import 'rxjs/add/operator/switchMap';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {ReefPageService} from "./reef-page.service";

@Component({
  selector: 'my-reef-page',
  template: `
<h1>{{title}}</h1>
<my-reefzone></my-reefzone>
<my-reeftable></my-reeftable>
<my-graphs></my-graphs>
<my-reefcomments></my-reefcomments>

`,
})
export class ReefPageComponent implements OnInit {

  public reefData: any;

  private id: string;

  public title: String = 'Reef Page Test';

  constructor(
    private reefPageService: ReefPageService,
    private route: ActivatedRoute,
    private location: Location

  ) {}

  getReefData(id: string): void {
    this.reefPageService.getData(id).then(reefData => {
      this.reefData = reefData;
      this.title = reefData.reefComment.reefName + " PAGE.";
    });
  };

  ngOnInit(): void {
    // this.route.params
    //     .switchMap((params: Params) => this.reefPageService.getData(params['reefid']))
    //     .subscribe(test => this.testing = test );
    // console.log(this.testing);

    this.route.params.subscribe(params => {
      this.id = params['reefid'];
      this.getReefData(this.id);
    });

    console.log(this.id)
    // console.log()

  }
}
