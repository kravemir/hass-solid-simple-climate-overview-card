// SPDX-License-Identifier: MPL-2.0

class SolidSimpleClimateOverviewCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card>
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];

    this.content.innerHTML = `
      <a href="${this.config.link}" style="text-decoration: none">
        <h2 style="text-align:center; margin: 0; color: #555555; font-size: 1.2em">${this.config.name}</h2>
      
        <div style="text-align: center; font-size: 2.25rem; font-weight: bold; color: #333; margin: 1.5rem 0 1.125rem">
          <div style="display: inline-block; position:relative">
            ${state.attributes.current_temperature}
            <span style="font-size: 1.8rem;">˚C</span>
          </div>
        </div>
      
        <div style="text-align: center; font-size: 1.125rem; position: relative; color: #333;">
          <div style="display: inline-block; position:relative">
            <div style="position:absolute; left: -50px; text-align: right; width: 40px; padding-right: 12px; margin-top: -1px"><ha-icon icon="mdi:arrow-right-bold" style="--mdc-icon-size: 12px"></ha-icon></div>
            ${state.attributes.temperature}
            <span style="font-size: 1rem; ">˚C</span>
          </div>
        </div>
      </a>
    `;
  }

  setConfig(config) {
    if (!config.entity) {
        throw new Error("You need to define a name");
    }

    if (!config.entity) {
        throw new Error("You need to define an entity");
    }

    this.config = config;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("solid-simple-climate-overview-card", SolidSimpleClimateOverviewCard);
