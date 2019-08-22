<template>
  <div class="container" style="margin-top: 50px;">
    <div class="welcome well">
      <button class="basebtn" @click="$router.go(-1)">&lt;&lt;</button>
      <h3>原数据</h3>
      <p>type: {{$route.query.type}}</p>
      <p>id: {{$route.query.id}}</p>
      <p>角色名称: {{$route.query.rollName}}</p>
    </div>

    <form @submit="submit">
      <labeled-text
        v-model="labeledText.options"
        label-text="输入角色名称"
        label-class="class1"
        control-width="500"
        control-placeholder="输入角色名称"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <button class="basebtn">修改</button>
    </form>
    <p class="bg-success" v-if="succeed">操作成功！</p>
    <p class="bg-danger" v-if="failed">操作失败，请重试！</p>
  </div>
</template>


<script>
import ListviewQuery from "~/components/parts/ListviewQuery";
import labeledText from "~/components/labeledText";

import axios from "axios";
import config from "../common/api";
export default {
  components: {
    ListviewQuery,
    labeledText
  },
  methods: {
    submit() {
      event.preventDefault();
            axios({
        method: "POST",
        url: "http://" + config.host + "/Cargoorbs/API/admin/group/add",
        data: {
          id: this.$route.query.id,
          groupName: this.labeledText.options.value
        },
        headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
      }).then(res => {
        // //console.log("添加结果", res);
        if (res.data.status === 1) {
          //console.log("操作成功");
          this.succeed = true;
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        } else {
          this.failed = true;
          //console.log("操作失败");
          setTimeout(() => {
            this.failed = false;
          }, 1500);
        }
      });
    }
  },

  created() {
    axios({
      method: "get",
      url: "http://" + config.host + "/Cargoorbs/API/admin/group/list",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {

      this.apidata = res.data.data;
      if (this.refresh && this.refresh < 10) {
        this.refresh++;
      } else {
        this.refresh = 1;
      }
    }).catch(error=>{
      console.log(error)
      alert("error")
    })
    // this.json[0] = this.mockData[0];
  },
  data() {
    return {
      succeed: false,
      failed: false,
      labeledText: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      },
      apidata: {
        type: "Position",
        query: [
          {
            id: "groupName",
            name: "角色名称",
            orderindex: 0,
            control: "datebox",
            defalutvalue: ""
          }
        ],
        head: [
          {
            id: "id",
            name: "ID",
            orderindex: 0,
            width: "60px",
            class: "",
            align: "left",
            required: true,
            isTotal: false,
            isSelTotal: false,
            jsFun: "",
            control: "textbox"
          },
          {
            id: "groupName",
            name: "角色名称",
            orderindex: 1,
            width: "200px",
            class: "",
            align: "left",
            required: false,
            isTotal: false,
            isSelTotal: false,
            jsFun: "",
            control: "textbox"
          }
        ],
        data: [
          {
            id: 12306,
            groupName: "经理"
          },
          {
            id: 12315,
            groupName: "工程师"
          },
          {
            id: 12345,
            groupName: "工程师"
          },
          {
            id: 12346,
            groupName: "工程师"
          },
          {
            id: 12377,
            groupName: "工程师"
          }
        ],
        button: [
          {
            id: "new",
            name: "新增",
            icon: "fa-plus",
            display: true,
            disabled: false,
            align: "right",
            function: "DoNew()"
          },
          {
            id: "edit",
            name: "修改",
            icon: "fa-edit",
            display: true,
            disabled: true,
            align: "right",
            function: "DoEdit()"
          }
        ],
        pagination: true,
        pagesize: 1000,
        pagenumber: 1,
        pagelist: [1, 2, 5, 10],
        checkbox: true
      }
    };
  }
};
</script>