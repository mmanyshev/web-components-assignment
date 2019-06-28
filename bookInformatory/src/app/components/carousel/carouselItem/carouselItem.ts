
import { buildTemplate } from "app/utils/buildTemplate";
//import { updateComponentProp } from "app/utils/updateComponentProp";

const template = buildTemplate("", "");

export class CarouselItem extends HTMLElement {

  static TAG_NAME = "mm-carousel-item";
  public readonly root: ShadowRoot;

  constructor() {

    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));

  }

  set data(value: any) {

    const childTagName = this.getAttribute("child-tag-name") || "mm-book-card";
    const childNode = <any>document.createElement(childTagName);

    childNode.data = value;
    this.root.appendChild(childNode);

  }

}

customElements.define(CarouselItem.TAG_NAME, CarouselItem);
