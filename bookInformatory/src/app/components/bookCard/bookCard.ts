
import style from "./bookCard.css";
import markup from "./bookCard.html";

import { AppComponent } from "app/appComponent";
import { OpenLibraryBook } from "app/openLibrary/openLibraryBook";

export class BookCard extends AppComponent {

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
      pic.src = value.cover.large || "";
    }

  }

}

customElements.define(BookCard.TAG_NAME, BookCard);
