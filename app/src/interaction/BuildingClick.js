export class BuildingClick{
    constructor(map, buildingLayer, infoPanel){
        this.map = map;
        this.buildingLayer =  buildingLayer;
        this.infoPanel = infoPanel;
        this.map.on('singleclick', (event)=> this._handleClick(event));
    }
    _handleClick(event){
        const features = [];
        this.map.forEachFeatureAtPixel(
            event.pixel,
            (feature) => {
                features.push(feature);
                return true; // stops after first feature found!
            },
            { 
                layerFilter: (layer) => layer === this.buildingLayer.getLayer(),
                hitTolerance: 2,
            }
        );

        if (features.length>0){
            this.infoPanel.showBuilding(features[0]);
        } else {
            this.infoPanel.showPlaceholder();
        }
    }
}