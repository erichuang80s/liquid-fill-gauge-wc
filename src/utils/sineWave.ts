import Path from './path'

/**
 * @prop amplitude 振幅
 * @prop frequency  频率
 * @prop phaseShift   相位偏移
 */
export interface WaveOptions {
  width?: number
  height?: number
  phaseShift?: number
  amplitude?: number
  frequency?: number
}

export function generateSineWave(input: WaveOptions): string {
  const defOption: WaveOptions = {
    width: 100,
    height: 100,
    phaseShift: 0,
    amplitude: 1,
    frequency: 1,
  }
  const { width, height, phaseShift, amplitude, frequency } = Object.assign(defOption, input)
  const path = new Path()
  path.moveTo(0, height)

  for (let x = 0; x <= width; x++) {
    const y = amplitude * Math.sin(frequency * x + phaseShift)
    path.lineTo(x, y)
  }

  path.lineTo(width, height)
  path.closePath()

  return path.toString()
}
