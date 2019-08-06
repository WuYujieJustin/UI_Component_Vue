<template>
  <div class="minute">
    <div class="minutecom" v-for="minute in minutes" :key="minute" @click="confirm">{{minute}}</div>
  </div>
</template>

<script>
export default {
  props: {
    minutes: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    confirm(event) {
      this.$emit("confirm", event); 
    }
  }
};
</script>

<style lang="less" scoped>
.minute {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  // position: absolute;
  background-color: #fff;
  z-index: 10000000000;
  border: 1px solid darkgray;
  width: 300px;
}
.minutecom {
  width: 25%;
  cursor: pointer;
  padding: 15px;
}
.minutecom:hover {
  color: skyblue;
}
</style>

