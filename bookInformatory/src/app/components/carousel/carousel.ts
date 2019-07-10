
import { Key } from "ts-key-enum";

import style from "./carousel.css";
import markup from "./carousel.html";

import { AppComponent } from "app/appComponent";
import { IntervalTask } from "app/timerTask";

import { CarouselItem } from "./carouselItem";

export class Carousel extends AppComponent {

  static TAG_NAME = "mm-carousel";

  private wrapper: HTMLElement | null;
  private carouselScroller: IntervalTask;

  private readonly intersectionObserver: IntersectionObserver;

  constructor() {

    super(style, markup);
    this.wrapper = this.root.querySelector(".wrapper");

    this.carouselScroller = new IntervalTask(this.autoScroll, 3e3);

    // I'm gonna be using intersectionObserver
    // since "loading" attribute for <img /> is not yet supported

    const observerOptions = {
      root: this.wrapper,
      rootMargin: "80px",
      treshold: 0.1,
    };

    this.intersectionObserver =
      new IntersectionObserver(this.onObserverChange, observerOptions);

  }

  connectedCallback() {

    document.addEventListener("visibilitychange", this.onPageVisibilityChange);

    this.wrapper!.addEventListener("keydown", this.onKeysScroll);

  }

  discocnnectedCallback() {

    this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.onPageVisibilityChange);

    this.wrapper!.removeEventListener("keydown", this.onKeysScroll);

  }

  public set items(value: any[]) {
    this.buildSlides(value);
  }

  private appendSlideTo = (fragment: DocumentFragment, slideTagName: string, slideData: any) => {

    const slide = <CarouselItem>document.createElement(CarouselItem.TAG_NAME);
    slide.createSlide(slideTagName, slideData);

    fragment.appendChild(slide);
    this.intersectionObserver.observe(slide);

  }

  private buildSlides(slides: any[]) {

    this.carouselScroller.reset();

    let node;
    while (node = this.wrapper!.firstChild) {

      this.wrapper!.removeChild(node);

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      this.intersectionObserver.unobserve(<HTMLElement>node);

    }

    if (!slides.length) {
      return;
    }

    const slideTagName = this.getAttribute("slide-component") || "div";
    const slidesFragment = document.createDocumentFragment();

    slides.forEach((slideData) =>
      this.appendSlideTo(slidesFragment, slideTagName, slideData));

    this.wrapper!.appendChild(slidesFragment);
    this.carouselScroller.run();

  }

  private onObserverChange = (entries: IntersectionObserverEntry[]) => {

    entries.forEach((entry) => {

      const target = <CarouselItem>entry.target;
      if (!entry.isIntersecting || target.loaded) {
        return;
      }

      target.loaded = true;

    });

  }

  private onPageVisibilityChange = () => {

    if (document.hidden) {
      this.carouselScroller.reset();
    }

    if (!document.hidden) {
      this.carouselScroller.run();
    }

  }

  private autoScroll = () => {

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = this.wrapper!;

    if (scrollLeft === scrollWidth - clientWidth) {

      this.wrapper!.scrollTo(0, 0);
      return;

    }

    this.wrapper!.scrollBy(clientWidth, 0);

  }

  private onKeysScroll = (event: KeyboardEvent) => {

    if (event.key !== Key.ArrowLeft &&
        event.key !== Key.ArrowRight) {

      return;
    }

    this.carouselScroller.reset();
    this.carouselScroller.run();

  }

}
