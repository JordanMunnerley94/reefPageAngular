import {Component, OnInit, Input} from '@angular/core';
import {ReefPageService} from "./reef-page.service";
import {ActivatedRoute} from "@angular/router";

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
    id: string;

    constructor(
        private reefPageService: ReefPageService,
        private route: ActivatedRoute
) {}

    getReefData(id: string): void {
        this.reefPageService.getData(id).then(reefData => {
            this.reefData = reefData;
            this.reefZones = reefData.photo;
            this.getUsableZones();
        });
    };

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['reefid'];
            this.getReefData(this.id);
        });
    }

    getUsableZones(): void {

        for(let zone of this.reefZones) {
            let i = parseInt(zone.reefZoneCode) - 1;
            if (i < 4) {
                this.usableReefZones[i] = zone;
            }
        }

        for (let zone of this.usableReefZones) {
            if (zone !== undefined) {
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
}