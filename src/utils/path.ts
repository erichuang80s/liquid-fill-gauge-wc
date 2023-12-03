export default class Path {
  _x0: number | null
  _x1: number | null
  _y0: number | null
  _y1: number | null
  _: string
  constructor() {
    this._x0 = this._y0 = this._x1 = this._y1 = null
    this._ = ''
  }

  moveTo(x: number, y: number) {
    this._ = `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`
  }

  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0
      this._y1 = this._y0
      this._ += 'Z'
    }
  }

  lineTo(x: number, y: number) {
    this._ += `L${this._x1 = +x},${this._y1 = +y}`
  }

  toString() {
    return this._
  }
}
