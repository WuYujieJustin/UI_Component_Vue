<template>
  <div class="minute" v-show="isMin">
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
    },
    visible: {
      type: Boolean,
      default: false
    },
    isHour: {
      type: Boolean,
      default: false
    },
    isMin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm(event) {
      this.$emit("confirm",event)
    }
  }
};
</script>

<style lang="less" scoped>
.minute{
  display: flex;
  flex-wrap: wrap;
  align-items: center
}
.minutecom{
  width:25%;
  cursor: pointer;
}
.minutecom:hover{
  color: aliceblue;
  background: lightblue;
}
</style>

