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
    Listview,
  },
  methods: {
    handelDel(event){
      console.log("组件抛出的删除数据",event)
    },
    showSetting(v) {
      console.log("组件设置条件", v);
    },
    showQuery(v) {
      console.log("搜索条件", v);
    }
  },
  beforeCreate() {
    //获取版本列表
    axios({
      method: "get",
      url: "http://" + config.host + "/Cargoorbs/API/admin/version/list",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {
      if (res.data.status === 1) {
        //console.log("返回数据成功");
        console.log("版本", res);
        console.log("res.data", res.data);
        console.log("res.data.data", res.data.data);
        this.json[0] = res.data.data
        this.refresh++
      } else {
      }
    });
  },
  data() {
    return {
      refresh: 1,
      json: [
        {
          type: "edition",
          query: [
          ],
          head: [
          ],
          data: [
          ],
          button: [
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

