
import { debounce } from "ts-debounce";

import style from "./bookInformatory.css";
import markup from "./bookInformatory.html";

import { performSearch, OpenLibraryBook } from "app/openLibrary";

import { AppComponent } from "app/appComponent";
import { Carousel } from "app/components/carousel";
import { SearchField } from "app/components/searchField";

export class BookInformatory extends AppComponent {

  static TAG_NAME = "mm-book-informatory";

  private readonly carousel: Carousel | null;
  private readonly searchField: SearchField | null;
  private readonly timeLeftLabel: HTMLElement | null;

  private lastSearchTimestamp: number = 0;

  constructor() {

    super(style, markup);

    this.carousel = this.root.querySelector("mm-carousel");
    this.searchField = this.root.querySelector("mm-search-field");
    this.timeLeftLabel = this.root.querySelector("mm-time-past-label");

    this.search = debounce(this.search.bind(this), 500);

    this.root.addEventListener("search-field:change", (event: any) => {

      const value = event.detail && event.detail.value;
      console.log("search-field:change", event);
      this.search(value);

    });

  }

  private onSearchDone(items: OpenLibraryBook[]) {

    if (this.timeLeftLabel) {

      const now = Date.now().toString();
      this.timeLeftLabel.setAttribute("since", now);

    }

    if (this.carousel) {
      this.carousel.items = items;
    }

  }

  private setLoading(value: boolean) {

    if (!this.searchField) {
      return;
    }

    this.searchField.loading = value;

  }

  private search(searchString: string) {

    this.setLoading(true);
    this.lastSearchTimestamp = Date.now();

    return performSearch(searchString, this.lastSearchTimestamp)
      .then((data) => {

        if (data.timestamp < this.lastSearchTimestamp) {
          return;
        }

        this.setLoading(false);
        this.onSearchDone(data.items);

      });

  }

}

customElements.define(BookInformatory.TAG_NAME, BookInformatory);
