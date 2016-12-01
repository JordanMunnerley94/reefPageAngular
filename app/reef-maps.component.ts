import {Component, OnInit} from "@angular/core";
import {ReefPageService} from "./reef-page.service";
import {ActivatedRoute} from "@angular/router";

declare var googleApi : any;

@Component({
    moduleId: module.id,
    selector: 'my-reefmaps',
    templateUrl: 'reef-maps.component.html',
    styleUrls: [
        'reef-maps.component.css',
    ],
})

export class ReefMapsComponent implements OnInit {

    id: string;
    reefMapBounds: any[];

    constructor(
        private reefPageService : ReefPageService,
        private route : ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['reefid'];
            this.getReefData(this.id);
        });
    }

    getReefData(id: string): void {
        this.reefPageService.getData(id).then(reefData => {
            console.log(reefData)
            this.reefMapBounds = reefData.mantaPathBound;
            console.log(this.reefMapBounds)
        })
    };


}
