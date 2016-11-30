import { Component, OnInit } from '@angular/core';

import { IndexEntry } from './index-entry';
import { ReefPageService } from './reef-page.service';
import {Router} from "@angular/router";


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

    constructor(
        private router: Router,
        private reefCommentService: ReefPageService
    ) { }

    getReefComments(): void {
        this.reefCommentService.getIndexEntries()
            .then(reefComments => {
                this.reefNameData = reefComments;
                this.generateReefNames(this.reefNameData);
            })
    };

    generateReefNames(data: any[]):void {
        for (let item of data) {
            let rawLink: string = item._links.self.href;
            let split = rawLink.split("/");
            // console.log(split);
            this.reefNames.push( new IndexEntry(item.reefName, split[split.length - 1]));
        }
    }

    // onSelect(reefComment: IndexEntry): void {
    //     if(this.selectedReefComment) {
    //         this.selectedReefComment = reefComment;
    //         this.goToDetail()
    //     }
        // if (this.selectedReefComment) {
        // }
    // }

    ngOnInit(): void {
        this.getReefComments();
    }

    goToDetail(indexEntry: IndexEntry): void {
        console.log(indexEntry)
        this.router.navigate(['/reefpage', indexEntry.id])
    }

}

