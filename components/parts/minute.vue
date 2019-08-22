<template>
  <div class="minute">
    <div
      class="minutecom"
      v-for="minute in minutes"
      :class="{current:targetMatchesMin(minute)}"
      :key="minute"
      @click="confirm"
    >{{minute}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    length() {
      if (this.minutes) {
        return this.minutes.length;
      }
    }
  },
  data() {
    return {
      defaultIndex: 0
    };
  },
  props: {
    minutes: {
      type: Array
    }
  },
  methods: {
    enter() {
      this.confirm();
    },
    targetMatchesMin(minute) {
      return this.minutes[this.defaultIndex] === minute;
    },
    down() {
      if (this.defaultIndex < this.length - 4) {
        this.defaultIndex += 4;
      }
    },
    up() {
      if (this.defaultIndex >= 4) {
        this.defaultIndex -= 4;
      }
    },
    right() {
      if (this.defaultIndex < this.length - 1) {
        this.defaultIndex += 1;
      }
    },
    left() {
      if (this.defaultIndex > 0) {
        this.defaultIndex -= 1;
      }
    },
    confirm(event) {
      if (event) {
        this.$emit("confirm", event);
      } else {
        let event = this.minutes[this.defaultIndex];
        this.$emit("confirm", event);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.current {
  color: white;
  background: skyblue;
}
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
.current:hover {
  color: white;
}
</style>

