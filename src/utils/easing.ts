/**
 * Tween
 * @param t -當前時間
 * @param b -初始值
 * @param c -變化量
 * @param d -持續時間
 */
export function linear(t: number, b: number, c: number, d: number): number {
  return (c * t) / d + b
}
export function easeIn(t: number, b: number, c: number, d: number): number {
  return c * (t /= d) * t * t + b
}
export function easeOut(t: number, b: number, c: number, d: number): number {
  return c * ((t = t / d - 1) * t * t + 1) + b
}

export type easingType = 'linear' | 'easeIn' | 'easeOut'
