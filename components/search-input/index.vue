<!-- 
  自定义搜索下拉组件
  @props optionKey 仅当dropList每个值为obj时, 该参数有用
  @author jianguo
-->
<template>
  <div class="search-input" :class = 'classes'>
    <div class="ivu-select-selection">
      <input 
        type="text" 
        class = 'ivu-select-input'
        :disabled = 'disabled'
        :readonly = 'readonly'
        :maxlength = 'maxlength'
        :minlength = 'minlength'
        :placeholder = 'placeholder'
        :value = 'curValue' 
        @blur = 'blur'
        @focus = 'focus'
        @input = 'input'
        @keydown.enter = 'enter'
      />
      <i class="ivu-icon ivu-input-icon ivu-input-icon-normal" :class="['ivu-icon-' + icon]" :style='{color: iconColor}' v-if='icon' @click="handleIconClick"></i>
    </div>
    <transition name = 'slide-up'>
      <div class = 'ivu-select-dropdown' v-show='isShowDropList'>
        <ul class = 'ivu-select-dropdown-list' v-show='dropList.length > 0 && !loading'>
          <li class = 'ivu-select-item' v-for='(item, index) in dropList' :key='index' @click='select(index)'>
            {{ optionKey ? item[optionKey] : item }}
          </li>
        </ul>
        <p class = 'ivu-select-loading' v-show='dropList.length <= 0 && loading && loadingText !== ""'>{{ loadingText }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'SearchInput',
    data() {
      return {
        curValue: this.value,
        isfocus: false
      };
    },
    computed: {
      classes() {
        return [
          'ivu-select',
          'ivu-select-single',
          {
            'ivu-select-visible': this.isfocus,
            'ivu-select-disabled': this.disabled,
            ['ivu-select-' + this.size]: this.size
          }
        ];
      },
      isShowDropList() {
        let show = false;
        if(this.curValue.length > 0) {
          show = true;
        }
        return this.isfocus && show;
      }
    },
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      size: {
        validator(val) {
          return ['small', 'large', 'default'].includes(val);
        }
      },
      dropList: {
        type: Array,
        required: true,
        default: () => []
      },
      optionKey: {
        type: String,
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: '加载中...'
      },
      /* placement: {
        validator(value) {
          return ['top', 'bottom'].includes(value);
        },
        default: 'bottom'
      }, */
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      minlength: {
        type: Number,
        default: 0
      },
      maxlength: {
        type: Number,
        default: 30
      },
      icon: String,
      iconColor: String
    },
    watch: {
      value(newVal) {
        this.curValue = newVal;
      },
      curValue(newCurValue) {
        this.$emit('input', newCurValue);
      }
    },
    methods: {
      // 输入事件
      input(evt) {
        const val = evt.target.value.trim();
        this.curValue = val;
        this.$emit('input', val);
        this.$emit('on-change', val);
      },
      // 聚焦事件
      focus() {
        this.isfocus = true;
        /* if(this.value.length >= this.minlength) {
          this.$emit('on-change', this.value);
        } */
        this.$emit('on-focus', this.curValue);
      },
      // 失去焦点事件
      blur() {
        setTimeout(() => {
          this.isfocus = false;
          this.$emit('on-blur', this.curValue);
        }, 300);
      },
      // 按下 enter 键时的事件
      enter() {
        this.isfocus = false;
        this.$emit('on-enter', this.curValue);
      },
      // 选中事件
      select(index) {
        const selected = this.dropList[index];
        this.curValue = this.optionKey ? selected[this.optionKey] : selected;
        this.$emit('input', this.curValue);
        this.$emit('on-change', this.curValue);
        this.$emit('on-select', selected);
      },
      // 图标点击事件
      handleIconClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>

<style lang="less">
  .search-input {
    @large: 36px;
    @small: 24px;
    position: relative;
    &.ivu-select-large {
      .ivu-icon {
        font-size: 18px;
        line-height: @large;
        height: @large;
        width: @large;
      }
    }
    &.ivu-select-small {
      .ivu-icon {
        font-size: 14px;
        line-height: @small;
        height: @small;
        width: @small;
      }
    }
    .ivu-select-input { cursor: text; }
    .ivu-icon { top: 0; }
    .ivu-select-dropdown-list { width: 100%; }
  }
</style>
