import 'rxjs/add/operator/switchMap';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReefPageService} from "./reef-page.service";

@Component({
  moduleId: module.id,
  selector: 'my-reef-page',
  templateUrl: 'reef-page.component.html',
  styleUrls: [
      'reef-page.component.css'
  ],
})
export class ReefPageComponent implements OnInit {

  public testString: string = "test"

  public reefData: any;

  private id: string;

  public title: String = 'Reef Page Test';

  constructor(
    private reefPageService: ReefPageService,
    private route: ActivatedRoute,
  ) {}

  getReefData(id: string): void {
    this.reefPageService.getData(id).then(reefData => {
      this.reefData = reefData;
      this.title = reefData.reef.reefName + " PAGE.";
    });
  };

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['reefid'];
      this.getReefData(this.id);
    });
  }
}
