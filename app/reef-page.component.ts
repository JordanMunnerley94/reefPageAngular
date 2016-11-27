import {Component, OnInit} from '@angular/core';
import {ReefPageService} from "./reef-page.service";

@Component({
    moduleId: module.id,
    selector: 'my-reefpage',
    templateUrl: 'reef-page.component.html',
    styleUrls: [ 'reef-page.component.css' ],
})
export class ReefPageComponent implements OnInit {

    reefData: any;

    constructor(private reefPageService: ReefPageService) {}

    getReefData(): void {
        this.reefPageService.getData().then(reefData => {
            this.reefData = reefData.reefComment.comments;
            console.log(this.reefData);
        })
    };

    ngOnInit(): void {
        this.getReefData();
    }
}