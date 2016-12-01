import {Component, OnInit} from '@angular/core';
import {ReefPageService} from "./reef-page.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'my-reefcomments',
    templateUrl: 'reef-comment.component.html',
    styleUrls: [ 'reef-comment.component.css' ],
})
export class ReefCommentComponent implements OnInit {

    reefData: any;
    reefComments: any;
    id: string;

    constructor(
        private reefPageService: ReefPageService,
        private route: ActivatedRoute) {}

    getReefData(id: string): void {
        this.reefPageService.getData("18032S").then(reefData => {
            this.reefData = reefData;
            this.reefComments = this.reefData.reefComment.comments;

            // Removing out of place <P> tags from the received comment.
            this.reefComments = this.reefComments.replace('<P>', '');
            this.reefComments = this.reefComments.replace('</P>', '');
        })
    };

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['reefid'];
            this.getReefData(this.id);
        });
    }
}