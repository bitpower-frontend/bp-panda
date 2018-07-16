import iView from 'iview';
// 自定义的组件
import iIcon from './components/i-icon/index.vue';
import xIcon from './components/x-icon/index.vue';
import TagInput from './components/tag-input/index.vue';
import VueEcharts from './components/vue-echarts/index.vue';
import NumberInput from './components/number-input/index.vue';
import SearchInput from './components/search-input/index.vue';

const components = {
  iIcon,
  XIcon: iIcon,
  xIcon,
  BpIcon: xIcon,
  TagInput,
  VueEcharts,
  NumberInput,
  SearchInput,
};

const bpPanda = {
  ...iView,
  ...components,
};

// load svg resource
// 加载自定义路径下的 svg 图标
bpPanda.loadSvg = function (requireContext) {
  requireContext.keys().map(requireContext);
};

// override iview install method
// 注册自定义组件
const originalInstall = bpPanda.install;
bpPanda.install = function (Vue, opts = {}) {
  originalInstall(Vue, opts);
  // install extended components
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

export default bpPanda;

