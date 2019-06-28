
import style from "./timePastLabel.css";
import markup from "./timePastLabel.html";

import { updateComponentProp } from "app/utils/updateComponentProp";
import { AppComponent } from "app/appComponent";

const UPDATE_INTERVAL = 8e3;

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function roundTime(value: number) {
  return Math.floor(value * 10) / 10;
}

function getTimeFormatterArgs(milliseconds: number) {

  const seconds = roundTime(milliseconds / 1e3);

  if (seconds < MINUTE) {
    return [seconds, "seconds"];
  }

  const minutes = roundTime(seconds / MINUTE);

  if (minutes < HOUR) {
    return [minutes, "minutes"];
  }

  const hours = Math.floor(minutes / HOUR);

  if (hours < DAY) {
    return [hours, "hours"];
  }

  return [Math.floor(hours / DAY), "days"];

}

export class TimePastLabel extends AppComponent {

  static TAG_NAME = "mm-time-past-label";

  private intervalRef = 0;
  private readonly timeLabel: HTMLTimeElement | null;
  private readonly timeFormatter: any;

  constructor() {

    super(style, markup);

    this.timeLabel = this.root.querySelector("time");

    // not looking at cases where user locale
    // is not supported...
    const { language = "en_EN" } = navigator;
    this.timeFormatter = new Intl.RelativeTimeFormat(language, { style: "long" });

  }

  static get observedAttributes() {
    return ["since"];
  }

  connectedCallback() {

    TimePastLabel.observedAttributes
      .forEach((prop) => updateComponentProp(this, prop));

  }

  disconnectedCallback() {
    window.clearInterval(this.intervalRef);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    if (name !== "since") {
      return;
    }

    this.updateLabel();
    this.restartInterval();

  }

  private restartInterval() {

    window.clearInterval(this.intervalRef);

    if (!this.since) {
      return;
    }

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

    console.log(this.timeLabel);

    if (!this.timeLabel) {
      return;
    }

    const since = this.since;

    if (!since) {

      this.timeLabel.textContent = "-";
      this.timeLabel.removeAttribute("datetime");

      return;

    }

    const timeDiff = Math.abs(since - Date.now());

    const [timeSince, unit] = getTimeFormatterArgs(timeDiff);
    this.timeLabel.textContent = this.timeFormatter.format(-timeSince, unit);
    this.timeLabel.setAttribute("datetime", new Date(since).toISOString());

  }

}

customElements.define(TimePastLabel.TAG_NAME, TimePastLabel);
