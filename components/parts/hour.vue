<template>
  <!-- flex layout for responsive  -->
  <div class="hour">
    <div
      @click="showMin"
      class="hourcom"
      :class="{current:targetMatchesHour(hour)}"
      v-for="hour in hours"
      :key="hour"
    >{{hour}}</div>
  </div>
</template>

<script>
export default {
  methods: {
    // hour table 4*6 layout
    enter() {
      this.showMin();
    },
    targetMatchesHour(hour) {
      return this.hours[this.defaultIndex] === hour;
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
    showMin(event) {
      // emit argument event
      if (event) {
        this.$emit("showMin", event);
      } else {
        let event = this.hours[this.defaultIndex];
        this.$emit("showMin", event);
      }
    }
  },
  data() {
    return {
      defaultIndex: 0
    };
  },
  props: {
    hours: {
      type: Array
    }
  },
  computed: {
    showHour: function() {
      return this.visible;
    },
    length() {
      if (this.hours) {
        return this.hours.length;
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
.hour {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  // position: absolute;
  width: 300px;
  border: 1px solid #ccc;
  z-index: 100000000000000;
  background: #fff;
}
.hourcom {
  width: 25%;
  cursor: pointer;
  padding: 15px;
}
.hourcom:hover {
  color: skyblue;
}
.current:hover {
  color: white;
}
</style>

