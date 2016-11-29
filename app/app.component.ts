import {Component, OnInit} from '@angular/core';
import {ReefPageService} from "./reef-page.service";

@Component({
  selector: 'my-app',
  template: `
<h1>{{title}}</h1>
<my-reefzone></my-reefzone>
<my-reeftable></my-reeftable>
<my-reefcomments></my-reefcomments>

`,
})
export class AppComponent implements OnInit {

  public reefData: any;

  public title: String = 'Reef Page Test';

  constructor(private reefPageService: ReefPageService) {}

  getReefData(): void {
    this.reefPageService.getData().then(reefData => {
      this.reefData = reefData;
    });
  };

  ngOnInit(): void {
    this.getReefData();
  }
}
