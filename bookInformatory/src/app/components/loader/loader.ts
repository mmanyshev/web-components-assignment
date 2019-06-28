
import style from "./loader.css";
import { AppComponent } from "app/appComponent";

export class Loader extends AppComponent {

  static TAG_NAME = "mm-loader";

  constructor() {
    super(style, "<div class=\"loader\"></div");
  }

}

customElements.define(Loader.TAG_NAME, Loader);
