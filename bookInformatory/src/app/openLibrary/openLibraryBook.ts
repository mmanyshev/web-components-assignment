
const COVERS_BASE_URL = "http://covers.openlibrary.org/b";

interface OpenLibraryCover {

  readonly small?: string;
  readonly medium?: string;
  readonly large?: string;

}

function pickCoverParams(doc: any): string[] | null {

  if (doc.cover_edition_key) {
    return ["olid", doc.cover_edition_key];
  }

  if (doc.isbn && doc.isbn.length) {
    return ["isbn", doc.isbn[0]];
  }

  return null;

}

function buildSingleCoverUrl(idKey: string, id: string, size: string) {
  return `${COVERS_BASE_URL}/${idKey}/${id}-${size}.jpg`;
}

function buildCoverUrls(doc: any): OpenLibraryCover {

  const coverParams = pickCoverParams(doc);

  if (!coverParams) {
    return {};
  }

  const [ idKey, id ] = coverParams;

  return {
    small: buildSingleCoverUrl(idKey, id, "S"),
    medium: buildSingleCoverUrl(idKey, id, "M"),
    large: buildSingleCoverUrl(idKey, id, "L"),
  };

}

export class OpenLibraryBook {

  public readonly title: string;
  public readonly authors: string[];

  public readonly cover: OpenLibraryCover;

  constructor(doc: any) {

    this.title = doc.title;
    this.authors = doc.author_name || [];

    this.cover = buildCoverUrls(doc);

  }

}
