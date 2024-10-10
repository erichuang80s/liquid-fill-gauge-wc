import type { PropertyValues } from 'lit'
import { LitElement, css, svg } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { generateSineWave } from './utils/sineWave'
import clamp from './utils/clamp'
import { type TweenReturn, tween } from './utils/tween'
import { type AnimateRetrun, animate } from './utils/animate'
import { scale } from './utils/scale'

@customElement('liquid-fill-gauge')
export class LiquidFillGauge extends LitElement {
  @query('#wave-path', true)
  _wavePath: SVGPathElement

  @query('#value-group', true)
  _valueGroup: SVGAElement

  @property({ type: Number }) width?: number = 256
  @property({ type: Number }) height?: number = 256
  @property({ type: Number }) min: number = 0
  @property({ type: Number }) max: number = 100
  @property({ type: String }) unit: string = ''

  static styles = css`
    :host {
      --liguid-fill-color: #38bdf8;
      --liguid-fill-backward-color: white;
      --liguid-fill-forward-color: white;
      --liguid-fill-text-size: 1.5rem;    
      --liguid-fill-text-color: black;    
      --liguid-fill-overlay-text-color: white;    
      --liguid-fill-unit-text-size: 1rem;   

      display: inline-flex;
      color: #38bdf8;
      box-sizing: border-box;      
      font-size: 1rem;
      overflow-clip-margin: context-box;
    }

    :host .liguid-fill {
      fill: var(--liguid-fill-color);
    }
    

    :host .liguid-fill-text {
      font-size: var(--liguid-fill-text-size);
      font-family: sans-serif;
      font-weight: bold;
      transform: translate(50%, 50%);
    }

    ::slotted(*),
    :host foreignObject {
      width: 100%;
      height: 100%;
    }

    .clp {
      clip-path: url(#clipPathWave);
    }

  `
  private _phaseShift: number = 1
  private _isFirstRender: boolean = false
  private _translateX: number
  private _translateY: number
  private _beforeY: number = 0
  private _stateValue: number = 0
  private _beforeValue: number = 0
  private _insideWidth: number = 10
  private _animate: AnimateRetrun | void
  private _tweenX: TweenReturn | void
  private _tweenY: TweenReturn | void
  private _tweenValue: TweenReturn | void
  private _scaleValue: (num: number) => number

  private _fps = 30
  @property({ type: Number })
  get fps() {
    return this._fps
  }

  set fps(v: number) {
    this._fps = v
    if (this._animate) {
      this._animate.stop()
      this._setupAnimate()
    }
  }

  private _frequency = 0.02
  @property({ type: Number })
  get frequency() {
    return this._frequency
  }

  set frequency(v: number) {
    this._frequency = v
    this._updateWavePath()
  }

  // 週期
  get period() {
    return 2 * Math.PI / this.frequency
  }

  private _amplitude = 12
  @property({ type: Number })
  get amplitude() {
    return this._amplitude
  }

  set amplitude(v: number) {
    this._amplitude = v
    this._updateWavePath()
  }

  private _value: number = 0
  @property({ type: Number })
  set value(v) {
    this._value = Number(v)
    if (this._isFirstRender) {
      this._setupYTween()
      this._setupValueTween()
      this.dispatchEvent(new Event('change', { composed: true }))
    }
  }

  get value() {
    return this._value
  }

  get fullValue() {
    return this.height - this.amplitude - this._insideWidth
  }

  private _setupAnimate() {
    this._animate = animate({
      fps: this.fps,
      callback: () => {
        if (this._tweenX) {
          const x = this._tweenX()

          if (!x)
            this._setupXTween()

          this._translateX = x
        }

        if (this._tweenY) {
          let y = this._tweenY()

          if (!y)
            y = this._beforeY

          this._translateY = y
        }

        if (this._tweenValue) {
          let v = this._tweenValue()
          if (!v)
            v = this._beforeValue
          this._stateValue = Number(v.toFixed(2))
        }

        this._wavePath.setAttribute('transform', `translate(${this._translateX} ${this._translateY})`)
        for (const text of this._valueGroup.children) {
          text.textContent = `${this._stateValue}${this.unit}`
        }
      },
    })

    this._animate.play()
  }

  private _updateWavePath() {
    const { width, height, amplitude, _phaseShift, frequency, period } = this
    const d = generateSineWave({ width: width + period, height, phaseShift: _phaseShift, amplitude, frequency })
    this._wavePath.setAttribute('d', d)
  }

  private _setupScale() {
    this._scaleValue = scale([this.min, this.max], [(this.fullValue), 0])
  }

  private _setupXTween() {
    this._tweenX = tween({
      from: -this.period,
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

  resize(w: number, h: number) {
    this.width = w || this.width
    this.height = h || this.height
    this._updateWavePath()
    this._setupScale()
    this._setupXTween()
    this._setupYTween()
    this._setupValueTween()
    this._setupAnimate()
  }

  connectedCallback(): void {
    super.connectedCallback()
    this._setupScale()

    this._beforeY = this.fullValue
    this._translateY = this.fullValue
    this._translateX = 0

    this._setupXTween()
    this._setupYTween()
    this._setupValueTween()

    this._setupAnimate()

    this._isFirstRender = true
  }

  firstUpdated() {
    this._updateWavePath()
  }

  disconnectedCallback() {
    if (this._animate)
      this._animate.stop()
  }

  render() {
    const { width, height, _translateX, _translateY, _insideWidth } = this
    const halfWidth = width / 2
    const halfHeight = height / 2

    const wavePath = svg/* svg */`<path id="wave-path" transform="translate(${_translateX} ${_translateY})"></path>`

    const content = svg/* svg */`
      <g class="liguid-fill" style="transform: translate(50%, 50%);">    
        <circle cx="0" cy="0" r="${halfWidth - 4}" fill="var(--liguid-fill-backward-color)" stroke="var(--liguid-fill-color)" stroke-width="4"></circle>
        <circle cx="0" cy="0" r="${halfWidth - _insideWidth}" fill="var(--liguid-fill-forward-color)"></circle>
        <circle cx="0" cy="0" r="${halfWidth - _insideWidth}" clip-path="url(#clipPathWave)"></circle>
      </g>
    `

    return svg/* svg */`
      <svg 
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
      >
        <defs>
          <clipPath id="clipPathWave" transform="translate(${-halfWidth} ${-halfHeight})">
            ${wavePath}
          </clipPath>
        </defs>
        ${content}
        <g class="liguid-fill-text" part="text-wrap" id="value-group">
          <text stroke="none" text-anchor="middle" fill="var(--liguid-fill-text-color)" dy="0">
            ${this._stateValue}
          </text>
          <text stroke="none" text-anchor="middle" fill="var(--liguid-fill-overlay-text-color)" dy="0" clip-path="url(#clipPathWave)">
            ${this._stateValue}
          </text>
        </g>
      </svg>
    `
  }
}
