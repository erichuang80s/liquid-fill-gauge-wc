# liquid-fill-gauge-wc

使用 [Lit](https://lit.dev/) 建構的 web component 的水位儀表
參考 [D3 Liquid Fill Gauge](https://gist.github.com/brattonc/5e5ce9beee483220e2f6)

## Installation

Node 環境

```bash
  npm i liquid-fill-gauge 
```

瀏覽器

```html
  <script src="https://cdn.jsdelivr.net/gh/erichuang80s/liquid-fill-gauge-wc@master/dist/liquidFillGauge.min.js"></script>
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

| Name       | Description | Reflects | Type   |
| ---------- | ----------- | -------- | ------ |
| width      | SVG 寬度    | ✓       | number |
| height     | SVG 高度    | ✓       | number |
| amplitude  | 振幅        | ✓       | number |
| frequency  | 频率        | ✓       | number |
| phaseShift | 相位偏移    | ✓       | number |
| value      | 目前值      | ✓       | number |
| min        | 最小值      | ✓       | number |
| max        | 最大值      | ✓       | number |
| unit       | 單位        | ✓       | string |

## Slots

| Name    | Description                       |
| ------- | --------------------------------- |
| outward | 自訂外框容器形狀                  |
| inward  | 自訂液體形狀，會被 clip-path 遮罩 |

## Part

| Name        | Description               |
| ----------- | ------------------------- |
| liguid-wrap | liguid element parent     |
| text-wrap   | value text element parent |

## Event

* change\
目前值改變後觸發。
