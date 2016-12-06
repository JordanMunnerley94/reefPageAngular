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

    reefNameData: any[] = [];
    reefNames: any[] = [];

    constructor(
        private router: Router,
        private reefPageService: ReefPageService
    ) { }

    getReefComments(): void {
        this.reefPageService.getIndexEntries()
            .then(reefDetails => {
                this.reefNameData = reefDetails;
                this.generateReefNames(this.reefNameData);
            })
    };

    generateReefNames(data: any[]):void {
        for (let item of data) {
            let rawLink: string = item._links.self.href;
            let split = rawLink.split("/");
            this.reefNames.push( new IndexEntry(item.reefName, split[split.length - 1]));
        }
    }

    ngOnInit(): void {
        this.getReefComments();
    }

    goToDetail(indexEntry: IndexEntry): void {
        this.router.navigate(['/reefpage', indexEntry.fullreefId])
    }

}

