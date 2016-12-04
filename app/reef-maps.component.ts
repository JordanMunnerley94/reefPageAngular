import {Component, OnInit} from "@angular/core";
import {ReefPageService} from "./reef-page.service";
import {ActivatedRoute} from "@angular/router";

declare var google : any;

@Component({
    moduleId: module.id,
    selector: 'my-reefmaps',
    templateUrl: 'reef-maps.component.html',
    styleUrls: [
        'reef-maps.component.css',
    ],
})

export class ReefMapsComponent implements OnInit {

    id: string;
    reefMapBounds: any;

    constructor(
        private reefPageService : ReefPageService,
        private route : ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['reefid'];
            this.getReefData(this.id);
            // this.drawMaps(this.reefMapBounds)
        });

    }

    drawMaps(data: any) {
        console.log("In draw maps", data);

        let mapCenter = new google.maps.LatLng(-14.64452, 145.45511);

        let myOptions = {
            zoom: 6,
            center: mapCenter,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            draggable: false,
            scrollwheel: false,
            panControl: false
        }

        // Creates maps
        let overviewMap = new google.maps.Map(document.getElementById('overview-map'), myOptions);
        let detailedMap = new google.maps.Map(document.getElementById('detailed-map'), myOptions);

        // Sets lat-lng for detailed map
        let detailedBounds = new google.maps.LatLngBounds();
        detailedBounds.extend(new google.maps.LatLng(data.north, data.east));
        detailedBounds.extend(new google.maps.LatLng(data.south, data.west));
        detailedMap.fitBounds(detailedBounds);




    }

    getReefData(id: string): void {
        this.reefPageService.getData(id).then(reefData => {
            this.reefMapBounds = reefData.mantaPathBound;
            this.drawMaps(this.reefMapBounds)
        })
    };


}
