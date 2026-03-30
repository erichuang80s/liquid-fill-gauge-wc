# liquid-fill-gauge-wc

A liquid fill gauge Web Component built with [Lit](https://lit.dev/), inspired by [D3 Liquid Fill Gauge](https://gist.github.com/brattonc/5e5ce9beee483220e2f6).

**No D3 dependency.** Works in any framework (Vue, React, Angular) or plain HTML.

👉 [Live Demo](https://codepen.io/erichuang80s/pen/jOdxXxK?editors=1010)

---

## Installation

**npm**

```bash
npm i liquid-fill-gauge-wc
```

**CDN (Browser)**

```html
<script src="https://cdn.jsdelivr.net/npm/liquid-fill-gauge-wc@latest/dist/liquidFillGauge.min.js"></script>
```

---

## Usage

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

**Vue 3**

```vue
<liquid-fill-gauge :value="percentage" unit="%" />
```

---

## Properties

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `width` | SVG 寬度（px） | `number` | `200` |
| `height` | SVG 高度（px） | `number` | `200` |
| `value` | 目前值 | `number` | `0` |
| `min` | 最小值 | `number` | `0` |
| `max` | 最大值 | `number` | `100` |
| `unit` | 顯示單位（如 `%`、`°C`） | `string` | `''` |
| `amplitude` | 波浪振幅 | `number` | `2` |
| `frequency` | 波浪頻率 | `number` | `2` |
| `fps` | 動畫幀率 | `number` | `30` |

---

## CSS Variables

透過 CSS Variables 自訂外觀，所有變數皆有預設值，可視需求覆蓋。

```css
liquid-fill-gauge {
  --liquid-fill-color: #38bdf8;           /* 液體顏色 */
  --liquid-fill-backward-color: white;    /* 後層波浪顏色 */
  --liquid-fill-forward-color: white;     /* 前層波浪顏色 */
  --liquid-fill-text-size: 2rem;          /* 數值字體大小 */
  --liquid-fill-text-color: black;        /* 數值顏色（液體外） */
  --liquid-fill-overlay-text-color: white;/* 數值顏色（液體內） */
  --liquid-fill-unit-text-size: .85rem;   /* 單位字體大小 */
}
```

---

## Events

### `change`

當 `value` 改變時觸發。

```js
const gauge = document.querySelector('liquid-fill-gauge')

gauge.addEventListener('change', (e) => {
  console.log(e.detail) // 目前值
})
```

---

## Browser Support

支援所有現代瀏覽器（Custom Elements v1）。
