const GEOSERVER_URL = '/geoserver/korea_map/wms';

export class ElevationClick {
  constructor(map, infoPanel, buildingLayer) {
    this.map = map;
    this.infoPanel = infoPanel;
    this.buildingLayer = buildingLayer;

    this.map.on('singleclick', (event) => this._handleClick(event));
  }

  async _handleClick(event) {
    // Skip if clicking on a building
    let clickedBuilding = false;
    this.map.forEachFeatureAtPixel(
      event.pixel,
      () => { clickedBuilding = true; return true; },
      { layerFilter: (layer) => layer === this.buildingLayer.getLayer() }
    );
    if (clickedBuilding) return;

    const view = this.map.getView();
    const viewResolution = view.getResolution();
    const projection = view.getProjection();
    const coordinate = event.coordinate;

    const url = `/geoserver/korea_map/wms?` +
      `SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo` +
      `&LAYERS=korea_map:dem_5186_opt` +
      `&QUERY_LAYERS=korea_map:dem_5186_opt` +
      `&INFO_FORMAT=application/json` +
      `&FEATURE_COUNT=1` +
      `&X=50&Y=50&WIDTH=101&HEIGHT=101` +
      `&SRS=EPSG:3857` +
      `&BBOX=${this._getBbox(coordinate, viewResolution)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const features = data.features;

      if (features && features.length > 0) {
        const elevation = features[0].properties.GRAY_INDEX;
        this.infoPanel.showElevation(elevation);
      }
    } catch (error) {
      console.error('Elevation fetch error:', error);
    }
  }

  _getBbox(coordinate, resolution) {
    const halfSize = resolution * 50;
    return [
      coordinate[0] - halfSize,
      coordinate[1] - halfSize,
      coordinate[0] + halfSize,
      coordinate[1] + halfSize,
    ].join(',');
  }
}