import {Component, OnInit, Input} from '@angular/core';
import {ReefPageService} from "./reef-page.service";

@Component({
    moduleId: module.id,
    selector: 'my-reefzone',
    templateUrl: 'reef-zones.component.html',
    styleUrls: [
        'reef-zones.component.css',
    ]
})

export class ReefZoneComponent implements OnInit{

    reefData: any;
    reefZones: any[];
    usableReefZones: any[] = [];

    constructor(private reefPageService: ReefPageService) {}

    getReefData(): void {
        this.reefPageService.getData().then(reefData => {
            this.reefData = reefData;
            this.reefZones = reefData.photo;
            this.getUsableZones();
            // console.log(this.reefZones.sort(function(a.reef, b) {return a - b}));
        });
    };

    ngOnInit(): void {
        this.getReefData();
    }

    getUsableZones(): void {

        for(let zone of this.reefZones) {
            let i = parseInt(zone.reefZoneCode) - 1;
            this.usableReefZones[i] = zone;
        }

        for (let zone of this.usableReefZones) {
            switch (zone.reefZoneCode) {
                case ("1"):
                    zone.reefZoneName = "Back";
                    break;
                case ("2"):
                    zone.reefZoneName = "Flank 1";
                    break;
                case ("3"):
                    zone.reefZoneName = "Front";
                    break;
                case ("4"):
                    zone.reefZoneName = "Flank 2";
                    break;
            }
        }
    }
}