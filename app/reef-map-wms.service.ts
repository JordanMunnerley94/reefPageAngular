// import { Injectable } from "@angular/core";
//
// declare var google : any;
//
// @Injectable()
// export class ReefMapWMService {
//     private WMSURL = "http://maps.aims.gov.au/geoserver/aims/wms?"
//
//     public opacityLevel : any;
//
//     public detailedMapParameters : any[] = [
//         "FORMAT=image/png",
//         "layers=aims:LatestMantaTowPath,aims:LatestMantaTowPath,aims:reefmon_sites,aims_aims:reef_zones_labels,aims_aims:reef_zones",
//         "SRS=EPSG:900913",
//         "EXCEPTIONS=application%2Fvnd.ogc.se_inimage",
//         "STYLES=manta-tow-path-coral-cover,manta-path-cots-star,rmrap-only,,"
//     ];
//
//     public overviewMapParameters: any[] = [
//         "FORMAT=image/png",
//         "layers=aims:reefmon_reefs",
//         "SRS=EPSG:900913",
//         "EXCEPTIONS=application%2Fvnd.ogc.se_inimage",
//         "STYLES=Generic-map-pin-orange"
//     ];
//
//
//     public tileHeight : number = 256;
//     public tileWidth : number = 256;
//
//     public wmsStandardParams : any[] = [
//         "request=GetMap",
//         "service=WMS",
//         "version=1.1.0",
//         "transparent=true",
//         "width="+ this.tileWidth,
//         "height="+ this.tileHeight
//     ];
//
//     private pixelOrigin_ : any;
//     private pixelsPerLonDegree_ : any;
//     private pixelsPerLonRadian_ : any;
//
//     /*
//      Document   	: wms.js
//
//      Modified on : 18 Nov 2012
//      By			: "Sean Maday <seanmaday@gmail.com>"
//
//      Created on 	: Feb 16, 2011
//      Author     	: "Gavin Jackson <Gavin.Jackson@csiro.au>"
//      URL			: http://www.jacksondogphotography.com/googlewms/
//
//      Refactored code from http://lyceum.massgis.state.ma.us/wiki/doku.php?id=googlemapsv3:home
//      */
//
//     bound(value : any, opt_min : any, opt_max : any) {
//     if (opt_min != null) value = Math.max(value, opt_min);
//     if (opt_max != null) value = Math.min(value, opt_max);
//     return value;
// }
//
//     degreesToRadians(deg : any) {
//     return deg * (Math.PI / 180);
// }
//
//     radiansToDegrees(rad : any) {
//     return rad / (Math.PI / 180);
// }
//
//     MercatorProjection() : any {
//     let MERCATOR_RANGE = 256;
//     this.pixelOrigin_ = new google.maps.Point(
//         MERCATOR_RANGE / 2, MERCATOR_RANGE / 2);
//     this.pixelsPerLonDegree_ = MERCATOR_RANGE / 360;
//     this.pixelsPerLonRadian_ = MERCATOR_RANGE / (2 * Math.PI);
// };
//
//     MercatorProjection.prototype.fromLatLngToPoint = function(latLng : any, opt_point : any) {
//     let me = this;
//
//     let point = opt_point || new google.maps.Point(0, 0);
//
//     let origin = me.pixelOrigin_;
//     point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;
//     // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
//     // 89.189.  This is about a third of a tile past the edge of the world tile.
//     let siny = this.bound(Math.sin(this.degreesToRadians(latLng.lat())), -0.9999, 0.9999);
//     point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
//     return point;
// };
//
//     MercatorProjection.prototype.fromDivPixelToLatLng = function(pixel, zoom) {
//     var me = this;
//
//     var origin = me.pixelOrigin_;
//     var scale = Math.pow(2, zoom);
//     var lng = (pixel.x / scale - origin.x) / me.pixelsPerLonDegree_;
//     var latRadians = (pixel.y / scale - origin.y) / -me.pixelsPerLonRadian_;
//     var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
//     return new google.maps.LatLng(lat, lng);
// };
//
//     MercatorProjection.prototype.fromDivPixelToSphericalMercator = function(pixel, zoom) {
//     var me = this;
//     var coord = me.fromDivPixelToLatLng(pixel, zoom);
//
//     var r= 6378137.0;
//     var x = r* degreesToRadians(coord.lng());
//     var latRad = degreesToRadians(coord.lat());
//     var y = (r/2) * Math.log((1+Math.sin(latRad))/ (1-Math.sin(latRad)));
//
//     return new google.maps.Point(x,y);
// };
//
//     function loadWMS(map, baseURL, customParams) {
//     var isPng = true;
//     var minZoomLevel = 2;
//     var maxZoomLevel = 28;
//
//     //add additional parameters
//     var wmsParams = wmsStandardParams.concat(customParams);
//
//     var overlayOptions = {
//         getTileUrl: function(coord, zoom) {
//             var lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
//             var lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);
//
//             var projectionMap = new MercatorProjection();
//
//             var lULg = projectionMap.fromDivPixelToSphericalMercator(lULP, zoom);
//             var lLRg  = projectionMap.fromDivPixelToSphericalMercator(lLRP, zoom);
//
//             var lUL_Latitude = lULg.y;
//             var lUL_Longitude = lULg.x;
//             var lLR_Latitude = lLRg.y;
//             var lLR_Longitude = lLRg.x;
//             //GJ: there is a bug when crossing the -180 longitude border (tile does not render) - this check seems to fix it
//             if (lLR_Longitude < lUL_Longitude) {
//                 lLR_Longitude = Math.abs(lLR_Longitude);
//             }
//             var urlResult = baseURL + wmsParams.join("&") + "&bbox=" + lUL_Longitude + "," + lUL_Latitude + "," + lLR_Longitude + "," + lLR_Latitude;
//             return urlResult;
//         },
//
//         tileSize: new google.maps.Size(tileHeight, tileWidth),
//
//         minZoom: minZoomLevel,
//         maxZoom: maxZoomLevel,
//         opacity: parseFloat(opacityLevel),
//         isPng: isPng
//     };
//
//     overlayWMS = new google.maps.ImageMapType(overlayOptions);
//
//     //map.overlayMapTypes.insertAt(0, overlayWMS);
//     map.overlayMapTypes.setAt(0, overlayWMS);
// }
// }