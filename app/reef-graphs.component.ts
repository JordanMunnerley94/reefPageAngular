import {Component, OnInit} from "@angular/core";
import {ReefPageService} from "./reef-page.service";
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
    reefName: string;

    constructor(
        private reefPageService: ReefPageService,
        private route: ActivatedRoute
    ) {};

    getReefData(id: string): void {
        // this.reefPageService.getData(id).then(reefData => {
        //     this.reefData = reefData;
        this.reefData = this.route.snapshot.data['reefData'];
            this.reefPhoto = this.reefData.photo;
            // this.reefId = this.reefPhoto[0].fullreefId;
            this.generateUrls(this.id);
            this.benthicExists = this.checkBenthicDataExists();
            this.mantaExists = this.checkMantaDataExists();
            this.reefName = this.reefData.reef.reefName;
        // });
    };

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['reefid'];
            this.getReefData(this.id);
        });
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