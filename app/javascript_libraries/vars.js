/* 
    Document   	: vars.js

	Created on : 18 Nov 2012
	Authored by	: "Sean Maday <seanmaday@gmail.com>"

*/

//Be sure to end the WMS URL with a question mark!!!

WMSURL = "http://maps.aims.gov.au/geoserver/aims/wms?"

var opacityLevel;

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


tileHeight = 256;
tileWidth = 256;

wmsStandardParams = [
	"request=GetMap",
	"service=WMS",
	"version=1.1.0",
	"transparent=true",
	"width="+ tileWidth,
	"height="+ tileHeight
];


