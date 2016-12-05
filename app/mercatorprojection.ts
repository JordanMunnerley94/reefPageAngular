declare let google : any;

export class MercatorProjection {
    MERCATOR_RANGE = 256;
    pixelOrigin_: any;
    pixelsPerLonDegree_: any;
    pixelsPerLonRadian_: any;
    
    constructor() {

        this.pixelOrigin_ = new google.maps.Point(
            this.MERCATOR_RANGE / 2, this.MERCATOR_RANGE / 2);
        this.pixelsPerLonDegree_ = this.MERCATOR_RANGE / 360;
        this.pixelsPerLonRadian_ = this.MERCATOR_RANGE / (2 * Math.PI);
    }

    bound(value: any, opt_min: any, opt_max: any) {
        if (opt_min != null) value = Math.max(value, opt_min);
        if (opt_max != null) value = Math.min(value, opt_max);
        return value;
    }

    degreesToRadians(deg: any) {
        return deg * (Math.PI / 180);
    }

    radiansToDegrees(rad: any) {
        return rad / (Math.PI / 180);
    }

    fromLatLngToPoint = function(latLng: any, opt_point: any) {
        let me = this;

        let point = opt_point || new google.maps.Point(0, 0);

        let origin = me.pixelOrigin_;
        point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;
        // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
        // 89.189.  This is about a third of a tile past the edge of the world tile.
        let siny = this.bound(Math.sin(this.degreesToRadians(latLng.lat())), -0.9999, 0.9999);
        point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
        return point;
    };

    fromDivPixelToLatLng = function(pixel: any, zoom: any) {
        let me = this;

        let origin = me.pixelOrigin_;
        let scale = Math.pow(2, zoom);
        let lng = (pixel.x / scale - origin.x) / me.pixelsPerLonDegree_;
        let latRadians = (pixel.y / scale - origin.y) / -me.pixelsPerLonRadian_;
        let lat = this.radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
        return new google.maps.LatLng(lat, lng);
    };

    fromDivPixelToSphericalMercator = function(pixel: any, zoom: any) {
        let me = this;
        let coord = me.fromDivPixelToLatLng(pixel, zoom);

        let r= 6378137.0;
        let x = r* this.degreesToRadians(coord.lng());
        let latRad = this.degreesToRadians(coord.lat());
        let y = (r/2) * Math.log((1+Math.sin(latRad))/ (1-Math.sin(latRad)));

        return new google.maps.Point(x,y);
    };
}