
import style from "./timeLeftLabel.css";
import markup from "./timeLeftLabel.html";

import { buildTemplate } from "app/utils/buildTemplate";

const UPDATE_INTERVAL = 1e3;
const template = buildTemplate(style, markup);

function getTimeUnit() {

}

export class TimeLeftLabel extends HTMLElement {

  static TAG_NAME = "mm-time-left-label";
  public readonly root: ShadowRoot;

  private intervalRef = 0;
  private timeFormatter: any;

  constructor() {

    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));

    // not looking at cases where user locale
    // is not supported...
    const { language = "en_EN" } = navigator;
    this.timeFormatter = new Intl.RelativeTimeFormat(language, { style: "narrow" });

  }

  static get observedAttributes() {
    return ["since"];
  }

  connectedCallback() {

  }

  disconnectedCallback() {
    window.clearInterval(this.intervalRef);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    if (name !== "since") {
      return;
    }

    this.restartInterval();

  }

  private restartInterval() {

    window.clearInterval(this.intervalRef);
    this.intervalRef = window.setInterval(this.updateLabel.bind(this) , UPDATE_INTERVAL);

  }

  get since(): number | undefined {

    if (this.hasAttribute("since")) {
      return Number(this.getAttribute("since"));
    }

    return Date.now();

  }

  set since(value: number | undefined) {

    if (typeof value !== "number") {

      this.removeAttribute("since");
      return;

    }

    this.setAttribute("since", value.toString());

  }

  private updateLabel() {

    const since = this.since;

    if (!since) {
      return;
    }

    const delta = Date.now() - since;
    this.root.innerHTML = this.timeFormatter.format(delta, "seconds");

  }

}

customElements.define(TimeLeftLabel.TAG_NAME, TimeLeftLabel);
