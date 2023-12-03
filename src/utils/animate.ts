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
  let now: number
  let then: number = Date.now()
  let interval = 1000 / fps
  let delta: number
  let t = 0

  function step(): void {
    req = requestAnimationFrame(step)
    now = Date.now()
    delta = now - then

    if (delta > interval) {
      then = now - (delta % interval)
      t++
      callback(t)
    }
  }

  function play(): void {
    step()
  }

  function stop(): void {
    cancelAnimationFrame(req)
    now = 0
    delta = 0
    then = Date.now()
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
