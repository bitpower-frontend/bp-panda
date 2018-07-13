<template>
  <div class="tag-input-wrapper">
    <div class="tag-input">
      <span class="tag" :style="tagStyle" v-for="tag,i in value" :key="i">
        {{ tag }} 
        <svg @click="removeTag(tag)" t="1522291669142" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1904" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="1905"></path></svg>
      </span>
      <input type="text" v-model="editTag" @keyup.enter="addTag(editTag)" autofocus="autofocus" placeholder="输入标签">
    </div>
    <div class="recommend-tags" v-if="recommendTags && recommendTags.length">
      <span>推荐：</span><span class="tag triangle" :style="tagStyle" v-for="tag,i in recommendTags" :key="i" @click="addTag(tag)">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tag-input',
    props: {
      value: {
        type: Array,
        default: () => [],
      },
      recommendTags: {
        type: Array,
        default: () => [],
      },
      tagStyle: Object,
    },
    data (){
      return {
        // tags: ['大宝剑', '马杀鸡'],
        editTag: '',
      };
    },
    methods: {
      addTag (newTag){
        newTag = newTag.trim();
        if(!this.value.includes(newTag)){
          this.$emit('input', this.value.concat([newTag]));
          this.editTag = '';
        }
      },
      removeTag (removedTag){
        this.$emit('input', this.value.filter(tag => {
          return tag !== removedTag;
        }));
      },
    },
  };
</script>

<style lang="less">
  @import './index.less';
</style>

