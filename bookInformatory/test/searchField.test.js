
describe("<mm-search-field>", () => {

  it("should react to 'loading' attribute", () => {

    document.body.innerHTML = "<mm-search-field></<mm-search-field>";

    const field = document.querySelector("mm-search-field");
    const fieldLoader = field.shadowRoot.querySelector("mm-loader");

    expect(field.loading).to.be.false();
    expect(fieldLoader.hasAttribute("hidden")).to.be.true();

    field.setAttribute("loading", "");

    expect(field.loading).to.be.true();
    expect(fieldLoader.hasAttribute("hidden")).to.be.false();

  });

  it("should reflect 'loading' props", () => {

    document.body.innerHTML = "<mm-search-field></<mm-search-field>";

    const field = document.querySelector("mm-search-field");
    const fieldLoader = field.shadowRoot.querySelector("mm-loader");

    field.loading = true;

    expect(field.hasAttribute("loading")).to.be.true();
    expect(fieldLoader.hasAttribute("hidden")).to.be.false();

    field.loading = false;

    expect(field.hasAttribute("loading")).to.be.false();
    expect(fieldLoader.hasAttribute("hidden")).to.be.true();

  });

  it("should dispatch custom 'search' event", (done) => {

    document.body.innerHTML = "<div><mm-search-field></<mm-search-field></div>";

    const field = document.querySelector("mm-search-field");
    const fieldInput = field.shadowRoot.querySelector("input");

    document.querySelector("div").addEventListener("SEARCH_FIELD_SEARCH", (event) => {

      expect(event.detail.value).to.be.equal("Game of Thrones");
      done();

    });

    fieldInput.value = "Game of Thrones";
    fieldInput.dispatchEvent(new Event("change"), { bubbles: true });

  });

});
