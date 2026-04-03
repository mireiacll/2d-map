import { BaseLayers } from "./layers/BaseLayers.js";
import { BuildingLayer } from "./layers/BuildingLayer.js";
import { RasterLayers } from "./layers/RasterLayer.js";
import { MapManager } from "./map/MapManager.js";

const baseLayers = new BaseLayers();
const rasterLayers = new RasterLayers();
const buildingLayer = new BuildingLayer();

const allLayers = [
  ...baseLayers.getLayers(),
  ...rasterLayers.getLayers(),
  buildingLayer.getLayer(),
];

const mapManager = new MapManager('map', allLayers);