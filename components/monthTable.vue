<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td @click="chooseMonth">1</td>
          <td @click="chooseMonth">2</td>
          <td @click="chooseMonth">3</td>
          <td @click="chooseMonth">4</td>
        </tr>
        <tr>
          <td @click="chooseMonth">5</td>
          <td @click="chooseMonth">6</td>
          <td @click="chooseMonth">7</td>
          <td @click="chooseMonth">8</td>
        </tr>
        <tr>
          <td @click="chooseMonth">9</td>
          <td @click="chooseMonth">10</td>
          <td @click="chooseMonth">11</td>
          <td @click="chooseMonth">12</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  methods:{
    chooseMonth(event){
      console.log(event.target.innerText)
      this.$emit("chooseMonth",event)
    }
  }
};
</script>

<style lang="less" scoped>
td{
  cursor: pointer;
}
td:hover{
  color: aliceblue;
  background: lightblue;
}
</style>

