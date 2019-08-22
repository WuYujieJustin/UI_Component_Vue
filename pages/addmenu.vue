<template>
  <div class="container" style="margin-top: 50px;">
    <button class="basebtn" @click="$router.go(-1)">&lt;&lt;</button>

    <h3>welcome to ADD page</h3>

    <p>type: {{$route.query.type}}</p>


    <form action @submit="submit" class=" well" style="margin-top: 20px;">
      <labeled-grid-select-input
        v-model="menuId.options"
        label-text="选择上级菜单"
        label-class="class1"
        control-width="500px"
        control-placeholder="选择上级菜单,不填默认为一级菜单"
        :control-readonly="false"
        control-icon="fa-search"
        control-icontext
        :control-multiple="false"
        :data-sources="menuId.data.sources"
        data-url
        data-displayfield="name"
        data-columns="text"
      />
      <labeled-text
        v-model="name.options"
        label-text="菜单名称"
        label-class="class1"
        control-width="500px"
        control-placeholder="输入菜单名称（必填*）"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="address.options"
        label-text="链接地址"
        label-class="class1"
        control-width="500px"
        control-placeholder="输入链接地址，如 '/address'"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="icon.options"
        label-text="菜单图标"
        label-class="class1"
        control-width="500px"
        control-placeholder="输入菜单图标，参考fontawesome 如'fa-search' http://fontawesome.dashgame.com/"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <!-- 这一段到时候放到版本管理里 -->
      <!-- <labeled-select-input
        v-model="edition.options"
        label-text="选择所属版本"
        label-class="class1"
        control-width="500px"
        control-placeholder="选择所属版本"
        :control-readonly="false"
        control-icon="fa-bolt"
        control-icontext=" select"
        :control-multiple="false"
        :data-sources="edition.data.sources"
        data-url
        data-displayfield="name"
      /> -->
      <button class="basebtn" type="submit" @click="confirm">确认添加</button>
      <button class="basebtn" type="button" @click="cancel">取消</button>
    </form>
    <p class="bg-success" v-if="succeed">操作成功！</p>
    <p class="bg-danger" v-if="failed">操作失败，请重试！</p>
  </div>
</template>

<script>
import labeledGridSelectInput from "~/components/labeledGridSelectInput";
import labeledSelectInput from "~/components/labeledSelectInput";
import labeledText from "~/components/labeledText";
import axios from "axios";
import config from "../common/api";
import baseBtn from "~/components/parts/baseBtn";

export default {
  components: {
    labeledText,
    labeledSelectInput,
    labeledGridSelectInput,
    baseBtn
  },
  data() {
    return {
      succeed: false,
      failed: false,
      icon: {
        options: {
          value: "",
          locked: false,
          required: false
        }
      },
      name: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      },
      address: {
        options: {
          value: "",
          locked: false,
          required: false
        }
      },

      edition: {
        options: {
          value: null,
          locked: false,
          required: false
        },
        data: {
          sources: []
        }
      },
      menuId: {
        options: {
          value: null,
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
    axios({
      method: "get",
      url: "http://" + config.host + "/Cargoorbs/API/admin/menu/listLinear",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {
      console.log("菜单", res);
      if (res.data.status === 1) {
        //console.log("返回数据成功");
        this.menuId.data.sources = res.data.data.data;
      } else {
      }
    });
  },
  mounted() {
    //console.log("this.$route in add", this.$route);
    //console.log("query in add", this.$route.query);
  },
  methods: {
    submit(e) {
      e.preventDefault();
      //console.log("提交");
      //console.log("id", this.labeledGridSelectInput.options.value);
      //console.log("name", this.labeledText.options.value);
      axios({
        method: "POST",
        url: "http://" + config.host + "/Cargoorbs/API/admin/menu/create",
        data: {
          name: this.name.options.value,
          url: this.address.options.value,
          menuId: this.menuId.options.value,
          icon: this.icon.options.value
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
    confirm(event) {
      //console.log("确定");
    },
    cancel(event) {
      event.preventDefault();
      //console.log("取消");
      this.$router.go(-1);
    }
  }
};
</script>