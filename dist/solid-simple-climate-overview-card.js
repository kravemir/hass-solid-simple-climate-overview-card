/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

class SolidSimpleClimateOverviewCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card style="height: 100%">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];

    if(!state) {
      this.content.innerHTML = `ERROR: entity ${entityId} not found`;
      return;
    }

    const hvacTargetElement = `
      <div style="text-align: center; position: relative; color: #333;">
        ${state.attributes.hvac_action ? hass.formatEntityAttributeValue(state, 'hvac_action') : hass.formatEntityState(state)}
        ${state.attributes.temperature ? `
          <div style="display: inline-block; position:relative;">
            <span style="position: relative; display: inline-block; top: -1px"><ha-icon icon="mdi:arrow-right-bold" style="--mdc-icon-size: 12px"></ha-icon></span>
            ${state.attributes.temperature}
            <span style="font-size: 0.8rem; ">˚C</span>
          </div>
        ` : ''}
      </div>
    `;

    this.content.innerHTML = `
      <a href="${this.config.link}" style="text-decoration: none">
        <h3 style="text-align:center; margin: 0; color: #555555; font-size: 1rem; font-weight: bolder">${this.config.name}</h3>
      
        <div style="text-align: center; font-size: 2rem; font-weight: bold; color: #333; margin: 1.375rem 0 1rem">
          <div style="display: inline-block; position:relative">
            ${state.attributes.current_temperature}
            <span style="font-size: 1.7rem;">˚C</span>
          </div>
        </div>
        
        ${hvacTargetElement}
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
