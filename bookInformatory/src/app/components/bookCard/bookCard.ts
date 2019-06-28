
import style from "./bookCard.css";
import markup from "./bookCard.html";

import { AppComponent } from "app/appComponent";
import { OpenLibraryBook, OpenLibraryCover } from "app/openLibrary";
import { ICarouselSlideCard } from "app/components/carousel";

export class BookCard extends AppComponent implements ICarouselSlideCard {

  public static TAG_NAME = "mm-book-card";

  constructor() {
    super(style, markup);
  }

  set data(value: OpenLibraryBook) {

    console.log(value);

    this.setTitle(value.title);
    this.setAuthors(value.authors);

    this.setImage(value.cover);

  }

  private setTitle(title: string) {

    const titleNode = this.root.querySelector(".title");

    if (!titleNode) {
      return;
    }

    titleNode.textContent = title;

  }

  private setAuthors(authors: string[]) {

    const authorsListNode = this.root.querySelector(".authors")

    if (!authorsListNode) {
      return;
    }

    authors.forEach((author) => {

      const listItem = document.createElement("li");
      listItem.textContent = author;

      authorsListNode.appendChild(listItem);

    });

  }

  private setImage(cover: OpenLibraryCover) {

    const pic = <HTMLImageElement>this.root.querySelector(".cover-picture");

    if (!pic) {
      return;
    }

    pic.dataset.src = cover.large || "";
    pic.dataset.srcset = `${cover.small} 480w, ${cover.medium} 600w, ${cover.large} 800w`;

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
      image.srcset = image.dataset.srcset || "";
      return;

    }

    this.removeAttribute("loaded");

  }

  get loaded() {
    return this.hasAttribute("loaded");
  }

}

customElements.define(BookCard.TAG_NAME, BookCard);
