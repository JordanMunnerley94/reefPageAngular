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

    reefBenthicDataYear: any[];
    reefBenthicDataDecade: any[];

    decadeColumnHeaders: string[] = [];
    yearColumnHeaders:  string[] = [];

    decadeColumnData: TableDecadeData[] = [];
    yearColumnData:  TableYearData[] = [];

    constructor(private reefPageService: ReefPageService) {}

    getReefData(): void {
        this.reefPageService.getData().then(reefData => {
            this.reefTableData = reefData;

            this.reefMantaDataDecade = reefData.mantaByDecade;
            this.reefCoralDataDecade = reefData.juvenileCoralByDecade;
            this.reefFishDataDecade = reefData.fishByDecade;
            // this.reefBenthicDataDecade = reefData.benthicGroupByDecade;

            this.reefMantaDataYear = reefData.mantaByYear;
            this.reefCoralDataYear = reefData.juvenileCoralByYear;
            this.reefFishDataYear = reefData.fishByYear;
            // this.reefBenthicDataYear = reefData.benthicGroupByYear;

            this.getColumnHeadersDecades();
            this.getColumnDataDecades();
            this.getColumnHeadersYears();
            this.getColumnDataYears();
        });
    };

    ngOnInit(): void {
        this.getReefData();
    }

    getColumnHeadersDecades(): void {
        if (this.reefMantaDataDecade.length !== 0) {
            for (let current of this.reefMantaDataDecade) {
                this.decadeColumnHeaders.push(current.decade)
            }
        }
        // TODO: To be activated once benthic data is available
        // if (this.reefBenthicDataDecade.length !== 0) {
        //     for (let current of this.reefBenthicDataDecade) {
        //         if (this.decadeColumnHeaders.indexOf(current.decade) < 0) {
        //             this.decadeColumnHeaders.push(current.decade)
        //         }
        //     }
        // }

        if (this.reefFishDataDecade.length !== 0) {
            for (let current of this.reefFishDataDecade) {
                if (this.decadeColumnHeaders.indexOf(current.decade) < 0) {
                    this.decadeColumnHeaders.push(current.decade)
                }
            }
        }

        this.decadeColumnHeaders.sort();
    }


    getColumnHeadersYears(): void {
        if (this.reefMantaDataYear.length !== 0) {
            for (let current of this.reefMantaDataYear) {
                this.yearColumnHeaders.push(current.reportYear)
            }
        }
        // TODO: To be activated once benthic data is available
        // if (this.reefBenthicDataYear.length !== 0) {
        //     for (let current of this.reefBenthicDataYear) {
        //         if (this.yearColumnHeaders.indexOf(current.reportYear) < 0) {
        //             this.yearColumnHeaders.push(current.reportYear)
        //         }
        //     }
        // }

        if (this.reefFishDataYear.length !== 0) {
            for (let current of this.reefFishDataYear) {
                if (this.yearColumnHeaders.indexOf(current.reportYear) < 0) {
                    this.yearColumnHeaders.push(current.reportYear)
                }
            }
        }

        this.yearColumnHeaders.sort();
    }

    getColumnDataDecades(): void {
        for (let currentDecade of this.decadeColumnHeaders) {
            let currentDecadeData: TableDecadeData = new TableDecadeData;
            currentDecadeData.decade = currentDecade;
            for (let mantaData of this.reefMantaDataDecade) {
                if (mantaData.decade === currentDecade) {
                    currentDecadeData.mHcAvg = mantaData.avgMedianHc;
                    currentDecadeData.mHcMin = mantaData.minMedianHcRange;
                    currentDecadeData.mHcMax = mantaData.maxMedianHcRange;
                    currentDecadeData.cotAvg = mantaData.avgCotsPerTow;
                    currentDecadeData.cotMin = mantaData.minCotsPerTow;
                    currentDecadeData.cotMax = mantaData.maxCotsPerTow;
                    break;
                }
            }
            // TODO: To be activated once benthic data is available
            // for (let benthicData of this.reefBenthicDataDecade) {
            //     if (benthicData.decade === currentDecade) {
            //         currentDecadeData.bHcAvg = benthicData.avgCover;
            //         currentDecadeData.bHcMin = benthicData.minCover;
            //         currentDecadeData.bHcMax = benthicData.maxCover;
            //         break;
            //     }
            // }
            for (let coralData of this.reefCoralDataDecade) {
                if (coralData.decade === currentDecade) {
                    currentDecadeData.coralAbundanceAvg = coralData.avgColonies;
                    currentDecadeData.coralAbundanceMin = coralData.minColonies;
                    currentDecadeData.coralAbundanceMax = coralData.maxColonies;
                    break;
                }
            }
            for (let fishData of this.reefFishDataDecade) {
                if (fishData.decade === currentDecade) {
                    currentDecadeData.avgSpecies = fishData.avgSpecies;
                    currentDecadeData.minSpecies = fishData.minSpecies;
                    currentDecadeData.maxSpecies = fishData.maxSpecies;
                    break;
                }
            }
            this.decadeColumnData.push(currentDecadeData);
        }
    }

    getColumnDataYears(): void {
        for (let currentYear of this.yearColumnHeaders) {
            let currentYearData: TableYearData = new TableYearData;
            currentYearData.year = currentYear;
            for (let mantaData of this.reefMantaDataYear) {
                if (mantaData.reportYear === currentYear) {
                    currentYearData.mHcMedian = mantaData.medianHcRange;
                    currentYearData.cotAvg = mantaData.meanCots;
                    currentYearData.outbreakStatus = mantaData.status;
                    break;
                }
            }
            // TODO: To be activated once benthic data is available
            // for (let benthicData of this.reefBenthicDataYear) {
            //     if (benthicData.reportYear === currentYear) {
            //         currentYearData.bHcMedian = benthicData.cover;
            //         break;
            //     }
            // }
            for (let coralData of this.reefCoralDataYear) {
                if (coralData.reportYear === currentYear) {
                    currentYearData.coralAbundanceAvg = Math.floor(coralData.colonies / coralData.transects);
                    break;
                }
            }
            for (let fishData of this.reefFishDataYear) {
                if (fishData.reportYear === currentYear) {
                    currentYearData.species = fishData.species;
                    break;
                }
            }
            this.yearColumnData.push(currentYearData);
        }
    }

    checkLow(input: string): boolean {
        let splitInput = input.split('-');
        return parseInt(splitInput[splitInput.length - 1]) <= 10;
    }

    checkModerate(input: string): boolean {
        let splitInput = input.split('-');
        if (parseInt(splitInput[splitInput.length - 1]) > 10 && parseInt(splitInput[splitInput.length - 1]) <= 30) {
            return true;
        }
        return false
    }

    checkHigh(input: string): boolean {
        let splitInput = input.split('-');
        if (parseInt(splitInput[splitInput.length - 1]) > 30 && parseInt(splitInput[splitInput.length - 1]) <= 50) {
            return true;
        }
        return false
    }

    checkVeryHigh(input: string): boolean {
        let splitInput = input.split('-');
        if (parseInt(splitInput[splitInput.length - 1]) > 50 && parseInt(splitInput[splitInput.length - 1]) <= 75) {
            return true;
        }
        return false
    }

    checkExtremeHigh(input: string): boolean {
        let splitInput = input.split('-');
        return parseInt(splitInput[splitInput.length - 1]) > 75;
    }
}