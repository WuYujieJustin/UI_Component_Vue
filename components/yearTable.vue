<template>
  <div>
    <button @click="preYear">preYear</button>
    <button @click="nextYear">nextYear</button>
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
td {
  cursor: pointer;
}
td:hover {
  color: aliceblue;
  background: lightblue;
}
</style>

