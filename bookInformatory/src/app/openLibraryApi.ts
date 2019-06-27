
const BASE_URL = "";

export function performSearch(searchString) {

  return fetch(`${BASE_URL}?`)
    .then((response) => response.json());

}
