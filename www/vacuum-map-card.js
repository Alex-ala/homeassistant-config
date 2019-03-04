class VacuumMapCard extends HTMLElement {

    set hass(hass) {
        if (!this.background) {
            const card = document.createElement('ha-card');
            const canvas = document.createElement('div');
            canvas.setAttribute('style','position:relative');
            const background = document.createElement('div');
            canvas.appendChild(background);
            this.background = background;

            this.renderBackground(background);
            this.renderOverlay(canvas);

            card.appendChild(canvas);
            this.appendChild(card);
        }else {
            this.renderOverlay(this.overlay);
        }

        this.state = hass.states[this.config.entity];
        this.posx = parseInt(this.state.attributes.position.split(',')[0].replace('(', ''));
        this.posy = parseInt(this.state.attributes.position.split(',')[1].replace('(', ''));
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error('You need to define an entity');
        } else if (!config.background_image){
            throw new Error('You need to define a background image');
        } else if (!config.position){
            throw new Error('You need to define the base position offset on  image');
        }
        this.config = config;
        this.xoffset = parseInt(this.config.position.x);
        this.yoffset = parseInt(this.config.position.y);
        this.posx = 2;
        this.posy = 1;

        this.overlays = new Object();
    }

    getCardSize() {
        return 3;
    }

    renderBackground(element){
        const background = document.createElement('hui-image');
        background.setAttribute('image', this.config.background_image);
        if (element.childElementCount == 0){
            element.appendChild(background)
        }else{
            while (element.firstChild){
                element.removeChild(element.firstChild)
            }
            element.appendChild(background);
        }
    }

    renderOverlay(element){
        if (!this.overlays.hasOwnProperty('robot')){
            const robot = document.createElement('div');
            const icon = document.createElement('ha-icon');
            icon.setAttribute('icon','mdi:robot-vacuum');
            robot.appendChild(icon);
            this.overlays.robot = robot;
            element.appendChild(robot);
            robot.addEventListener('click', () => this.showInfo());
        }

        const style = 'position: absolute; top: ' + (this.yoffset+this.posy) + 'px; left: '+ (this.xoffset+this.posx) + 'px;';
        this.overlays.robot.setAttribute('style',style);


    }

    showInfo(){
        const detail = { entityId: this.config.entity };
        const event = new Event('hass-more-info');
        print("FIRE");
        VacuumMapCard.fireEvent(event, detail)
    }

    static fireEvent(ev, detail, entity=null) {
        ev = new Event(ev, {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        ev.detail = detail || {};
        if(entity) {
            entity.dispatchEvent(ev);
        } else {
            var root = document
                .querySelector("home-assistant")
                .shadowRoot.querySelector("home-assistant-main")
                .shadowRoot.querySelector("app-drawer-layout partial-panel-resolver")
                .shadowRoot.querySelector("ha-panel-lovelace")
                .shadowRoot.querySelector("hui-root")
            if (root)
                root
                    .shadowRoot.querySelector("ha-app-layout #view")
                    .firstElementChild
                    .dispatchEvent(ev);
        }
    }

}
customElements.define('vacuum-map-card', VacuumMapCard);