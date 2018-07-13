<!-- 
@author: Hisheng
@description: app 自身的 icon，区别于 iview 自带的 Icon 组件
@last-update: 2018/03/29
@usage: http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code
 -->
<template>
  <i :class="'iconfont i-icon icon-' + name" :style ="iconStyle"></i>
</template>

<script>
  export default {
    name: 'i-icon',
    props: {
      // icon 的类名
      name: {
        type: String,
        required: true,
      },
      // icon 大小
      size: {
        type: [Number, String],
        default: 14,
      },
      // icon 颜色
      color: {
        type: String,
        default: '#444444',
      },
    },
    computed: {
      iconStyle (){
        return {
          fontSize: this.size + 'px',
          color: this.color,
          margin: 0,
          padding: 0,
          display: 'inline-block',
          fontWeight: 'normal',
          lineHeight: 1,
          speak: 'none',
          textTransform: 'none',
          textRendering: 'auto',
          verticalAlign: 'middle',
        };
      }
    }
  };
</script>