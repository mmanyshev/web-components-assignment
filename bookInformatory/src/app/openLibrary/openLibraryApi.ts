
import qs from "querystring";
import { OpenLibraryBook } from "./openLibraryBook";

interface OpenLibrarySearchResult {

  total: number;
  items: OpenLibraryBook[];

  timestamp: number;

}

const BASE_URL = "https://openlibrary.org";
const SEARCH_PAGE_SIZE = 15;

export function performSearch(searchString: string, timestamp: number): Promise<OpenLibrarySearchResult> {

  const query = qs.stringify({
    title: searchString,
    limit: SEARCH_PAGE_SIZE,
  });

  return fetch(`${BASE_URL}/search.json?${query}`)
    .then((response) => response.json())
    .then((response: any) => {

      return {

        total: response.numFound,
        items: response.docs.map((doc: any) => new OpenLibraryBook(doc)),

        timestamp,

      };

    });

}
