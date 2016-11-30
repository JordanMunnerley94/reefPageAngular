import {Component, OnInit} from '@angular/core';
import {ReefPageService} from "./reef-page.service";

@Component({
    moduleId: module.id,
    selector: 'my-reefcomments',
    templateUrl: 'reef-comment.component.html',
    styleUrls: [ 'reef-comment.component.css' ],
})
export class ReefPageComponent implements OnInit {

    reefData: any;
    reefComments: any;

    constructor(private reefPageService: ReefPageService) {}

    getReefData(): void {
        this.reefPageService.getData().then(reefData => {
            this.reefData = reefData;
            this.reefComments = this.reefData.reefComment.comments;

            // Removing out of place <P> tags from the received comment.
            this.reefComments = this.reefComments.replace('<P>', '');
            this.reefComments = this.reefComments.replace('</P>', '');
        })
    };

    ngOnInit(): void {
        this.getReefData();
    }
}