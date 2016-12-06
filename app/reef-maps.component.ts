import {Component, OnInit} from "@angular/core";
import {ReefPageService} from "./reef-page.service";
import {ActivatedRoute} from "@angular/router";
import {MercatorProjection} from "./mercatorprojection"

declare let google : any;

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
    reefBoundsEmpty: any;
    reefName: any;

    tileHeight: number = 256;
    tileWidth: number = 256;

    WMSURL = "http://maps.aims.gov.au/geoserver/aims/wms?";
    opacityLevel : any;
    detailedMapParameters = [
        "FORMAT=image/png",
        "layers=aims:LatestMantaTowPath,aims:LatestMantaTowPath,aims:reefmon_sites,aims_aims:reef_zones_labels,aims_aims:reef_zones",
        "SRS=EPSG:900913",
        "EXCEPTIONS=application%2Fvnd.ogc.se_inimage",
        "STYLES=manta-tow-path-coral-cover,manta-path-cots-star,rmrap-only,,"
    ];
    overviewMapParameters = [
        "FORMAT=image/png",
        "layers=aims:reefmon_reefs",
        "SRS=EPSG:900913",
        "EXCEPTIONS=application%2Fvnd.ogc.se_inimage",
        "STYLES=Generic-map-pin-orange"
    ];
    wmsStandardParams = [
        "request=GetMap",
        "service=WMS",
        "version=1.1.0",
        "transparent=true",
        "width="+ this.tileWidth,
        "height="+ this.tileHeight
    ];

    // pixelOrigin_ : any;
    // pixelsPerLonDegree_ : any;
    // pixelsPerLonRadian_ : any;

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

        let mapCenter = new google.maps.LatLng(data.north, data.east);

        let myOptions = {
            zoom: 6,
            center: mapCenter,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            draggable: false,
            scrollwheel: false,
            panControl: false
        };

        // Creates maps

        let overviewMap = new google.maps.Map(document.getElementById("overview-map"), myOptions);

        let detailedMap = new google.maps.Map(document.getElementById("detailed-map"), myOptions);

        // Sets lat-lng for detailed map
        let detailedBounds = new google.maps.LatLngBounds();
        detailedBounds.extend(new google.maps.LatLng(data.north, data.east));
        detailedBounds.extend(new google.maps.LatLng(data.south, data.west));
        detailedMap.fitBounds(detailedBounds);

        this.overviewMapParameters.push("CQL_FILTER=gbrmpa_reef_id%3D" + data.gbrmpaReefId);
        this.detailedMapParameters.push("CQL_FILTER=reef_id='" + this.id + "';reef_id='" + this.id + "';reef_id='" + this.id + "" +
            "';reef_id='" + this.id + "';reef_id='" + this.id + "'");

        this.loadWMS(overviewMap, this.WMSURL, this.overviewMapParameters);
        this.loadWMS(detailedMap, this.WMSURL, this.detailedMapParameters);
}

    getReefData(id: string): void {
        this.reefPageService.getData(id).then(reefData => {
        console.log("Reefdata in maps", reefData);
            this.reefName = reefData.reef.reefName;
            this.reefMapBounds = reefData.mantaPathBound;
            this.reefBoundsEmpty = this.reefMapBounds === null;
        if (!this.reefBoundsEmpty) {
                this.drawMaps(this.reefMapBounds)
            }
        })
    };

    loadWMS(map: any, baseURL: any, customParams: any) {
        let isPng = true;
        let minZoomLevel = 2;
        let maxZoomLevel = 28;

        //add additional parameters
        let wmsParams = this.wmsStandardParams.concat(customParams);


        let overlayOptions = {
            getTileUrl: function(coord: any, zoom: any) {
                let lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
                let lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);


                let projectionMap = new MercatorProjection();

                let lULg = projectionMap.fromDivPixelToSphericalMercator(lULP, zoom);
                let lLRg  = projectionMap.fromDivPixelToSphericalMercator(lLRP, zoom);

                let lUL_Latitude = lULg.y;
                let lUL_Longitude = lULg.x;
                let lLR_Latitude = lLRg.y;
                let lLR_Longitude = lLRg.x;
                //GJ: there is a bug when crossing the -180 longitude border (tile does not render) - this check seems to fix it
                if (lLR_Longitude < lUL_Longitude) {
                    lLR_Longitude = Math.abs(lLR_Longitude);
                }
                let urlResult = baseURL + wmsParams.join("&") + "&bbox=" + lUL_Longitude + "," + lUL_Latitude + "," + lLR_Longitude + "," + lLR_Latitude;
                return urlResult;
            },

            tileSize: new google.maps.Size(this.tileHeight, this.tileWidth),

            minZoom: minZoomLevel,
            maxZoom: maxZoomLevel,
            opacity: parseFloat(this.opacityLevel),
            isPng: isPng
        };

        let overlayWMS = new google.maps.ImageMapType(overlayOptions);


        // map.overlayMapTypes.push(overlayWMS)
        //map.overlayMapTypes.insertAt(0, overlayWMS);
        map.overlayMapTypes.setAt(0, overlayWMS);
    }
}
