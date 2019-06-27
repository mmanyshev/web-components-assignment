
import style from "./timeLeftLabel.css";
import markup from "./timeLeftLabel.html";

import { buildTemplate } from "app/utils/buildTemplate";

const UPDATE_INTERVAL = 8e3;

const MINUTE = 60 * 1e3;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const template = buildTemplate(style, markup);

function getTimeFormatterArgs(timeDiff: number) {

  if (timeDiff < MINUTE) {
    return [Math.floor(timeDiff / 1e3), "seconds"];
  }

  if (timeDiff < HOUR) {
    return [Math.floor(timeDiff / HOUR), "minutes"];
  }

  if (timeDiff < DAY) {
    return [Math.floor(timeDiff / DAY), "hours"];
  }

  return [Math.floor(timeDiff / DAY), "days"];

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

    this.updateLabel();
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

    const timeDiff = since - Date.now();

    this.root.innerHTML = this.timeFormatter.format(
      ...getTimeFormatterArgs(timeDiff),
      { style: "long" },
    );

  }

}

customElements.define(TimeLeftLabel.TAG_NAME, TimeLeftLabel);
