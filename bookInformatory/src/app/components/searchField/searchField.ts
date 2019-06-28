
import style from "./searchField.css";
import markup from "./searchField.html";

import { buildTemplate } from "app/utils/buildTemplate";
import { updateComponentProp } from "app/utils/updateComponentProp";

const template = buildTemplate(style, markup);

export class SearchField extends HTMLElement {

  static TAG_NAME = "mm-search-field";
  public readonly root: ShadowRoot;

  private readonly field: HTMLInputElement | null;
  private readonly loader: HTMLElement | null;
  private readonly voiceSearchToggle: HTMLButtonElement | null;

  constructor() {

    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));

    this.field = this.root.querySelector("input");
    this.loader =this.root.querySelector("span");
    this.voiceSearchToggle = this.root.querySelector("button");

    if (this.field) {

      this.field.addEventListener("change", (event) => {
        const { value } = <HTMLInputElement>event.target;
        console.log("hange", value);
        this.dispatchEvent(
          new CustomEvent("search-field:change", { detail: { value }, bubbles: true }),
        );
      });

    }

  }

  connectedCallback() {

    if (!this.voiceSearchToggle || !this.field) {
      return;
    }

    if (!("webkitSpeechRecognition" in window)) {

      this.voiceSearchToggle.setAttribute("hidden", "hiddem");

    } else {

      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // recognition.onstart = function () { ... };
      // recognition.onresult = function (event) { ... };
      // recognition.onerror = function (event) { ... };
      // recognition.onend = function () { ... };

    }

  }

  static get observedAttributes() {
    return ["loading"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    if (name === "loading") {
      this.updateLaoder();
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

  private updateLaoder() {

    if (!this.loader) {
      return;
    }

    this.loader.hidden = !this.loading;

  }

}

customElements.define(SearchField.TAG_NAME, SearchField);
