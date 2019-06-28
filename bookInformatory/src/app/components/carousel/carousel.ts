
import style from "./carousel.css";
import markup from "./carousel.html";

import { buildTemplate } from "app/utils/buildTemplate";
import { CarouselItem } from "./carouselItem";

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
    this.buildSlides(value);
  }

  private buildSlides(slides: any[]) {

    const wrapperNode = this.root.querySelector(".wrapper");

    if (!wrapperNode) {

      console.warn("no wrapper");
      return;

    }

    const slidesFragment = document.createDocumentFragment();
    slides.forEach((data) => {

      const slide = <CarouselItem>document.createElement(CarouselItem.TAG_NAME);
      slide.data = data;

      slidesFragment.appendChild(slide);

    });

    console.log(slidesFragment);

    wrapperNode.appendChild(slidesFragment);

  }

}

customElements.define(Carousel.TAG_NAME, Carousel);
