
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

    this.setTitle(value.title);
    this.setAuthors(value.authors);

    this.setImage(value.cover);

  }

  private setTitle(title: string) {

    const titleNode = this.root.querySelector(".title");
    titleNode!.textContent = title;

  }

  private setAuthors(authors: string[]) {

    const authorsListNode = this.root.querySelector(".authors");

    authors.forEach((author) => {

      const listItem = document.createElement("li");
      listItem.textContent = author;

      authorsListNode!.appendChild(listItem);

    });

  }

  private setImage(cover: OpenLibraryCover) {

    const pic = <HTMLImageElement>this.root.querySelector(".cover-picture");

    pic!.dataset.src = cover.large || "";
    pic!.dataset.srcset = `${cover.small} 480w, ${cover.medium} 640w, ${cover.large} 800w`;

  }

  set loaded(value: boolean) {

    if (value) {

      this.setAttribute("loaded", "");
      const image = <HTMLImageElement>this.root.querySelector("img");

      if (image.dataset.src) {
        image.src = image.dataset.src;
      }

      if (image.dataset.srcset) {
        image.srcset = image.dataset.srcset;
      }

      return;

    }

    this.removeAttribute("loaded");

  }

  get loaded() {
    return this.hasAttribute("loaded");
  }

}
