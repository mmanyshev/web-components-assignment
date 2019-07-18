
import { debounce } from "ts-debounce";

import style from "./bookInformatory.css";
import markup from "./bookInformatory.html";

import { performSearch, OpenLibraryBook } from "app/openLibrary";

import { AppComponent } from "app/appComponent";
import { Carousel } from "app/components/carousel";
import { TimePastLabel } from "app/components/timePastLabel";
import { SearchField, EVENTS as SEARCH_EVENTS } from "app/components/searchField";

export class BookInformatory extends AppComponent {

  static TAG_NAME = "mm-book-informatory";

  private readonly carousel: Carousel | null;
  private readonly searchField: SearchField | null;
  private readonly timeLeftLabel: TimePastLabel | null;

  private lastSearchTimestamp: number = 0;

  constructor() {

    super(style, markup);

    this.carousel = this.root.querySelector("mm-carousel");
    this.searchField = this.root.querySelector("mm-search-field");
    this.timeLeftLabel = this.root.querySelector("mm-time-past-label");

    this.search = debounce(this.search, 400);

  }

  // public get tagName() {
  //   return BookInformatory.TAG_NAME;
  // }

  connectedCallback() {

    this.root.addEventListener(
      SEARCH_EVENTS.SEARCH,
      this.onSearch as EventListener,
    );

  }

  disconnectedCalback() {

    this.root.addEventListener(
      SEARCH_EVENTS.SEARCH,
      this.onSearch as EventListener,
    );

  }

  private onSearchDone(items: OpenLibraryBook[]) {

    this.carousel!.items = items;
    this.timeLeftLabel!.since = Date.now();

  }

  private onSearch = (event: CustomEvent) => {
    this.search(event.detail.value);
  }

  private search = (searchString: string) => {

    this.searchField!.loading = true;
    this.lastSearchTimestamp = Date.now();

    return performSearch(searchString, this.lastSearchTimestamp)
      .then((data) => {

        if (data.timestamp < this.lastSearchTimestamp) {
          return;
        }

        this.searchField!.loading = false;
        this.onSearchDone(data.items);

      });

  }

}
