<template>
  <i :class="'x-icon x-icon-' + name" :style="iconStyle">
    <svg aria-hidden="true" style="width: 100%; height: 100%; fill: currentColor; vertical-align: middle;">
      <use :xlink:href="'#x-icon-' + name"></use>
    </svg>
  </i>
</template>

<script>
  export default {
    name: 'x-icon',
    props: {
      name: {
        type: String,
        required: true,
      },
      hoverName: String,
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
          // fontSize: parseInt(this.size) + 'px',
          height: parseInt(this.size) + 'px',
          width: parseInt(this.size) + 'px',
          color: this.color,
          margin: 0,
          padding: 0,
          display: 'inline-block',
          fontWeight: 'normal',
          lineHeight: 1,
          speak: 'none',
          textAlign: 'center',
          textTransform: 'none',
          textRendering: 'auto',
          // verticalAlign: 'middle',
        };
      },
    }
  };
</script>


