import {Component, OnInit} from '@angular/core';
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
    reefCommentEmpty: any;
    id: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.reefData = this.route.snapshot.data['reefData'];
        this.reefCommentEmpty = (this.reefData.reefComment === undefined || this.reefData.reefComment.comments === null);
        console.log(this.reefCommentEmpty, this.reefData);
        if (!this.reefCommentEmpty) {
            this.reefComments = this.reefData.reefComment.comments;
            this.reefComments = this.reefComments.replace('<P>', '');
            this.reefComments = this.reefComments.replace('</P>', '');
        }
    }
}