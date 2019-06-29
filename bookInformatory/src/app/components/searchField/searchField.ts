
import style from "./searchField.css";
import markup from "./searchField.html";

import { AppComponent } from "app/appComponent";
import { Loader } from "app/components/loader";

import { EVENTS as VOICE_EVENTS } from "app/components/voiceRecognition";
import { EVENTS as SEARCH_EVENTS } from "./";

export class SearchField extends AppComponent {

  static TAG_NAME = "mm-search-field";

  private readonly field: HTMLInputElement | null;
  private readonly loader: Loader | null;

  constructor() {

    super(style, markup);

    this.field = this.root.querySelector("input");
    this.loader = this.root.querySelector("mm-loader");

  }

  connectedCallback() {

    this.field!.addEventListener("change", this.dispatchSearch);

    this.root.addEventListener(VOICE_EVENTS.RECOGNITION_END, this.dispatchSearch);
    this.root.addEventListener(VOICE_EVENTS.RECOGNITION_START, this.onVoiceSearchStart);

    const onVoiceSearchUpdate = this.onVoiceSearchUpdate as EventListener;
    this.root.addEventListener(VOICE_EVENTS.RECOGNITION_UPDATE, onVoiceSearchUpdate);

  }

  disconnectedCallback() {

    this.field!.removeEventListener("change", this.dispatchSearch);

    this.root.removeEventListener(VOICE_EVENTS.RECOGNITION_END, this.dispatchSearch);
    this.root.removeEventListener(VOICE_EVENTS.RECOGNITION_START, this.onVoiceSearchStart);

    const onVoiceSearchUpdate = this.onVoiceSearchUpdate as EventListener;
    this.root.removeEventListener(VOICE_EVENTS.RECOGNITION_UPDATE, onVoiceSearchUpdate);

  }

  static get observedAttributes() {
    return ["loading"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    if (name === "loading") {
      this.loader!.hidden = !this.loading;
    }

  }

  get loading() {
    return this.hasAttribute("loading");
  }

  set loading(value: boolean) {

    if (value) {

      this.setAttribute("loading", "");
      return;

    }

    this.removeAttribute("loading");

  }

  private dispatchSearch = () => {

    const value = this.field!.value;

    this.dispatchEvent(
      new CustomEvent(
        SEARCH_EVENTS.SEARCH,
        { detail: { value }, bubbles: true },
      ),
    );

  }

  private onVoiceSearchStart = () => {
    this.field!.value = "";
  }

  private onVoiceSearchUpdate = (event: CustomEvent) => {
    this.field!.value = event.detail;
  }

}
