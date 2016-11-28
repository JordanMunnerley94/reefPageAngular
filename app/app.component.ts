import {Component, OnInit} from '@angular/core';
import {ReefPageService} from "./reef-page.service";

@Component({
  selector: 'my-app',
  template: `
<h1>{{title}}</h1>
<my-reefzone></my-reefzone>
<my-reefpage></my-reefpage>

`,
})
export class AppComponent implements OnInit {

  public reefData: any;

  public title: String = 'Reef Page Test';

  constructor(private reefPageService: ReefPageService) {}

  getReefData(): void {
    this.reefPageService.getData().then(reefData => {
      this.reefData = reefData;
      // console.log("Zone data " + this.reefData);
    });
  };

  ngOnInit(): void {
    this.getReefData();
  }
}
