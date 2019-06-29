
describe("<mm-carousel>", () => {

  it("should be empty initialy", () => {

    document.body.innerHTML = "<mm-carousel></mm-carousel>";

    const carousel = document.querySelector("mm-carousel");
    const carouselWrapper = carousel.shadowRoot.querySelector(".wrapper");

    expect(carouselWrapper.childElementCount).to.be.equal(0);

  });

  it("should render 'items' prop with default slideCard", () => {

    document.body.innerHTML = "<mm-carousel></mm-carousel>";

    const carousel = document.querySelector("mm-carousel");
    const carouselWrapper = carousel.shadowRoot.querySelector(".wrapper");

    carousel.items = [1, 2, 3];
    expect(carouselWrapper.childElementCount).to.be.equal(3);
    expect(carouselWrapper.querySelectorAll("mm-carousel-item").length).to.be.equal(3);

  });

});
