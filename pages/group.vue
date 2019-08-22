<template>
  <div>
    <Listview :value="json" :multiSelect="true" :displayId="true" @settingChange="test" />

    <!-- <table-list :data="groupList" @submit="update" v-slot:default="row">
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
    </table>-->
  </div>
</template>
<script>
import axios from "axios";
import config from "../common/api";
import Listview from "~/components/parts/Listview.vue";
import tableList from "~/components/parts/tableList";

export default {
  components: {
    Listview,
    tableList
  },
  data() {
    return {
      //refresh:0,
      json: {
        query: [
          {
            id: "id",
            name: "ID",
            orderindex: 0,
            control: "textbox",
            defalutvalue: ""
          },
          {
            id: "groupName",
            name: "角色名称",
            orderindex: 0,
            control: "textbox",
            defalutvalue: ""
          }
        ],
        head: [
          {
            id: "id",
            name: "ID",
            control: "textbox"
          },
          {
            id: "groupName",
            name: "角色名称",
            control: "textbox"
          }
        ],
        data:[]
      },
      groupList: [],
      name: ""
    };
  },
  methods: {
    test(v) {
      console.log(v);
    },
    add() {
      const that = this;
      axios({
        method: "post",
        url: "http://" + config.host + "/admin/group/add",
        data: {
          groupName: that.name
        },
        headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
      }).then(function(res) {
        //console.log(res)
      });
    },
    deleteg(id) {
      axios({
        method: "post",
        url: "http://" + config.host + "/admin/group/delete",
        data: {
          id: id
        },
        headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
      }).then(function(res) {
        console.log(res);
      });
    },
    update(data) {
      axios({
        method: "post",
        url: "http://" + config.host + "/admin/group/update",
        data: data,
        headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
      }).then(function(res) {
        console.log(res);
      });
    }
  },
  mounted() {
    const that = this;
    axios({
      method: "get",
      url: "http://" + config.host + "/admin/group/list",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(function(res) {
      // that.groupList = res.data.data;
        console.log("res",res);
      that.json.data = res.data.data;
        console.log("that.json",that.json);
        //that.refresh++
        //new Object();

    });
  }
};
</script>
<style>
</style>
