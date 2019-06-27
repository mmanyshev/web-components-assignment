
import style from "./carousel.css";
import markup from "./carousel.html";

import { buildTemplate } from "app/utils/buildTemplate";

const template = buildTemplate(style, markup);

export class Carousel extends HTMLElement {

  static TAG_NAME = "mm-carousel";
  public readonly root: ShadowRoot;

  constructor() {

    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));

  }

  public set items(value: any[]) {
    this.root.innerHTML = JSON.stringify(value);
  }

}

customElements.define(Carousel.TAG_NAME, Carousel);
