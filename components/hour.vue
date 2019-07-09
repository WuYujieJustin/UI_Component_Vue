<template>
  <!-- flex layout for responsive  -->
  <div class="hour">
    <div
      @click="showMin"
      class="hourcom"
      v-show="isHour"
      v-for="hour in hours"
      :key="hour"
    >{{hour}}</div>
  </div>
</template>

<script>
export default {
  methods: {
    hangdleClick() {
      console.log(this.newhours);
      console.log(this.showHour);
    },
    showMin(event){
        // emit argument event
        this.$emit("showMin",event)
    }
  },
  data() {
    return {
      
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isHour: {
      type: Boolean,
      default: false
    },
    hours: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    showHour: function() {
      return this.visible;
    },
    newhours: function() {
      return this.hours;
    }
  }
};
</script>

<style lang="less" scoped>
.hour{
  display: flex;
  flex-wrap: wrap;
  align-items: center
}
.hourcom{
  width:25%;
  cursor: pointer;

}
.hourcom:hover{
  color:white;
  background: lightblue
}
</style>

