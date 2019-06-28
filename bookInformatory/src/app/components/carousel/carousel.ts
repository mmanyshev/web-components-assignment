
import style from "./carousel.css";
import markup from "./carousel.html";

import { AppComponent } from "app/appComponent";
import { IntervalTask } from "app/intervalTask";
import { CarouselItem } from "./carouselItem";

export class Carousel extends AppComponent {

  static TAG_NAME = "mm-carousel";

  private wrapper: HTMLElement | null;
  private carouselScroller: IntervalTask;
  private carouselScrolleStep: number = 0;

  public readonly intersectionObserver: IntersectionObserver;

  constructor() {

    super(style, markup);
    this.wrapper = this.root.querySelector(".wrapper");

    this.autoScroll = this.autoScroll.bind(this);
    this.onPageVisibilityChange = this.onPageVisibilityChange.bind(this);

    this.carouselScroller = new IntervalTask(this.autoScroll, 3e3);

    // I'm gonna be using intersectionObserver
    // since "loading" attribute for <img /> is not yet supported

    const observerOptions = {
      root: this.wrapper,
      rootMargin: "20%",
      treshold: 0.1,
    };

    this.intersectionObserver =
      new IntersectionObserver(this.onObserverChange, observerOptions);

  }

  connectedCallback() {
    document.addEventListener("visibilitychange", this.onPageVisibilityChange);
  }

  discocnnectedCallback() {

    this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.onPageVisibilityChange);

  }

  public set items(value: any[]) {
    this.buildSlides(value);
  }

  private buildSlides(slides: any[]) {

    if (!this.wrapper) {

      console.warn("no wrapper");
      return;

    }

    this.carouselScroller.pause();

    while (this.wrapper.firstChild) {

      const node = <HTMLElement>this.wrapper.firstElementChild;

      this.intersectionObserver.unobserve(node);
      this.wrapper.removeChild(node);

    }

    if (!slides.length) {
      return;
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
    this.carouselScroller.run();

  }

  private onObserverChange(entries: IntersectionObserverEntry[]) {

    entries.forEach((entry) => {

      const target = <CarouselItem>entry.target;

      if (!entry.isIntersecting || target.loaded) {
        return;
      }

      target.loaded = true;

    });

  }

  private onPageVisibilityChange() {

    if (document.hidden) {
      this.carouselScroller.pause();
    }

    if (!document.hidden) {
      this.carouselScroller.run();
    }

  }

  autoScroll() {

    if (!this.wrapper) {
      return;
    }

    const width = this.wrapper.clientWidth;
    this.wrapper.scrollBy({ top: 0, left: width, behavior: "smooth" });

  }

}

customElements.define(Carousel.TAG_NAME, Carousel);
