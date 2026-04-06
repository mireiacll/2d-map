export class LayerPanel {
  constructor(targetId, baseLayers, rasterLayers, buildingLayer, contourLayer) {
    this.container = document.getElementById(targetId);
    this.baseLayers = baseLayers;
    this.rasterLayers = rasterLayers;
    this.buildingLayer = buildingLayer;
    this.contourLayer = contourLayer;
    this._render();
  }

  _render() {
    // Title
    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Layer Control';
    this.container.appendChild(title);

    // Basemap section
    this._addSectionLabel('Background Map');
    this._addBasemapButtons();

    // Vector layers
    this._addSectionLabel('Vector Layers');
    this._addLayerRow('Buildings', true, this.buildingLayer.getLayer());
    this._addLayerRow('Contours', false, this.contourLayer.getLayer(), true);

    // Raster layers
    this._addSectionLabel('Raster Layers');
    this._addLayerRow('DEM', false, this.rasterLayers.dem, true);
    this._addLayerRow('Hillshade', false, this.rasterLayers.hillshade, true);
    this._addLayerRow('Color Relief', false, this.rasterLayers.colorRelief, true);
  }

  _addSectionLabel(text) {
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = text;
    this.container.appendChild(label);
  }

  _addBasemapButtons() {
    const row = document.createElement('div');
    row.className = 'basemap-row';

    const osmBtn = document.createElement('button');
    osmBtn.className = 'basemap-btn active';
    osmBtn.textContent = '🗺 OSM';

    const satBtn = document.createElement('button');
    satBtn.className = 'basemap-btn';
    satBtn.textContent = '🛰 Satellite';

    osmBtn.addEventListener('click', () => {
      this.baseLayers.switchTo('osm');
      osmBtn.classList.add('active');
      satBtn.classList.remove('active');
    });

    satBtn.addEventListener('click', () => {
      this.baseLayers.switchTo('satellite');
      satBtn.classList.add('active');
      osmBtn.classList.remove('active');
    });

    row.appendChild(osmBtn);
    row.appendChild(satBtn);
    this.container.appendChild(row);
  }

  _addLayerRow(name, checked, layer, showOpacity = false) {
    const row = document.createElement('div');
    row.className = 'layer-row';

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;

    layer.setVisible(checked);

    checkbox.addEventListener('change', () => {
      layer.setVisible(checkbox.checked);
    });

    const text = document.createTextNode(name);
    label.appendChild(checkbox);
    label.appendChild(text);
    row.appendChild(label);

    if (showOpacity) {
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.className = 'opacity-slider';
      slider.min = 0;
      slider.max = 100;
      slider.value = Math.round(layer.getOpacity() * 100);

      slider.addEventListener('input', () => {
        layer.setOpacity(slider.value / 100);
      });

      row.appendChild(slider);
    }

    this.container.appendChild(row);
  }
}