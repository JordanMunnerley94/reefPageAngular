import { Component, OnInit } from '@angular/core';

import { IndexEntry } from './index-entry';
import { ReefPageService } from './reef-page.service';


@Component({
    moduleId: module.id,
    selector: 'my-index-page',
    templateUrl: 'index-page.component.html',
    styleUrls: [ 'index-page.component.css' ],
})
export class IndexPageComponent implements OnInit {

    reefNameData: any[];
    reefNames: any[] = [];
    selectedReefComment: IndexEntry;

    constructor( private reefCommentService: ReefPageService ) { }

    getReefComments(): void {
        this.reefCommentService.getIndexEntries()
            .then(reefComments => {
                this.reefNameData = reefComments;
                this.generateReefNames(this.reefNameData);
            })
    };

    generateReefNames(data: any[]):void {
        console.log(this.reefNameData);
        for (let item of data) {
            let rawLink: string = item._links.self.href;
            let split = rawLink.split("/");
            // console.log(split);
            this.reefNames.push( new IndexEntry(item.reefName, split[split.length - 1]));
        }
        console.log(this.reefNames)
    }

    onSelect(reefComment: IndexEntry): void {
        this.selectedReefComment = reefComment;
        if (this.selectedReefComment) {
            // let array_test: string[] = this.selectedReefComment._links.self.href.toString().split('/');
            // // console.log("id = " + array_test[array_test.length - 1])
            console.log(this.selectedReefComment.id)
        }
    }

    ngOnInit(): void {
        this.getReefComments();
        console.log(this.reefNameData)
    }

}

