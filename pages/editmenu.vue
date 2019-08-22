<template>
  <div class="container" style="margin-top: 50px;">
    <div class="welcome well">
      <button class="basebtn" @click="$router.go(-1)">&lt;&lt;</button>
      <h3>welcome to EDIT page</h3>
      <p>type: {{$route.query.type}}</p>
      <p>id: {{$route.query.id}}</p>
      <p>name: {{$route.query.name}}</p>
      <p>address: {{$route.query.address}}</p>
      <p>menuId: {{$route.query.menuId}}</p>
      <p>icon: {{$route.query.icon}}</p>
    </div>

    <form action @submit="submit" class=" well">
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
        label-text="原名称"
        label-class="class1"
        control-width="500px"
        control-placeholder
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="name.options"
        label-text="新名称"
        label-class="class1"
        control-width="500px"
        control-placeholder="输入新名称"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="sourceAddress.options"
        label-text="原地址"
        label-class="class1"
        control-width="500px"
        control-placeholder
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="address.options"
        label-text="新地址"
        label-class="class1"
        control-width="500px"
        control-placeholder="输入新地址"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="sourceIcon.options"
        label-text="原icon"
        label-class="class1"
        control-width="500px"
        control-placeholder
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="icon.options"
        label-text="新icon"
        label-class="class1"
        control-width="500px"
        control-placeholder="输入新icon"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <!-- <labeled-grid-select-input
        v-model="sourceMenuId.options"
        label-text="原上级菜单"
        label-class="class1"
        control-width="500"
        control-placeholder="原上级菜单"
        :control-readonly="false"
        control-icon="fa-search"
        control-icontext
        :control-multiple="false"
        :data-sources="sourceMenuId.data.sources"
        data-url
        data-displayfield="name"
        data-columns="text"
      />-->
      <labeled-grid-select-input
        v-model="menuId.options"
        label-text="修改上级菜单"
        label-class="class1"
        control-width="500px"
        control-placeholder="修改上级菜单"
        :control-readonly="false"
        control-icon="fa-search"
        control-icontext
        :control-multiple="false"
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
      name: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      },
      sourceAddress: {
        options: {
          value: "",
          locked: true,
          required: false
        }
      },
      address: {
        options: {
          value: "",
          locked: false,
          required: false
        }
      },
      sourceIcon: {
        options: {
          value: "",
          locked: true,
          required: false
        }
      },
      icon: {
        options: {
          value: "",
          locked: false,
          required: false
        }
      },
      sourceMenuId: {
        options: {
          value: null,
          locked: true,
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
    this.sourceId.options.value = this.$route.query.id * 1;
    this.sourceName.options.value = this.$route.query.name;
    this.name.options.value = this.$route.query.name;
    this.sourceAddress.options.value = this.$route.query.address;
    this.address.options.value = this.$route.query.address;
    this.sourceIcon.options.value = this.$route.query.icon;
    this.icon.options.value = this.$route.query.icon;
    this.menuId.options.value = this.$route.query.menuId * 1;
    axios({
      method: "get",
      url: "http://" + config.host + "/Cargoorbs/API/admin/menu/listLinear",
      headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
    }).then(res => {
      //console.log("部门组织结构树返回数据", res);
      if (res.data.status === 1) {
        //console.log("返回数据成功");
        // console.log("res.data.data.data", res.data.data.data);
        this.menuId.data.sources = res.data.data.data;
        if (this.refresh >= 1 && this.refresh < 10) {
          this.sourceRefresh++;
          this.refresh++;
        } else {
          this.sourceRefresh = 1;
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
        url: "http://" + config.host + "/Cargoorbs/API/admin/menu/update",
        data: {
          id: this.$route.query.id,
          name:this.name.options.value,
          url:this.address.options.value,
          menuId:this.menuId.options.value,
          icon:this.icon.options.value,
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