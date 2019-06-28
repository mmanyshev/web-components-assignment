
export class AppComponent extends HTMLElement {

  public readonly root: ShadowRoot;

  constructor(style: string = "", markup: string = "", ) {

    super();

    const templateNode = AppComponent.buildTemplate(style, markup);

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(templateNode.content.cloneNode(true));

  }

  private static buildTemplate = (style: String, markup: String) => {

    const template = document.createElement("template");
    template.innerHTML =`<style>${style}</style>${markup}`;

    return template;

  }

}
