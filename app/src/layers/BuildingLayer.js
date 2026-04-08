import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";
import {Style,Fill,Stroke} from "ol/style.js";
import { bbox } from 'ol/loadingstrategy.js';

import { GEOSERVER_BASE } from '../config.js';
const GEOSERVER_URL = `${GEOSERVER_BASE}/korea_map/ows`;
//const GEOSERVER_URL = '/geoserver/korea_map/ows';

export class BuildingLayer{
    constructor(){
        this.source = new VectorSource({
            format: new GeoJSON(),
            url: (extent) => {
                return(
                     `${GEOSERVER_URL}?service=WFS&version=1.0.0&request=GetFeature` +
                    `&typeName=korea_map:buildings_5186` +
                    `&outputFormat=application/json` +
                    `&srsname=EPSG:3857` +
                    `&bbox=${extent.join(',')},EPSG:3857`
                );
            },
            strategy: bbox,
        });
        
        this.layer = new VectorLayer({
            source: this.source,
            visible:true,
            style: new Style({
                fill: new Fill({ color: 'rgba(173,216,230,0.4)'}),
                stroke: new Stroke({color:'#4a90d9', width: 1}),
            }),
            properties: {name: 'buildings'},
            minZoom:14,
        });
    }

    getLayer(){
        return this.layer;
    }
}