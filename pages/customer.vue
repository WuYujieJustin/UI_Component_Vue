<template>
  <div class="menu_create">
    <table-list :data="customerList" @submit="update" v-slot:default="row">
      <a href="#" @click="deleteg(row.row.id)">删除</a>
    </table-list>
    <table>
      <tbody>
        <tr>
          <td>新项：</td>
          <td><input type="text" v-model="name"></td>
          <td><button @click="add">添加新项</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import config from "../common/api";
import tableList from "~/components/parts/tableList"

export default {
  components: {
        tableList
    },
  data() {
    return {
      customerList:[],
      name:"",
    };
  },
  methods: {
    add() {
      const that = this;
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/customer/add",
        data:{
          customerName:that.name,
        },
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        //console.log(res)
      });
    },
    deleteg(id){
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/customer/delete",
        data: {
          id:id
        },
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        console.log(res)
      });
    },
    update(data) {
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/customer/update",
        data: data,
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        console.log(res)
      });
    },
  },
  mounted(){
    const that = this;
      axios({
        method: "get",
        url:"http://"+config.host+"/admin/customer/list",
        data: that.reqData,
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        that.customerList=res.data.data
      });
  }
};
</script>
<style>
</style>
