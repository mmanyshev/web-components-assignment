
import { AppComponent } from "app/appComponent";
import { ICarouselSlideCard } from "..";

export class CarouselItem extends AppComponent {

  static TAG_NAME = "mm-carousel-item";
  private slideCard: ICarouselSlideCard | null = null;

  public createSlide(tagName: string, data: any) {

    this.slideCard = <ICarouselSlideCard>document.createElement(tagName);

    // I should put slides in <slot />
    // most probably, but not today...
    this.slideCard.data = data;
    this.root.appendChild(this.slideCard);

  }

  set loaded(value: boolean) {

    if (!this.slideCard) {
      return;
    }

    this.slideCard.loaded = value;

  }

  get loaded() {
    return Boolean(this.slideCard && this.slideCard.loaded);
  }

}
