<template>
  <div class="yearTable">
    <button type="button" class="btn btn-secondary" @click="preYear">preYear</button>
    <button type="button" class="btn btn-secondary" @click="nextYear">nextYear</button>
    <table>
      <tbody>
        <tr>
          <td @click="chooseYear">{{year-5}}</td>
          <td @click="chooseYear">{{year-4}}</td>
          <td @click="chooseYear">{{year-3}}</td>
          <td @click="chooseYear">{{year-2}}</td>
        </tr>
        <tr>
          <td @click="chooseYear">{{year-1}}</td>
          <td @click="chooseYear">{{year}}</td>
          <td @click="chooseYear">{{year+1}}</td>
          <td @click="chooseYear">{{year+2}}</td>
        </tr>
        <tr>
          <td @click="chooseYear">{{year+3}}</td>
          <td @click="chooseYear">{{year+4}}</td>
          <td @click="chooseYear">{{year+5}}</td>
          <td @click="chooseYear">{{year+6}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
      // years:[[year-5,year-4,year-3,year-2],[year-1,year,year+1,year+2],[year+3,year+4,year+5,year+6]]
    };
  },
  methods: {
    nextYear() {
      this.year += 12;
    },
    preYear() {
      this.year -= 12;
    },
    chooseYear(event) {
      this.$emit("chooseYear", event);
    }
  }
};
</script>

<style lang="less" scoped>
.yearTable{
background:#FFF;
z-index: 100;
// position: absolute;
width:300px;
border: 1px solid #ccc;
}
td {
  cursor: pointer;
}
table{
  width: 100%
}
tbody{
  width: 100%
}
tr{
  width: 25%
}
td{
  padding:15px 0
}
td:hover{
  color:skyblue
}
</style>

