import TileLayer from "ol/layer/Tile.js";
import { TileWMS } from "ol/source.js";

import { GEOSERVER_BASE } from '../config.js';
const GEOSERVER_URL = `${GEOSERVER_BASE}/korea_map/wms`;
//const GEOSERVER_URL = 'geoserver/korea_map/wms';

export class RasterLayers {
    constructor(){
        this.dem = new TileLayer({
            source: new TileWMS({
                url: GEOSERVER_URL,
                params:{
                    LAYERS:'korea_map:dem_5186_opt',
                    STYLES: 'dem_style',
                    TILED:true,
                },
                servertype:'geoserver',
            }),
            visible: false,
            opacity: 0.8,
            properties:{name:'dem'}
        })

        this.hillshade = new TileLayer({
            source: new TileWMS({
                url: GEOSERVER_URL,
                params:{
                    LAYERS:'korea_map:hillshade_5186_opt',
                    TILED:true,
                },
                servertype:'geoserver',
            }),
            visible: false,
            opacity: 0.7,
            properties:{name:'hillshade'}
        })

        this.colorRelief = new TileLayer({
            source: new TileWMS({
                url: GEOSERVER_URL,
                params:{
                    LAYERS:'korea_map:color-relief_5186_opt',
                    TILED:true,
                },
                servertype:'geoserver',
            }),
            visible: false,
            opacity: 0.8,
            properties:{name:'colorRelief'}
        });
    }

    getLayers(){
        return [this.dem, this.hillshade, this.colorRelief];
    }
}