
export const buildTemplate = (style: String, markup: String) => {

  const template = document.createElement("template");
  template.innerHTML =`<style>${style}</style>${markup}`;

  return template;

}
