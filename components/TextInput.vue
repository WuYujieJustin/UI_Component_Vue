<template>
  <div class="example">
    <input class="form-control" 
      type="text"
      v-bind:value="value"
      v-on:input="transData"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: String,
    placeholder: String,
    readonly: Boolean,
    required: Boolean
  },
  methods: {
    transData: function(event) {
      // this.value=event.target.value
      this.$emit("input", event.target.value);
    }
  }
};
</script>
<style>
</style>
