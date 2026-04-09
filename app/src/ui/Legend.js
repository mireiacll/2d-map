export class Legend {
  constructor(targetId) {
    this.container = document.getElementById(targetId);
    this.sections = {}; // CRITICAL: Initialize this first!
    this._render();
  }

  _render() {
    // Clear container to prevent double rendering
    this.container.innerHTML = ''; 

    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Legend';
    this.container.appendChild(title);

    // Build the sections and store references
    this.sections.dem = this._addDEMSection();
    this.sections.colorRelief = this._addColorReliefSection();
    this.sections.contours = this._addContourSection();
    this.sections.buildings = this._addBuildingSection();

    // Set initial visibility
    this.showSection('dem', false);
    this.showSection('colorRelief', false);
    this.showSection('contours', false);
    this.showSection('buildings', true);
  }

  showSection(name, visible) {
    if (this.sections[name]) {
      this.sections[name].style.display = visible ? 'block' : 'none';
    }
  }

  _addDEMSection() {
    const wrapper = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = 'DEM Elevation';
    wrapper.appendChild(label);

    const gradient = document.createElement('div');
    gradient.className = 'legend-gradient';
    gradient.style.height = '15px'; // Ensure height is set
    gradient.style.background = 'linear-gradient(to right, #1a9850, #91cf60, #d9ef8b, #fee08b, #fc8d59, #d73027, #ffffff)';
    wrapper.appendChild(gradient);

    const labels = document.createElement('div');
    labels.className = 'legend-labels';
    labels.innerHTML = '<span>0m</span><span>1000m</span><span>1950m</span>';
    wrapper.appendChild(labels);

    this.container.appendChild(wrapper);
    return wrapper;
  }

  _addContourSection() {
    const wrapper = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = 'Contours';
    wrapper.appendChild(label);

    const items = [
      { color: '#8B5E3C', label: 'Major (200m interval)', height: '4px' },
      { color: '#c8a882', label: 'Minor (50m interval)', height: '2px' },
    ];

    items.forEach(({ color, label: text, height }) => { // Added height here
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.gap = '10px';

      const line = document.createElement('div');
      line.style.backgroundColor = color;
      line.style.height = height; // Now height is defined
      line.style.width = '30px';

      item.appendChild(line);
      item.appendChild(document.createTextNode(text));
      wrapper.appendChild(item);
    });

    this.container.appendChild(wrapper);
    return wrapper;
  }

  _addBuildingSection() {
    const wrapper = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = 'Buildings';
    wrapper.appendChild(label);

    const item = document.createElement('div');
    item.className = 'legend-item';

    const colorBox = document.createElement('div');
    colorBox.className = 'legend-color';
    colorBox.style.width = '15px';
    colorBox.style.height = '15px';
    colorBox.style.backgroundColor = 'rgba(173, 216, 230, 0.6)';
    colorBox.style.border = '1px solid #4a90d9';
    colorBox.style.display = 'inline-block';
    colorBox.style.marginRight = '10px';

    item.appendChild(colorBox);
    item.appendChild(document.createTextNode('Building footprint'));
    wrapper.appendChild(item);
    this.container.appendChild(wrapper);
    return wrapper;
  }

  _addColorReliefSection() {
    const wrapper = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'section-label';
    label.textContent = 'Color Relief';
    wrapper.appendChild(label);

    const gradient = document.createElement('div');
    gradient.className = 'legend-gradient';
    gradient.style.height = '15px';
    gradient.style.background = 'linear-gradient(to right, #00008b, #0000ff, #00bfff, #00ff00, #ffff00, #8b4513)';
    wrapper.appendChild(gradient);

    const labels = document.createElement('div');
    labels.className = 'legend-labels';
    labels.innerHTML = '<span>0m</span><span>1000m</span><span>1950m</span>';
    wrapper.appendChild(labels);

    this.container.appendChild(wrapper);
    return wrapper;
  }
}