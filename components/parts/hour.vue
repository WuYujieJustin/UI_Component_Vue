<template>
  <!-- flex layout for responsive  -->
  <div class="hour">
    <div
      @click="showMin"
      class="hourcom"
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
  align-items: center;
  position: absolute;
  width:300px;
  border: 1px solid #CCC;
  z-index: 100000000000000;
  background:#FFF
}
.hourcom{
  width:25%;
  cursor: pointer;
  padding:15px

}
.hourcom:hover{
  color:skyblue
}
</style>

