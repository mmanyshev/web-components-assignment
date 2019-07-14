
export function addN(n: number): (val: number) => number {
  return (val) => val + n;
}
