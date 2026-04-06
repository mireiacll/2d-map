export class InfoPanel {
    constructor(targetId){
        this.container = document.getElementById(targetId);
        this._render();
    }

    _render(){
        const title = document.createElement('div');
        title.className = 'info-title';
        title.textContent = 'Information';
        this.container.appendChild(title);
        this.content = document.createElement('div');
        this.content.className = 'info-content';
        this.container.appendChild(this.content);
        this.showPlaceholder();
    }

    showPlaceholder(){
        this.content.textContent='';
        const placeholder = document.createElement('div');
        placeholder.className = 'info-placeholder';
        placeholder.textContent = 'Click a building or the map to get more info'
        this.content.appendChild(placeholder);
    }

    showBuilding(feature){
        this.content.textContent = '';
        const fields ={
            'OSM ID': feature.get('osm_id'),
            'Name': feature.get('name'),
            'Type': feature.get('type'),
            'Class': feature.get('fclass'),
        };

        Object.entries(fields).forEach(([key,value])=>{
            if(!value) return;
            const row = document.createElement('div');
            row.className = 'info-row';
            const keyEl = document.createElement('span');
            keyEl.className = 'info-key';
            keyEl.textContent = key;
            const valeEl = document.createElement('span');
            valeEl.className = 'info-value';
            valeEl.textContent = value;
            row.appendChild(keyEl);
            row.appendChild(valeEl);
            this.content.appendChild(row);
        });
    }

    showElevation(elevation){
        this.content.textContent='';
        const row = document.createElement('div');
        row.className =  'info-row';
        const keyEl = document.createElement('span');
        keyEl.className = 'info-key';
        keyEl.textContent = 'Elevation';
        const valEl = document.createElement('span');
        valEl.className = 'info-value';
        valEl.textContent = `${Math.round(elevation)} m`;
        row.appendChild(keyEl);
        row.appendChild(valEl);
        this.content.appendChild(row);
    }
}