<template>
  <div class="vue-echarts" :id="id" :style="{width, height, margin: '0 auto'}" @click.prevent.stop='handleClick'>
    <!-- echarts 图表渲染在这里 -->
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/legend';

  export default {
    name: 'vue-echarts',
    props: {
      // 图表容器宽度
      width: {
        type: String,
        required: true,
      },
      // 图表容器最大渲染宽度
      maxWidth: {
        type: String,
      },
      // 图表容器高度
      height: {
        type: String,
        required: true,
      },
      // 图表容器 ID
      id: {
        type: String,
        default: () => {
          return `vue-echarts-${new Date().getTime()}-${Math.random().toString().split('.')[1]}`;
        },
      },
      // echarts 图表具体配置项和数据
      options: {
        type: Object,
        required: true,
      },
      // 是否在组件挂载时立即渲染
      renderOnMounted: {
        type: Boolean,
        default: true,
      },
      // 是否自动 resize
      autoResize: {
        type: Boolean,
        default: true,
      },
    },
    data () {
      return {
        // echarts 实例
        ins: null,
        lock: false,
        // 防止 chrome 下会多次触发 resize 事件
        preventTwiceResize: false,
      };
    },
    mounted () {
      if (this.renderOnMounted) {
        this.render();
      }
      window.addEventListener('resize', this.onresize);
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onresize);
      if (this.ins) {
        // 销毁实例
        this.ins.off('legendselectchanged');
        this.ins.dispose();
        this.ins = null;
      }
    },
    methods: {
      // 监听 window resize 事件
      onresize (e) {
        if (!this.autoResize) return;
        setTimeout(() => {
          if (this.preventTwiceResize) return;
          this.resize();
          
          console.log('>>> ==== vue-echarts resize');
          this.preventTwiceResize = true;
          setTimeout(() => {
            this.preventTwiceResize = false;
          }, 100);
        }, 0);
      },
      render (options) {
        if (!this.ins) {
          this.ins = echarts.init(document.getElementById(this.id));
        }
        this.ins.setOption(options || this.options);

        // In order to solve bug 1011 1025
        this.ins.on('legendselectchanged', () => {
          this.lock = true;
        });
      },
      update () {
        this.render();
        this.resize();
      },
      resize () {
        if (!this.ins) return;
        const containerWidth = Math.floor(parseFloat(window.getComputedStyle(this.ins.getDom()).width));
        // 如果已经超过最大宽度，则不resize
        if (this.maxWidth && parseInt(this.maxWidth) <= containerWidth) return;
        this.ins.resize();
      },
      // 处理点击事件
      handleClick () {
        if (!this.lock) {
          this.$emit('on-click');
        }
        else {
          this.lock = false;
        }
      }
    },
  };
</script>
