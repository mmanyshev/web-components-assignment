
import { buildTemplate } from "app/utils/buildTemplate";
import { performSearch } from "./openLibrary/openLibraryApi";

console.log("Helo there!", buildTemplate.toString());

performSearch("Pride prejudice")
  .then((data) => {
    console.log(data.items);
  });
