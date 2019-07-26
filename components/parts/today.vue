<template>
  <div>
    <button type="button" class="btn btn-secondary" @click="chooseToday">今天</button>
  </div>
</template>

<script>
export default {
  methods: {
    chooseToday() {
      this.$emit("chooseToday");
    }
  }
};
</script>

<style lang="less" scoped>

button{
  width: 100%;
  background:#FFF;
  border-top: 1px solid #CCC
}
</style>

