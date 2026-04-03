import TileLayer from "ol/layer/Tile.js";
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ.js'

export class BaseLayers{
    constructor(){
        this.osm = new TileLayer({
            source: new OSM(),
            visible: true,
            propierties: {name:'osm'},
        });
        this.satellite = new TileLayer({
            source: new XYZ({
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attributions: 'Esri World Imagery',
            }),
            visible: false,
            properties:{ name: 'satllite'},
        });
    }

    getLayers(){
        return [ this.osm, this.satellite];
    }

    switchTo(name){
        this.osm.setVisible(name === 'osm');
        this.satellite.setVisible(name==='satellite');
    }
}