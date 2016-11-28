import {Component} from "@angular/core";

import {ReefPageService} from "./reef-page.service";
import {TableDecadeData} from "./table-decade-data";
import {TableYearData} from "./table-year-data";

@Component({
    moduleId: module.id,
    selector: "my-reeftable",
    templateUrl: 'reef-table.component.html',
    styleUrls: [
        'reef-table.component.css'
    ],
})

export class ReefTableComponent {

    reefTableData: any[];

    reefFishDataYear: any[];
    reefFishDataDecade: any[];
    reefCoralDataYear: any[];
    reefCoralDataDecade: any[];
    reefMantaDataYear: any[];
    reefMantaDataDecade: any[];

    decadeColumnData: TableDecadeData[] = [];
    yearColumnData:  TableYearData[] = [];

    constructor(private reefPageService: ReefPageService) {}

    getReefData(): void {
        this.reefPageService.getData().then(reefData => {
            this.reefTableData = reefData;

            this.reefMantaDataDecade = reefData.mantaByDecade;
            this.reefCoralDataDecade = reefData.juvenileCoralByDecade;
            this.reefFishDataDecade = reefData.fishByDecade;

            this.reefMantaDataYear = reefData.mantaByYear;
            this.reefCoralDataYear = reefData.juvenileCoralByYear;
            this.reefFishDataYear = reefData.fishByYear;

            console.log("Zone data " + this.reefTableData);
        });
    };

    ngOnInit(): void {
        this.getReefData();
    }

    generateDecadeColumns(): void {
        let decade: string = "";
        if (this.reefMantaDataDecade.length !== 0) {
            let decade = this.reefMantaDataDecade[0].decade;
            let mHcAvg = this.reefMantaDataDecade[0].avgMedianHc;
            let mHcMin = this.reefMantaDataDecade[0].minMedianHcRange;
            let mHcMax = this.reefMantaDataDecade[0].maxMedianHcRange;
            let cotAvg = this.reefMantaDataDecade[0].avgCotsPerTow;
            let cotMin = this.reefMantaDataDecade[0].minCotsPerTow;
            let cotMax = this.reefMantaDataDecade[0].maxCotsPerTow;
        }
        if (this.reefCoralDataDecade.length !== 0) {
            for (let coralEntry of this.reefCoralDataDecade) {
                if (coralEntry.decade === decade) {
                    let coralAbundanceAvg = coralEntry.avgColonies;
                    // let coralAbundanceMin =
                    // let coralAbundanceMax
                }
            }
        }
    }

    generateYearColumns(): void {

    }

}