
describe("<mm-time-past-label>", () => {

  before(() => {
    document.body.innerHTML = "";
  })

  it("renders default label", () => {

    document.body.innerHTML = "<mm-time-past-label></mm-time-past-label>";

    const label = document.querySelector("mm-time-past-label");
    expect(label.shadowRoot.textContent).to.contain("Last search was performed: -");

  });

  it("renders label accordingly 'since' attribute", () => {

    const now = Date.now();

    document.body.innerHTML =
      `<mm-time-past-label since="${now}"></mm-time-past-label>`;

    const label = document.querySelector("mm-time-past-label");

    expect(label.getAttribute("since")).to.be.equal(now.toString());
    expect(label.shadowRoot.textContent).to.match(/Last search was performed:\.*?\s+0\s+/);

    label.removeAttribute("since");
    expect(label.shadowRoot.textContent).to.contain("Last search was performed: -");

  });

  it("react to 'since' prop and reflect it in the attribute", () => {

    const now = Date.now();

    document.body.innerHTML =
      `<mm-time-past-label since="${now}"></mm-time-past-label>`;

    const label = document.querySelector("mm-time-past-label");
    label.since = Date.now();

    expect(label.getAttribute("since")).to.be.equal(now.toString());
    expect(label.shadowRoot.textContent).to.match(/Last search was performed:\.*?\s+0\s+/);

  });

  it("reflect seconds if 'now' - 'since' < 1 min", () => {

    const now = Date.now() - 35e3;

    document.body.innerHTML =
      `<mm-time-past-label since="${now}"></mm-time-past-label>`;

    const label = document.querySelector("mm-time-past-label");
    const [ labelPeriod ] = label.shadowRoot.textContent.match(/\d{2}/);

    expect(labelPeriod).to.be.equal("35");

  });

  it("reflect minutes if 'now' - 'since' < 1 hour", () => {

    const now = Date.now() - 5 * 60 * 1e3;

    document.body.innerHTML =
      `<mm-time-past-label since="${now}"></mm-time-past-label>`;

    const label = document.querySelector("mm-time-past-label");
    const [ labelPeriod ] = label.shadowRoot.textContent.match(/\d{1}/);

    expect(labelPeriod).to.be.equal("5");

  });

  it("reflect hours if 'now' - 'since' < 1 day", () => {

    const now = Date.now() - 10 * 60 * 60 * 1e3;

    document.body.innerHTML =
      `<mm-time-past-label since="${now}"></mm-time-past-label>`;

    const label = document.querySelector("mm-time-past-label");
    const [ labelPeriod ] = label.shadowRoot.textContent.match(/\d{2}/);

    expect(labelPeriod).to.be.equal("10");

  });

  it("reflect days if 'now' - 'since' >= 1 day", () => {

    const now = Date.now() - 5 * 24 * 60 * 60 * 1e3;

    document.body.innerHTML =
      `<mm-time-past-label since="${now}"></mm-time-past-label>`;

    const label = document.querySelector("mm-time-past-label");
    const [ labelPeriod ] = label.shadowRoot.textContent.match(/\d{1}/);

    expect(labelPeriod).to.be.equal("5");

  });

  it("should auto-update label", (done) => {

    const now = Date.now();

    document.body.innerHTML =
      `<mm-time-past-label since="${now}"></mm-time-past-label>`;

    const label = document.querySelector("mm-time-past-label");

    setTimeout(() => {

      const [ labelPeriod ] = label.shadowRoot.textContent.match(/\d{1}/);
      expect(Number(labelPeriod)).to.be.lessThan(10);

      done();

    }, 10e3);

  });

});
