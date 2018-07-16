# BP Panda
A Vue UI Framework Based on iView

## 使用
`npm i bp-panda --save`

在入口文件，index.js
```js
import Vue from 'vue';
import bpPanda from 'bp-panda';
import '../node_modules/bp-panda/styles/index.less';

Vue.use(bpPanda);
```

## 自定义组件
在 iview 的基础上衍生的自定义组件

### number-input

### search-input

### tag-input

### bp-icon
1. `npm i svg-sprite-loader --save-dev`

2. 加载自定义 svg 资源
```js
Vue.use(bpPanda);
bpPanda.loadSvg(require.context('./static/icon', false, /\.svg$/));
// 注意，传递的 icon 目录必须是字面量形式，不能是变量。
```

3. 使用
```html
<bp-icon name="circle" size="16" color="#ff6600"></bp-icon>
```

### vue-echarts