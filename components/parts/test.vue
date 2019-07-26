<template>
  <div>
    <label for="1111">111111</label>
    <input :value="input" v-on="inputListeners" type="text" />
    <div>{{input}}</div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.input = this.value
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            vm.$emit("input", event.target.value);
          }
        }
      );
    }
  },
  props: ["value"],
  data(){
    return{
      input:'1111111111'
    }
  }
};
</script>

<style>
</style>
