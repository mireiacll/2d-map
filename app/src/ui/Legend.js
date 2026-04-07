export class Legend {
  constructor(targetId) {
    this.container = document.getElementById(targetId);
    this._render();
  }

  _render() {
    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Legend';
    this.container.appendChild(title);

    this._addDEMSection();
    this._addContourSection();
    this._addBuildingSection();
  }

  _addDEMSection() {
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = 'DEM Elevation';
    this.container.appendChild(label);

    const gradient = document.createElement('div');
    gradient.className = 'legend-gradient';
    gradient.style.background = 'linear-gradient(to right, #1a9850, #91cf60, #d9ef8b, #fee08b, #fc8d59, #d73027, #ffffff)';
    this.container.appendChild(gradient);

    const labels = document.createElement('div');
    labels.className = 'legend-labels';

    const low = document.createTextNode('0m');
    const mid = document.createTextNode('1000m');
    const high = document.createTextNode('1950m');

    labels.appendChild(document.createTextNode('0m'));

    const midSpan = document.createElement('span');
    midSpan.textContent = '1000m';
    labels.appendChild(midSpan);

    labels.appendChild(document.createTextNode('1950m'));
    this.container.appendChild(labels);
  }

  _addContourSection() {
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = 'Contours';
    this.container.appendChild(label);

    const items = [
      { color: '#8B5E3C', label: 'Major (200m interval)' },
      { color: '#c8a882', label: 'Minor (50m interval)' },
    ];

    items.forEach(({ color, label: text }) => {
      const item = document.createElement('div');
      item.className = 'legend-item';

      const colorBox = document.createElement('div');
      colorBox.className = 'legend-color';
      colorBox.style.backgroundColor = color;
      colorBox.style.height = '3px';
      colorBox.style.borderRadius = '2px';

      const textEl = document.createTextNode(text);

      item.appendChild(colorBox);
      item.appendChild(document.createTextNode(text));
      this.container.appendChild(item);
    });
  }

  _addBuildingSection() {
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = 'Buildings';
    this.container.appendChild(label);

    const item = document.createElement('div');
    item.className = 'legend-item';

    const colorBox = document.createElement('div');
    colorBox.className = 'legend-color';
    colorBox.style.backgroundColor = 'rgba(173, 216, 230, 0.6)';
    colorBox.style.border = '1px solid #4a90d9';

    item.appendChild(colorBox);
    item.appendChild(document.createTextNode('Building footprint'));
    this.container.appendChild(item);
  }
}