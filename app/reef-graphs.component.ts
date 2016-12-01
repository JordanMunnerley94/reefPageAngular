import {Component, OnInit} from "@angular/core";
import {ReefPageService} from "./reef-page.service";
import {ActivatedRoute} from "@angular/router";


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
    id: string;

    benthicExists: boolean;
    mantaExists: boolean;

    constructor(
        private reefPageService: ReefPageService,
        private route: ActivatedRoute
    ) {};

    getReefData(id: string): void {
        this.reefPageService.getData(id).then(reefData => {
            this.reefData = reefData;
            this.reefPhoto = reefData.photo;
            // this.reefId = this.reefPhoto[0].fullreefId;
            this.generateUrls(this.id);
            this.benthicExists = this.checkBenthicDataExists();
            this.mantaExists = this.checkMantaDataExists();
            console.log(this.benthicExists);
            console.log(this.mantaExists);
        });
    };

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['reefid'];
            this.getReefData(this.id);
            console.log("Data Loaded")
        });
    }

    generateUrls(id: string): void {
        this.benthicGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/benthic/' + id + '.png';
        this.fishHerbGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/fish.herb.harv/' + id + '.png';
        this.mantaGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/manta/' + id + '.png';
        this.fishSizeGraphUrl = 'http://data.aims.gov.au/reef-page-plots/reefpage3/fish.tot/' + id + '.png';
    }

    checkBenthicDataExists(): boolean {
        console.log("Benthic Data:", this.reefData, this.reefData.benthicGroupByDecade.length);
        return this.reefData.benthicGroupByDecade.length !== 0;
    }

    checkMantaDataExists(): boolean {
        console.log("Manta Data:", this.reefData, this.reefData.mantaByDecade.length);
        return this.reefData.mantaByDecade.length !== 0;
    }
}