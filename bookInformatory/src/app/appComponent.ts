
const templateCache = new Map<string, HTMLTemplateElement>();

export class AppComponent extends HTMLElement {

  public readonly root: ShadowRoot;

  constructor(style: string = "", markup: string = "") {

    super();

    const templateNode = this.getTemplate(style, markup);

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(templateNode.content.cloneNode(true));

  }

  private static buildTemplate = (style: String, markup: String): HTMLTemplateElement => {

    const template = document.createElement("template");
    template.innerHTML = `<style>${style}</style>${markup}`;

    return template;

  }

  private getTemplate(style: string = "", markup: string = ""): HTMLTemplateElement {

    if (templateCache.has(this.tagName)) {
      return templateCache.get(this.tagName)!;
    }

    const templateNode = AppComponent.buildTemplate(style, markup);
    templateCache.set(this.tagName, templateNode);

    return templateNode;

  }

}
