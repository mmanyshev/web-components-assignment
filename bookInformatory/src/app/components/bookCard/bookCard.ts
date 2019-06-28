
import style from "./bookCard.css";
import markup from "./bookCard.html";

import { AppComponent } from "app/appComponent";
import { OpenLibraryBook } from "app/openLibrary/openLibraryBook";
import { ICarouselSlideCard } from "app/components/carousel";

export class BookCard extends AppComponent implements ICarouselSlideCard {

  public static TAG_NAME = "mm-book-card";

  constructor() {
    super(style, markup);
  }

  set data(value: OpenLibraryBook) {

    console.log(value);

    const title = this.root.querySelector(".title");
    if (title) {
      title.textContent = value.title;
    }

    const pic = <HTMLImageElement>this.root.querySelector(".cover-picture");
    if (pic) {
      pic.dataset.src = value.cover.large || "";
    }

  }

  set loaded(value: boolean) {

    console.log("loaded", value);

    if (value) {

      this.setAttribute("loaded", "");
      const image = <HTMLImageElement>this.root.querySelector("img");

      if (!image.dataset.src) {
        return;
      }

      image.src = image.dataset.src;
      return;

    }

    this.removeAttribute("loaded");

  }

  get loaded() {
    return this.hasAttribute("loaded");
  }

}

customElements.define(BookCard.TAG_NAME, BookCard);
