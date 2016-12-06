import {Component, OnInit} from "@angular/core";

import {ReefPageService} from "./reef-page.service";
import {TableDecadeData} from "./table-decade-data";
import {TableYearData} from "./table-year-data";
import {ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "my-reeftable",
    templateUrl: 'reef-table.component.html',
    styleUrls: [
        'reef-table.component.css'
    ],
})

export class ReefTableComponent implements OnInit{

    id: string;

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

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        let reefData = this.route.snapshot.data['reefData'];

        this.reefMantaDataDecade = reefData.mantaByDecade;
        this.reefCoralDataDecade = reefData.juvenileCoralByDecade;
        this.reefFishDataDecade = reefData.fishByDecade;
        this.reefBenthicDataDecade = reefData.benthicGroupByDecade;

        this.reefMantaDataYear = reefData.mantaByYear;
        this.reefCoralDataYear = reefData.juvenileCoralByYear;
        this.reefFishDataYear = reefData.fishByYear;
        this.reefBenthicDataYear = reefData.benthicGroupByYear;

        this.getColumnHeadersDecades();
        this.getColumnDataDecades();
        this.getColumnHeadersYears();
        this.getColumnDataYears();
    }

    getColumnHeadersDecades(): void {
        if (this.reefMantaDataDecade.length !== 0) {
            for (let current of this.reefMantaDataDecade) {
                this.decadeColumnHeaders.push(current.decade)
            }
        }

        if (this.reefBenthicDataDecade.length !== 0) {
            for (let current of this.reefBenthicDataDecade) {
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
        if (this.reefBenthicDataYear.length !== 0) {
            for (let current of this.reefBenthicDataYear) {
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
            for (let benthicData of this.reefBenthicDataDecade) {
                if (benthicData.decade === currentDecade) {
                    currentDecadeData.bHcAvg = benthicData.avgCover;
                    currentDecadeData.bHcMin = benthicData.minCover;
                    currentDecadeData.bHcMax = benthicData.maxCover;
                    break;
                }
            }
            for (let coralData of this.reefCoralDataDecade) {
                // TODO Get proper field/column for decade coral data, currently we don't know the amount of transects
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
            for (let benthicData of this.reefBenthicDataYear) {
                if (benthicData.reportYear === currentYear) {
                    currentYearData.bHcMedian = benthicData.cover.toString();
                    break;
                }
            }
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
        if (!input) {
            return false;
        }
        if (input.includes('-')) {
            let splitInput = input.split('-');
            return parseInt(splitInput[splitInput.length - 1]) <= 10;
        } else {
            return parseInt(input) <= 10;
        }
    }

    checkModerate(input: string): boolean {
        if (!input) {
            return false;
        }
        if (input.includes('-')) {
            let splitInput = input.split('-');
            if (parseInt(splitInput[splitInput.length - 1]) > 10 && parseInt(splitInput[splitInput.length - 1]) <= 30) {
                return true;
            }
        } else {
            if (parseInt(input) > 10 && parseInt(input) <= 30) {
                return true;
            }
        }
        return false;
    }

    checkHigh(input: string): boolean {
        if (!input) {
            return false;
        }
        if (input.includes('-')) {
            let splitInput = input.split('-');
            if (parseInt(splitInput[splitInput.length - 1]) > 30 && parseInt(splitInput[splitInput.length - 1]) <= 50) {
                return true;
            }
        } else {
            if (parseInt(input) > 30 && parseInt(input) <= 50) {
                return true;
            }
        }
        return false;
    }

    checkVeryHigh(input: string): boolean {
        if (!input) {
            return false;
        }
        if (input.includes('-')) {
            let splitInput = input.split('-');
            if (parseInt(splitInput[splitInput.length - 1]) > 50 && parseInt(splitInput[splitInput.length - 1]) <= 75) {
                return true;
            }
        } else {
            if (parseInt(input) > 50 && parseInt(input) <= 75) {
                return true;
            }
        }
        return false;
    }

    checkExtremeHigh(input: string): boolean {
        if (!input) {
            return false;
        }
        if (input.includes('-')) {
            let splitInput = input.split('-');
            return parseInt(splitInput[splitInput.length - 1]) > 75;
        } else {
            return parseInt(input) > 75;
        }
    }

    checkEmptyData(input: any): boolean {
        // if (!input && input !== "0") {
        if (input === undefined) {
            return true;
        }
        return false;
    }
}