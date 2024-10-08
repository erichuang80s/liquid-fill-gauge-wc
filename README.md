# liquid-fill-gauge-wc

使用 [Lit](https://lit.dev/) 建構 web component 的水位儀表
參考 [D3 Liquid Fill Gauge](https://gist.github.com/brattonc/5e5ce9beee483220e2f6)

## Installation

Node 環境

```bash
  npm i liquid-fill-gauge-wc
```

瀏覽器

```html
  <script src="https://cdn.jsdelivr.net/npm/liquid-fill-gauge-wc@latest/dist/liquidFillGauge.min.js"></script>
```

## Examples

```html

  <liquid-fill-gauge
    width="200"
    height="200"
    min="0"
    max="100"
    value="55"
    amplitude="2"
  ></liquid-fill-gauge>

```

[DEMO](https://codepen.io/erichuang80s/pen/jOdxXxK?editors=1010)

## Properties

| Name       | Description | Type   |
| ---------- | ----------- | ------ |
| width      | SVG 寬度    | number |
| height     | SVG 高度    | number |
| amplitude  | 振幅        | number |
| frequency  | 频率        | number |
| value      | 目前值      | number |
| min        | 最小值      | number |
| max        | 最大值      | number |
| unit       | 單位        | string |
| fps        | 動畫速度    | number |

## CSS Variable

```css
  /* Default */
  --liguid-fill-color: #38bdf8;
  --liguid-fill-backward-color: white;
  --liguid-fill-forward-color: white;
  --liguid-fill-text-size: 2rem;
  --liguid-fill-text-color: black;
  --liguid-fill-overlay-text-color: white;
  --liguid-fill-unit-text-size: .85rem;
```

## Event

* change\
目前值改變後觸發。
