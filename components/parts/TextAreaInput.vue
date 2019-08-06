<template>
  <div class="example">
    <!-- v-on:input="transData" -->
    <textarea
      ref="input"
      class="form-control"
      style="resize:none"
      v-bind="$attrs"
      v-on="inputListeners"
      v-bind:style="{ height: height + 'px' ,}"
      cols="50"
      rows="5"
      v-bind:value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
    ></textarea>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {};
  },
  props: {
    value: String,
    placeholder: String,
    readonly: Boolean,
    required: Boolean,
    height: String
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners.inputListeners.fns,
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
  mounted() {
    // console.log(`$attrs:`);
    // console.log(this.$attrs);
    // console.log(`$listeners:`);
    // console.log(this.$listeners); // 父级添加的所有属性都在这里
    // console.log(this.$listeners.inputListeners.fns); //
  },
  methods: {}
};
</script>
<style>
</style>
