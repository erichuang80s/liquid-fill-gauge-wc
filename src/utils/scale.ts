export function scale(domain: number[], range: number[]): (num: number) => number {
  return function (num) {
    return ((num - domain[0]) * (range[1] - range[0])) / (domain[1] - domain[0]) + range[0]
  }
}
