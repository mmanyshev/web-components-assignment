
import { debounce } from "ts-debounce";

import style from "./bookInformatory.css";
import markup from "./bookInformatory.html";

import { OpenLibraryBook } from "app/openLibrary/openLibraryBook";

import { Carousel } from "app/components/carousel";
import { SearchField } from "app/components/searchField";

import { buildTemplate } from "app/utils/buildTemplate";
import { performSearch } from "app/openLibrary/openLibraryApi";

const template = buildTemplate(style, markup);

export class BookInformatory extends HTMLElement {

  static TAG_NAME = "mm-book-informatory";
  public readonly root: ShadowRoot;

  private readonly carousel: Carousel | null;
  private readonly searchField: SearchField | null;
  private readonly timeLeftLabel: HTMLElement | null;

  private lastSearchTimestamp: number = 0;

  constructor() {

    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));

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

  connectedCallback() {

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
