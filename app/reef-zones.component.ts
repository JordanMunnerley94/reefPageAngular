import {Component, OnInit} from '@angular/core';
import {ReefPageService} from "./reef-page.service";

@Component({
    moduleId: module.id,
    selector: 'my-reefzone',
    templateUrl: 'reef-zones.component.html',
    styleUrls: [
        'reef-zones.component.css',
    ]
})

export class ReefZoneComponent implements OnInit {

    reefZones: any[];
    usableReefZones: any[] = [];

    constructor(private reefPageService: ReefPageService) {}

    getReefData(): void {
        this.reefPageService.getData().then(reefData => {
            this.reefZones = reefData.photo;
            this.getUsableZones();
            console.log("Zone data " + this.reefZones);
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
        return
    }
}