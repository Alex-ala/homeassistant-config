class RoombaCard extends HTMLElement {

    set hass(hass) {
        if (!this.content) {
            const card = document.createElement('ha-card');
            card.header = "Vacuum state";
            this.content = document.createElement('div');
            this.content.style.padding = '0 16px 16px';
            card.appendChild(this.content);
            this.appendChild(card);
        }

        const entityId = this.config.entity;
        const state = hass.states[entityId];
        const friendly_name = state.attributes.friendly_name;
        const bin_full = state.attributes.bin_full;
        const bin_present = state.attributes.bin_present;
        const battery_icon = state.attributes.battery_icon;
        const battery_level = state.attributes.battery_level;
        const status = state.attributes.status;
        this.stateObj = state;
        var bin_icon = "mdi:trash-can-outline";
        var bin_text = "Empty";
        if (bin_full){ bin_icon = "mdi:trash-can"; bin_text="Full"; }
        if (!bin_present){ bin_icon="mdi:filter-remove"; bin_text="Removed"; }


        this.header = `${friendly_name}`;
        this.content.innerHTML = `
<div>
    <div style="display: flex; flex-direction: row; justify-content: space-between">
        <div><span>State: <b>${status}</b></span></div>
        <div>
            <ha-icon icon="${battery_icon}"></ha-icon>
            <span>${battery_level}%</span>
        </div>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: space-between">
        <div><span>Bin:</span></div>
        <div>
            <ha-icon icon="${bin_icon}"></ha-icon>
            <span>${bin_text}</span>
        </div>
    </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between">
        <paper-icon-button icon="mdi:play" on-click="clean"></paper-icon-button>
        <paper-icon-button icon="mdi:stop" on-click="stop"></paper-icon-button>
        <paper-icon-button icon="mdi:home-circle" on-click="return_home"></paper-icon-button>
    </div>
    <more-info-vacuum></more-info-vacuum>
</div>`;
    }
    setConfig(config){
        if (!config.entity) {
            throw new Error('You need to define an entity');
        }
        this.config = config;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 3;
    }

    clean(){
        this.hass.callService('vacuum','clean', { entity_id: this.config.entity});
    }
    stop(){
        this.hass.callService('vacuum','stop', { entity_id: this.config.entity});
    }
    return_home(){
        this.hass.callService('vacuum','return_to_base', { entity_id: this.config.entity});
    }




}
customElements.define('roomba-card', RoombaCard);