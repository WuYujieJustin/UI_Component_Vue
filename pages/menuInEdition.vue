<template>
  <div class="container">
    <div class="welcome">
      <button class="basebtn" @click="$router.go(-1)">返回</button>
      <p>welcome to CHANGE page</p>
      <p>type:{{$route.query.type}}</p>
      <p>id:{{$route.query.id}}</p>
      <p>name:{{$route.query.name}}</p>
    </div>

    <form action @submit="submit">
      <labeled-number-input
        v-model="sourceId.options"
        label-text="ID"
        label-class="class1"
        control-width="500px"
        control-placeholder
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
        :control-precision="0"
        :control-isgroupseparator="true"
        :control-number-range="false"
      />
      <labeled-text
        v-model="sourceName.options"
        label-text="版本名称"
        label-class="class1"
        control-width="500px"
        control-placeholder
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />

      <labeled-grid-select-input
        v-model="menuId.options"
        label-text="修改菜单"
        label-class="class1"
        control-width="500px"
        control-placeholder="修改版本关联菜单"
        :control-readonly="false"
        control-icon="fa-search"
        control-icontext
        :control-multiple="true"
        :data-sources="menuId.data.sources"
        data-url
        data-displayfield="name"
        data-columns="text"
        :key="refresh"
      />

      <button class="basebtn" type="submit" @click="confirm">确认修改</button>
      <button class="basebtn" @click="cancel">取消</button>
    </form>
    <p class="bg-success" v-if="succeed">操作成功！</p>
    <p class="bg-danger" v-if="failed">操作失败，请重试！</p>
  </div>
</template>


<script>
import labeledGridSelectInput from "~/components/labeledGridSelectInput";
import labeledNumberInput from "~/components/labeledNumberInput";
import labeledText from "~/components/labeledText";
import axios from "axios";
import config from "../common/api";

export default {
  components: {
    labeledText,
    labeledNumberInput,
    labeledGridSelectInput
  },
  data() {
    return {
      refresh: 1,
      sourceRefresh: 1,
      succeed: false,
      failed: false,
      sourceId: {
        options: {
          value: null,
          locked: true,
          required: true
        }
      },
      sourceName: {
        options: {
          value: "",
          locked: true,
          required: true
        }
      },
      menuId: {
        options: {
          value: [],
          locked: false,
          required: false
        },
        data: {
          sources: []
        }
      }
    };
  },
  created() {
    this.sourceId.options.value = this.$route.query.id * 1;
    this.sourceName.options.value = this.$route.query.name;
    this.menuId.options.value = this.$route.query.menuId * 1;
    //请求菜单列表
    axios({
      method: "get",
      url: "http://" + config.host + "/Cargoorbs/API/admin/menu/listLinear",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {
      console.log("菜单列表", res);
      if (res.data.status === 1) {
        //console.log("返回数据成功");
        // console.log("res.data.data.data", res.data.data.data);
        this.menuId.data.sources = res.data.data.data;
        if (this.refresh >= 1 && this.refresh < 10) {
          this.refresh++;
        } else {
          this.refresh = 1;
        }
      } else {
      }
    });
    //请求关联菜单ID
    axios({
      method: "POST",
      url: "http://" + config.host + "/Cargoorbs/API/admin/menu/version/list",
      data: {
        id: this.$route.query.id * 1
      },
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {
      console.log("关联菜单ID数组", res);
      if (res.data.status === 1) {
        //console.log("返回数据成功");
        this.menuId.options.value = res.data.data[this.$route.query.id];
        if (this.refresh >= 1 && this.refresh < 10) {
          this.refresh++;
        } else {
          this.refresh = 1;
        }
      } else {
      }
    });
  },
  mounted() {
    //console.log("this.$route in edit", this.$route);
    //console.log("query in edit", this.$route.query);
  },
  methods: {
    submit(e) {
      e.preventDefault();
      //console.log("提交");
      //console.log("id", this.sourceId.options.value);
      //console.log("text", this.labeledText.options.value);
      axios({
        method: "POST",
        url:
          "http://" + config.host + "/Cargoorbs/API/admin/menu/version/create",
        data: {
          versionId: this.$route.query.id,
          menuId: this.menuId.options.value
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
    },
    confirm(e) {
      //console.log("确定");
    },
    cancel(e) {
      e.preventDefault();
      //console.log("取消");
      this.$router.go(-1);
    }
  }
};
</script>