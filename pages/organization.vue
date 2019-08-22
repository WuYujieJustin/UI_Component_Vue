<template>
  <div>
    <Listview
      :value="json[0]"
      :multiSelect="true"
      :displayId="true"
      @settingChange="showSetting"
      :key="refresh"
      @query="showQuery"
      @delData="handelDel"
    />
  </div>
</template>
<script>
import Listview from "~/components/parts/Listview.vue";
import axios from "axios";
import config from "../common/api";
export default {
  components: {
    Listview
  },
  methods: {
    handelDel(event) {
      console.log("组件抛出的删除数据", event);
    },
    showSetting(v) {
      console.log("组件设置条件", v);
    },
    showQuery(v) {
      console.log("搜索条件", v);
    }
  },
  beforeCreate() {
    axios({
      method: "get",
      url: "http://" + config.host + "/Cargoorbs/API/admin/department/list",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {
      console.log("部门组织结构树返回数据", res);
      if (res.data.status === 1) {
        // console.log("返回数据成功");
        this.json[0] = res.data.data;
        if (this.refresh && this.refresh < 10) {
          this.refresh++;
        } else {
          this.refresh = 1;
        }
      } else {
      }
    });
  },
  data() {
    return {
      refresh: 1,
      json: [
        {
          type: "organization",
          query: [
            {
              id: "Company",
              name: "公司名称",
              orderindex: 0,
              control: "textbox",
              defalutvalue: ""
            },
            {
              id: "Branch",
              name: "分公司名称",
              orderindex: 1,
              control: "textbox",
              defalutvalue: ""
            },
            {
              id: "Department",
              name: "部门名称",
              orderindex: 2,
              control: "textbox",
              defalutvalue: ""
            }
          ],
          head: [
            {
              id: "id",
              name: "ID",
              orderindex: 0,
              width: "50px",
              class: "",
              align: "left",
              required: true,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox"
            },
            {
              id: "Company",
              name: "公司名称",
              orderindex: 0,
              width: "200px",
              class: "",
              align: "left",
              required: true,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox"
            },
            {
              id: "Branch",
              name: "分公司名称",
              orderindex: 1,
              width: "200px",
              class: "",
              align: "left",
              required: true,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox"
            },
            {
              id: "Department",
              name: "部门名称",
              orderindex: 2,
              width: "200px",
              class: "",
              align: "right",
              required: false,
              isTotal: true,
              isSelTotal: true,
              jsFun: "",
              control: "textbox"
            }
          ],
          data: [
            {
              id: 1,
              Company: "总公司",
              Branch: "A分公司",
              Department: "A-1"
            },
            {
              id: 2,
              Company: "总公司",
              Branch: "A分公司",
              Department: "A-2"
            }
          ],
          button: [
            {
              id: "default1",
              name: "自定义1",
              icon: "fa-plus",
              display: true,
              disabled: false,
              align: "right",
              function: "{console.log('点击了自定义1按钮')}"
            },
            {
              id: "default2",
              name: "自定义2",
              icon: "fa-edit",
              display: true,
              disabled: true,
              align: "right",
              function: "{console.log('点击了自定义2按钮')}"
            }
          ],
          pagination: true,
          pagesize: 1000,
          pagenumber: 1,
          pagelist: [1, 2, 5, 10],
          checkbox: true
        }
      ]
    };
  }
};
</script>

