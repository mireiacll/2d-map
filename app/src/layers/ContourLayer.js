import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';

import { GEOSERVER_BASE } from '../config.js';
const GEOSERVER_URL = `${GEOSERVER_BASE}/korea_map/wms`;
//const GEOSERVER_URL = '/geoserver/korea_map/wms';

export class ContourLayer {
  constructor() {
    this.layer = new TileLayer({
      source: new TileWMS({
        url: GEOSERVER_URL,
        params: {
          LAYERS: 'korea_map:contour',
          STYLES:'korea_map:contour_style',
          TILED: true,
        },
        serverType: 'geoserver',
      }),
      visible: true,
      opacity: 0.8,
      minZoom:12,
      properties: { name: 'contours' },
    });
  }

  getLayer() {
    return this.layer;
  }
}