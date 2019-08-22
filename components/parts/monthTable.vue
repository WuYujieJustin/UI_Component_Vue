<template>
  <div class="monthTable">
    <div style="display:flex" class="month">
      <div
        @click="chooseMonth"
        class="monthcom"
        v-for="(month,index) in months"
        :key="index"
        :class="{current:targetMatchesmonth(month)}"
      >{{month}}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    months() {
      // push 12 months in months
      this.defaultArray = []
      for (let i = 0; i < 12; i++) {
        this.defaultArray.push(this.defaultmonth+i);
      }
      return this.defaultArray;
    }
  },
  data() {
    return {
      defaultIndex: 0,
      defaultArray: [],
      defaultmonth: 1,
      length:12
    };
  },
  methods: {
    enter() {
      this.chooseMonth();
    },
    targetMatchesmonth(month) {
      return this.months[this.defaultIndex] === month;
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
    chooseMonth(event) {
      
      if(event ===undefined){
        let event
        event.target.innerText = this.defaultArray[this.defaultIndex]
        this.$emit("chooseMonth", event);
      }else{
        console.log(event.target.innerText)
        this.$emit("chooseMonth", event);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.monthcom {
  width: 25%;
  cursor: pointer;
  padding: 15px;
}
.month {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  width: 300px;
  border: 1px solid #ccc;
  z-index: 100000000000000;
  background: #fff;
}
.monthTable {
  background: #fff;
  z-index: 100;
  position: absolute;
  width: 300px;
  border: 1px solid #ccc;
}
.current {
  color: white;
  background: skyblue;
}
.monthcom:hover {
  color: skyblue;
}
.current:hover {
  color: white;
}
</style>



