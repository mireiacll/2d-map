import { BaseLayers } from "./layers/BaseLayers.js";
import { BuildingLayer } from "./layers/BuildingLayer.js";
import { RasterLayers } from "./layers/RasterLayer.js";
import { MapManager } from "./map/MapManager.js";
import { ContourLayer } from './layers/ContourLayer.js';
import { LayerPanel } from './ui/LayerPanel.js';
import { InfoPanel } from './ui/InfoPanel.js';
import { BuildingClick } from './interaction/BuildingClick.js';

const baseLayers = new BaseLayers();
const rasterLayers = new RasterLayers();
const buildingLayer = new BuildingLayer();
const contourLayer = new ContourLayer();

const allLayers = [
  ...baseLayers.getLayers(),
  ...rasterLayers.getLayers(),
  buildingLayer.getLayer(),
  contourLayer.getLayer(),
];
const mapManager = new MapManager('map', allLayers);

const infoPanel = new InfoPanel('info-panel');

new LayerPanel(
  'layer-panel',
  baseLayers,
  rasterLayers,
  buildingLayer,
  contourLayer
);

new BuildingClick(
  mapManager.getMap(),
  buildingLayer,
  infoPanel
);