
export function updateComponentProp(componentInstance: any, prop: string) {

  if (!componentInstance.hasOwnProperty(prop)) {
    return;
  }

  const value = componentInstance[prop];
  delete componentInstance[prop];

  componentInstance[prop] = value;

}
