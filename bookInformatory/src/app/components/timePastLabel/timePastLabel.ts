
import style from "./timePastLabel.css";
import markup from "./timePastLabel.html";

import { updateComponentProp } from "app/utils/updateComponentProp";
import { AppComponent } from "app/appComponent";
import { IntervalTask } from "app/intervalTask";

const UPDATE_INTERVAL = 8e3;

const MINUTE = 60;
const HOUR = 60;
const DAY = 24;

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

  private readonly timeLabel: HTMLTimeElement | null;
  private readonly timeFormatter: any;

  private updateTimeLabelTask: IntervalTask;

  constructor() {

    super(style, markup);
    this.timeLabel = this.root.querySelector("time");

    // not looking at cases where user locale
    // is not supported...
    const { language = "en_EN" } = navigator;
    this.timeFormatter = new Intl.RelativeTimeFormat(language, { style: "long" });

    this.updateTimeLabelTask = new IntervalTask(this.updateLabel, UPDATE_INTERVAL);

  }

  static get observedAttributes() {
    return ["since"];
  }

  connectedCallback() {

    TimePastLabel.observedAttributes
      .forEach((prop) => updateComponentProp(this, prop));

  }

  disconnectedCallback() {
    this.updateTimeLabelTask.pause();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    if (name !== "since") {
      return;
    }

    this.updateTimeLabelTask.pause();
    this.updateTimeLabelTask.runOnce();

    if (!this.since) {
      return;
    }

    this.updateTimeLabelTask.run();

  }

  get since(): number | undefined {

    if (this.hasAttribute("since")) {
      return Number(this.getAttribute("since"));
    }

    return;

  }

  set since(value: number | undefined) {

    if (typeof value !== "number") {

      this.removeAttribute("since");
      return;

    }

    this.setAttribute("since", value.toString());

  }

  private updateLabel = () => {

    const since = this.since;

    if (!since) {

      this.timeLabel!.textContent = "-";
      this.timeLabel!.removeAttribute("datetime");

      return;

    }

    const timeDiff = Math.abs(since - Date.now());

    const [timeSince, unit] = getTimeFormatterArgs(timeDiff);
    this.timeLabel!.textContent = this.timeFormatter.format(-timeSince, unit);
    this.timeLabel!.setAttribute("datetime", new Date(since).toISOString());

  }

}
