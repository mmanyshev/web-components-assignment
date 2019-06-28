
import style from "./carousel.css";
import markup from "./carousel.html";

import { AppComponent } from "app/appComponent";
import { CarouselItem } from "./carouselItem";

export class Carousel extends AppComponent {

  static TAG_NAME = "mm-carousel";
  public readonly intersectionObserver: IntersectionObserver;

  private wrapper: HTMLElement | null;

  constructor() {

    super(style, markup);
    this.wrapper = this.root.querySelector(".wrapper");

    // I'm gonna be using intersectionObserver
    // since "loading" attribute for <img />
    // is not yet supported

    const observerOptions = {
      root: this.wrapper,
      rootMargin: "20%",
      treshold: 0.1,
    };

    this.intersectionObserver =
      new IntersectionObserver(this.observerCallback, observerOptions);

  }

  discocnnectedCallback() {
    this.intersectionObserver.disconnect();
  }

  public set items(value: any[]) {
    this.buildSlides(value);
  }

  private buildSlides(slides: any[]) {

    if (!this.wrapper) {

      console.warn("no wrapper");
      return;

    }

    while (this.wrapper.firstChild) {

      const node = <HTMLElement>this.wrapper.firstElementChild;

      this.intersectionObserver.unobserve(node);
      this.wrapper.removeChild(node);

    }

    const slidesFragment = document.createDocumentFragment();
    slides.forEach((data) => {

      const slide = <CarouselItem>document.createElement(CarouselItem.TAG_NAME);
      const slideTagName = this.getAttribute("slide-component") || "div";

      slide.createSlide(slideTagName, data);

      slidesFragment.appendChild(slide);
      this.intersectionObserver.observe(slide);

    });

    this.wrapper.appendChild(slidesFragment);

  }

  private observerCallback(entries: IntersectionObserverEntry[]) {

    entries.forEach((entry) => {

      const target = <CarouselItem>entry.target;

      if (!entry.isIntersecting || target.loaded) {
        return;
      }

      target.loaded = true;

    });
  }

}

customElements.define(Carousel.TAG_NAME, Carousel);
