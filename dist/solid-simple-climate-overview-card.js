/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class SolidSimpleClimateOverviewCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  render() {
    const hass = this.hass;
    const entityId = this.config.entity;
    const state = hass.states[entityId];

    if (!state) {
      return html`
        <ha-card>
          <div>ERROR: entity ${entityId} not found</div>
        </ha-card>
      `;
    }

    const hvacTargetElement = html`
      <div style="text-align: center; position: relative; color: #333;">
        ${state.attributes.hvac_action ? hass.formatEntityAttributeValue(state, 'hvac_action') : hass.formatEntityState(state)}
        ${state.attributes.temperature ? html`
          <div style="display: inline-block; position:relative;">
            <span style="position: relative; display: inline-block; top: -1px"><ha-icon icon="mdi:arrow-right-bold" style="--mdc-icon-size: 12px"></ha-icon></span>
            ${state.attributes.temperature}
            <span style="font-size: 0.8rem; ">˚C</span>
          </div>
        ` : ''}
      </div>
    `;

    return html`
      <ha-card>
        <a class="full-link" href="${this.config.link}">
          <h3 style="text-align:center; margin: 0; color: #555555; font-size: 1rem; font-weight: bolder">
            ${this.config.name}</h3>

          <div style="text-align: center; font-size: 2rem; font-weight: bold; color: #333; margin: 1.375rem 0 1rem">
            <div style="display: inline-block; position:relative">
              ${state.attributes.current_temperature}
              <span style="font-size: 1.7rem;">˚C</span>
            </div>
          </div>

          ${hvacTargetElement}
        </a>
      </ha-card>
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

  static get styles() {
    return css`
      ha-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        overflow: hidden;
      }

      .full-link:before {
        position: absolute;
        left: -10px;
        right: -10px;
        bottom: -10px;
        top: -10px;

        content: "";

        opacity: 0;
        background-color: var(--state-inactive-color);

        transition: opacity 200ms linear 0s;
      }

      .full-link:active:before {
        opacity: 0.05;
      }

      .full-link:active:before {
        opacity: 0.12;
      }

      .full-link {
        text-decoration: none;
        cursor: pointer;

        flex-grow: 1;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 16px;
        margin: 0;
      }
    `;
  }
}

customElements.define("solid-simple-climate-overview-card", SolidSimpleClimateOverviewCard);
