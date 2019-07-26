
<template>
  <div class="example" v-if="isShow">
        <select class="operator" v-bind:value="value" v-on:change="$emit('input', $event.target.value)">
          <option value="=">=</option>
          <option value="!=">!=</option>
          <option value=">">&gt;</option>
          <option value=">=">&gt;=</option>
          <option value="<">&lt;</option>
          <option value="<=">&lt;=</option>
          <option value="include">包含</option>
          <option value="between">介于</option>
          <option value="notinclude">不包含</option>
          <option value="belong">从属于</option>
        </select>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
      value:{
          type:String,
          default:"="
      },
      isShow:{
          type:Boolean,
          default:false
      }
    },
  data() {
    return {
    };
  }
};
</script>

