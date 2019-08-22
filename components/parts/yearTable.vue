<template>
  <div class="yearTable">
    <button type="button" class="basebtn" @click="preYear">前一年</button>
    <button type="button" class="basebtn" @click="nextYear">后一年</button>
    <div style="display:flex" class="year">
      <div
        @click="chooseYear"
        class="yearcom"
        v-for="(year,index) in years"
        :key="index"
        :class="{current:targetMatchesYear(year)}"
      >{{year}}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    years() {
      // push 12 years in years
      this.defaultArray = []
      for (let i = 0; i < 12; i++) {
        this.defaultArray.push(this.defaultYear+i);
      }
      return this.defaultArray;
    }
  },
  data() {
    return {
      defaultIndex: 0,
      defaultArray: [],
      defaultYear: new Date().getFullYear(),
      length:12
    };
  },
  methods: {
    enter() {
      console.log("eneter")
      this.chooseYear();
    },
    targetMatchesYear(year) {
      return this.years[this.defaultIndex] === year;
    },
    down() {
         console.log("??????????")
      if (this.defaultIndex < this.length - 4) {
        console.log("??????????")
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
    nextYear() {
      this.defaultYear += 12;
    },
    preYear() {
      this.defaultYear -= 12;
    },
    chooseYear(event) {
      
      if(event ===undefined){
        let event = this.defaultArray[this.defaultIndex]
        this.$emit("chooseYear", event);
      }else{
        this.$emit("chooseYear", event);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.yearcom {
  width: 25%;
  cursor: pointer;
  padding: 15px;
}
.year {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  width: 300px;
  border: 1px solid #ccc;
  z-index: 100000000000000;
  background: #fff;
}
.yearTable {
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
.yearcom:hover {
  color: skyblue;
}
.current:hover {
  color: white;
}
</style>

