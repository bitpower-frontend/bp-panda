import iview from 'iview';
import NumberInput from './components/number-input/index.vue';
import SearchInput from './components/search-input/index.vue';
// import iIcon from './components/i-icon/index.vue';
import TagInput from './components/tag-input/index.vue';
import xIcon from './components/x-icon/index.vue';
import VueEcharts from './components/vue-echarts/index.vue';

const components = {
  NumberInput,
  SearchInput,
  // iIcon,
  TagInput,
  xIcon,
  VueEcharts,
};

iview = {
  ...iview,
  ...components,
};

// override iview install method
const originalInstall = iview.install;
iview.install = function(Vue, opts = {}){
  originalInstall(Vue, opts);
  // install extended components
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

// 加载自定义路径下的 svg 图标
/* function setIcons (iconPath){
  const requireAll = requireContext => requireContext.keys().map(requireContext);
  requireAll(require.context(iconPath, false, /\.svg$/));
} */

module.exports = iview;

