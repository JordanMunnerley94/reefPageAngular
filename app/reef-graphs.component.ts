import {Component, OnInit} from "@angular/core";
import {ReefPageService} from "./reef-page.service";


@Component({
    moduleId: module.id,
    selector: 'my-graphs',
    templateUrl: 'reef-graphs.component.html',
    styleUrls: [
        'reef-graphs.component.css',
    ],
})

export class ReefGraphsComponent implements OnInit{

    // URLs without id + .png on end
    benthicGraphUrl: string;
    fishHerbGraphUrl: string;
    mantaGraphUrl: string;
    fishSizeGraphUrl: string;

    reefData: any;
    reefPhoto: any[];
    reefId: any;

    constructor(private reefPageService: ReefPageService) {};

    getReefData(): void {
        this.reefPageService.getData().then(reefData => {
            this.reefData = reefData;
            this.reefPhoto = reefData.photo;
            this.reefId = this.reefPhoto[0].fullreefId;
            this.generateUrls(this.reefId);
        });
    };

    ngOnInit(): void {
        this.getReefData()
    }

    generateUrls(id: string): void {
        this.benthicGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/benthic/' + id + '.png';
        this.fishHerbGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/fish.herb.harv/' + id + '.png';
        this.mantaGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/manta/' + id + '.png';
        this.fishSizeGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/fish.tot/' + id + '.png';
    }
}