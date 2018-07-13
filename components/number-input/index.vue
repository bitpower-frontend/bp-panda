<!--
  数字输入框
  修复原有数字输入框能输入负数的问题
  @author jianguo
-->
<template>
  <div :class="numberInputClass" class='ivu-input-number'>
    <input
      autocomplete="off"
      class='ivu-input-number-input'
      :value='curValue'
      :id="elementId"
      :disabled="disabled"
      :autofocus="autofocus"
      :placeholder='placeholder'
      :readonly="readonly || !editable"
      @change='input'
      @input='input' />
  </div>
</template>

<script>
  export default {
    name: 'number-input',
    data() {
      return {
        curValue: this.value
      };
    },
    watch: {
      value(newVal) {
        this.curValue = newVal;
      },
      curValue(newCurValue) {
        this.$emit('input', newCurValue);
      }
    },
    computed: {
      numberInputClass() {
        const baseClass = 'ivu-input-number';
        const { size, disabled } = this;
        return {
          [baseClass + '-disabled']: disabled,
          [baseClass + '-' + size]: size
        }
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default: ''
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      size: {
        validator(value) {
          return ['small', 'large', 'default'].includes(value);
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: true
      },
      elementId: {
        type: String
      }
    },
    methods: {
      // 输入事件
      input(evt) {
        let val = evt.target.value.trim();
        const { min, max } = this;

        if(evt.type === 'input' && val.match(/^\-?\.?$|\.$/)) return;

        val = Number(val);
        if(val !== '' && !isNaN(val)) {
          if(val >= max) {
            val = max;
          }
          else if(val <= min) {
            val = min;
          }
        }
        else {
          val = this.curValue;
        }
        evt.target.value = val;

        this.$emit('input', val);
        this.$emit('on-change', val);
      }
    }
  }
</script>