
import style from "./searchField.css";
import markup from "./searchField.html";

import { buildTemplate } from "app/utils/buildTemplate";

const template = buildTemplate(style, markup);

export class SearchField extends HTMLElement {

  static TAG_NAME = "mm-search-field";
  public readonly root: ShadowRoot;

  private readonly field: HTMLInputElement | null;
  private readonly voiceSearchToggle: HTMLButtonElement | null;

  constructor() {

    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));

    this.field = this.root.querySelector("input");
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

  }

}

customElements.define(SearchField.TAG_NAME, SearchField);
