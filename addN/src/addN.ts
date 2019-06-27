
export function addN(n: number): (val: number) => number {

  return function (val) {
    return val + n;
  }

}
