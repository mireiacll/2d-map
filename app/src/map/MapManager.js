import Map from 'ol/Map.js';
import View from'ol/View.js';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css'

export class MapManager{
    constructor(targetId,layers=[]){
        this.map = new Map({
            target: targetId,
            layers: layers,
            view: new View({
                center: fromLonLat([127.5,36.5]),
                zoom: 7,
                minZoom: 6,
                maxZoom:18,
            }),
        });
    }
    
    getMap(){
        return this.map;
    }
}