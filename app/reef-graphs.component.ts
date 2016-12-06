import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'my-reefgraphs',
    templateUrl: 'reef-graphs.component.html',
    styleUrls: [
        'reef-graphs.component.css',
    ],
})

export class ReefGraphsComponent implements OnInit{

    benthicGraphUrl: string;
    fishHerbGraphUrl: string;
    mantaGraphUrl: string;
    fishSizeGraphUrl: string;

    reefData: any;
    reefPhoto: any[];
    id: string;

    benthicExists: boolean;
    mantaExists: boolean;
    reefName: string;

    constructor(
        private route: ActivatedRoute
    ) {};

    ngOnInit(): void {
        this.reefData = this.route.snapshot.data['reefData'];
        this.id = this.route.snapshot.params['reefid'];

        this.reefPhoto = this.reefData.photo;
        this.generateUrls(this.id);
        this.benthicExists = this.checkBenthicDataExists();
        this.mantaExists = this.checkMantaDataExists();
        this.reefName = this.reefData.reef.reefName;
    }

    generateUrls(id: string): void {
        this.benthicGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/benthic/' + id + '.png';
        this.fishHerbGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/fish.herb.harv/' + id + '.png';
        this.mantaGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/manta/' + id + '.png';
        this.fishSizeGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/fish.tot/' + id + '.png';
    }

    checkBenthicDataExists(): boolean {
        return this.reefData.benthicGroupByDecade.length !== 0;
    }

    checkMantaDataExists(): boolean {
        return this.reefData.mantaByDecade.length !== 0;
    }
}