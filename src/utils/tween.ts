import type { easingType } from './easing'
import { easeIn, easeOut, linear } from './easing'

const easingObj = {
  linear,
  easeIn,
  easeOut,
}
export type TweenReturn = (done?: () => void) => number | undefined
export interface TweenOption {
  from: number
  to: number
  duration: number
  easing?: easingType
}
export function tween(params: TweenOption): TweenReturn {
  const { from, to, duration = 1000, easing = 'linear' } = params
  const _easing = easing
  let start = 0
  const during = Math.ceil(duration / 17)
  let hasComple = false

  return function (done: () => void): number | undefined {
    start++
    if (start <= during) {
      return easingObj[_easing](start, from, to - from, during)
    }
    else {
      if (done && !hasComple) {
        hasComple = true
        done()
      }
    }
  }
}
