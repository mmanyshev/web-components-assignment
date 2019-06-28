
export const buildTemplate = (style: String, markup: String) => {

  const template = document.createElement("template");

  const styleMarkup = style ? `<style>${style}</style>` : "";
  template.innerHTML =`${styleMarkup}${markup}`;

  return template;

}
