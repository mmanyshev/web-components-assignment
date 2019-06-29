
import { VoiceRecognition } from "./components/voiceRecognition";
import { TimePastLabel } from "./components/timePastLabel";
import { SearchField } from "./components/searchField";
import { CarouselItem } from "./components/carousel/carouselItem";
import { Carousel } from "./components/carousel";
import { BookCard } from "./components/bookCard";
import { BookInformatory } from "./components/bookInformatory";

// console.log("Helo there!", buildTemplate.toString());

customElements.define(VoiceRecognition.TAG_NAME, VoiceRecognition);
customElements.define(TimePastLabel.TAG_NAME, TimePastLabel);
customElements.define(SearchField.TAG_NAME, SearchField);
customElements.define(CarouselItem.TAG_NAME, CarouselItem);
customElements.define(Carousel.TAG_NAME, Carousel);
customElements.define(BookCard.TAG_NAME, BookCard);
customElements.define(BookInformatory.TAG_NAME, BookInformatory);
