import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { generateSineWave } from './utils/sineWave'
import clamp from './utils/clamp'
import { type TweenReturn, tween } from './utils/tween'
import { type AnimateRetrun, animate } from './utils/animate'
import { scale } from './utils/scale'

@customElement('liquid-fill-gauge')
export class WaveSvg extends LitElement {
  static styles = css`
    :host {
      font-size: 1rem;
      overflow-clip-margin: context-box;
      --liguid-fill-color: #38bdf8;
      --liguid-fill-font-size: 2rem;    
      --liguid-fill-font-color: black;    
      --liguid-fill-overlay-font-color: white;    
    }

    :host {
      color: #38bdf8;
      border: solid 1px black;
      display: inline-flex;
      box-sizing: border-box;
    }

    :host .liguid-fill {
      fill: var(--liguid-fill-color);
    }

    :host .liguid-fill-text {
      font-size: var(--liguid-fill-font-size);
      font-family: sans-serif;
      font-weight: bold;
    }
    :host .liguid-fill-text.overlay {
    }
  `
  private _animate: AnimateRetrun | void
  private _tweenX: TweenReturn | void
  private _tweenY: TweenReturn | void
  private _tweenValue: TweenReturn | void
  private _scaleValue: (num: number) => number
  private _slotCount: number

  @property({ type: Number })
  width?: number = 256

  @property({ type: Number })
  height?: number = 256

  @property({ type: Number })
  amplitude: number = 12

  @property({ type: Number })
  frequency: number = 0.02

  @property({ type: Number })
  phaseShift: number = 1

  @property({ type: Number })
  value: number = 10

  @property({ type: Number })
  min: number = 0

  @property({ type: Number })
  max: number = 100

  @state()
  private _translateX: number

  @state()
  private _translateY: number

  @state()
  private _beforeY: number = 0

  @state()
  private _value: number = 0

  @state()
  private _beforeValue: number = 0

  @state()
  // 週期
  private _period = 2 * Math.PI / this.frequency

  get fullValue() {
    return this.height - this.amplitude
  }

  constructor() {
    super()
    this._slotCount = this.childElementCount
  }

  connectedCallback(): void {
    super.connectedCallback()

    this._setupScale()

    this._translateY = this.fullValue
    this._beforeY = this.fullValue
    this._translateX = 0

    this._setupXTween()
    this._setupYTween()
    this._setupValueTween()

    this._animate = animate({
      callback: () => {
        if (this._tweenX) {
          const x = this._tweenX()

          if (!x)
            this._setupXTween()

          this._translateX = x
        }

        if (this._tweenY) {
          let y = this._tweenY(() => {
            this.dispatchEvent(new CustomEvent('liguid-fill-updated'))
          })

          if (!y)
            y = this._beforeY

          this._translateY = y
        }

        if (this._tweenValue) {
          let v = this._tweenValue()
          if (!v)
            v = this._beforeValue
          this._value = Math.ceil(v)
        }
      },
    })
    this._animate.play()
  }

  private _setupScale() {
    this._scaleValue = scale([this.min, this.max], [(this.fullValue), 0])
  }

  private _setupXTween() {
    this._tweenX = tween({
      from: -this._period,
      to: 0,
      duration: 1000,
    })
  }

  private _setupYTween() {
    const clampValue = clamp(this.value, this.min, this.max)
    const to = this._scaleValue(clampValue)
    this._tweenY = tween({
      from: this._beforeY,
      to: this._scaleValue(clampValue),
      duration: 750,
    })

    this._beforeY = to
  }

  private _setupValueTween() {
    const clampValue = clamp(this.value, this.min, this.max)
    this._tweenValue = tween({
      from: this._beforeValue,
      to: clampValue,
      duration: 750,
    })
    this._beforeValue = clampValue
  }

  setValue(val: number) {
    this.value = val
    this._setupYTween()
    this._setupValueTween()
  }

  resize(w: number, h: number) {
    this.width = w
    this.height = h
    this._setupScale()
    this._setupXTween()
    this._setupYTween()
    this._setupValueTween()
  }

  render() {
    const { width, height, amplitude, phaseShift, frequency, _translateX, _translateY, _period } = this
    const halfWidth = width / 2
    const halfHeight = height / 2

    const d = generateSineWave({ width: width + _period, height, phaseShift, amplitude, frequency })

    return html`
      <svg 
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
      >
        <defs>
          <clipPath id="clipPathWave" transform="translate(${-halfWidth} ${-halfHeight})">
            <path d="${d}" transform="translate(${_translateX} ${_translateY})"></path>
          </clipPath>
        </defs>
        <g transform="translate(${halfWidth}, ${halfHeight})">
          <g class="liguid-fill">
            <circle r="${halfWidth}" fill="none" stroke="var(--liguid-fill-color)" stroke-width="3"></circle>
            <circle cx="0" cy="0" r="${halfWidth - 4}" clip-path="url(#clipPathWave)" ></circle>
          </g>
          <g>
            <text stroke="none" class="liguid-fill-text" text-anchor="middle" fill="var(--liguid-fill-font-color)" dy="${halfHeight * 0.1}">${this._value}</text>
            <text stroke="none" class="liguid-fill-text" text-anchor="middle" fill="var(--liguid-fill-overlay-font-color)" dy="${halfHeight * 0.1}" clip-path="url(#clipPathWave)">${this._value}</text>
          </g>
        </g>
      </svg>
    `
  }
}
