export interface AnimateRetrun {
  play: () => void
  stop: () => void
  setFPS: (value: number) => void
}

interface AnimateOption {
  fps?: number
  callback: (t: number) => void
}

export function animate({ fps = 30, callback }: AnimateOption): AnimateRetrun {
  let req = 0
  let then: number = performance.now()
  let interval = 1000 / fps
  let delta: number
  let t = 0

  function step(timestamp: DOMHighResTimeStamp): void {
    req = requestAnimationFrame(step)
    delta = timestamp - then

    if (delta > interval) {
      then = timestamp - (delta % interval)
      callback(++t)
    }
  }

  function play(): void {
    if (req)
      cancelAnimationFrame(req)
    then = performance.now()
    step(then)
  }

  function stop(): void {
    cancelAnimationFrame(req)
    delta = 0
    then = performance.now()
    req = 0
  }

  function setFPS(value: number): void {
    interval = 1000 / value
  }

  return {
    play,
    stop,
    setFPS,
  }
}
