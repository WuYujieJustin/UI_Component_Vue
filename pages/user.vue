<template>
  <div>
    <Listview
      :value="apidata"
      :multiSelect="true"
      :displayId="true"
      :key="refresh"
      @delData="test"
      @query="showQuery"
    />
    <!-- <quick-input
    <Listview :value="json[0]" :multiSelect="true"  :displayId="false" @settingChange="test"/>
    <quick-input
    :theads="head"
    />-->
    <!-- {{apidata}} -->
  </div>
</template>
<script>
import Listview from "~/components/parts/Listview";
import quickInput from "~/components/parts/quickInput";
import axios from "axios";
import config from "../common/api";

export default {
  methods: {
    test() {
      console.log("delete");
    },
    showQuery(){
      console.log("query")
    }
  },
  created() {
    axios({
      method: "get",
      url: "http://" + config.host + "/Cargoorbs/API/admin/user/list",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {

      this.apidata = res.data.data;
      if (this.refresh && this.refresh < 10) {
        this.refresh++;
      } else {
        this.refresh = 1;
      }
    });
    // this.json[0] = this.mockData[0];
  },
  components: {
    Listview,
    quickInput
  },

  data() {
    return {
      apidata: {
        type: "user",
        query: [
          {
            id: "groupName",
            name: "角色名称",
            orderindex: 0,
            control: "textbox",
            defalutvalue: "角色名称"
          },
          {
            id: "name",
            name: "姓名",
            orderindex: 1,
            control: "textbox",
            defalutvalue: "姓名"
          },
          {
            id: "birth",
            name: "出生日期",
            orderindex: 2,
            control: "datebox",
            defalutvalue: "出生日期"
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
          },
          {
            id: "name",
            name: "姓名",
            orderindex: 2,
            width: "100px",
            class: "",
            align: "left",
            required: false,
            isTotal: false,
            isSelTotal: false,
            jsFun: "",
            control: "textbox"
          },
          {
            id: "birth",
            name: "出生日期",
            orderindex: 3,
            width: "400px",
            class: "",
            align: "left",
            required: false,
            isTotal: false,
            isSelTotal: false,
            jsFun: "",
            control: "datebox"
          }
        ],
        data: [
          {
            id: 12306,
            groupName: "经理",
            name: "张三",
            birth: "1997-03-29"
          },
          {
            id: 12315,
            groupName: "工程师",
            name: "张三",
            birth: "1997-03-29"
          },
          {
            id: 12345,
            groupName: "工程师",
            name: "张三",
            birth: "1997-03-29"
          },
          {
            id: 12346,
            groupName: "工程师",
            name: "张三",
            birth: "1997-03-29"
          },
          {
            id: 12377,
            groupName: "工程师",
            name: "张三",
            birth: "1997-03-29"
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
      },
      refresh: 1
    };
  }
};
</script>

