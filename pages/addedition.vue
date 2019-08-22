<template>
  <div class="container" style="margin-top: 50px;">
    <button  class="basebtn" @click="$router.go(-1)">&lt;&lt;</button>

    <h3>welcome to ADD page</h3>

    <span>type:{{$route.query.type}}</span>
    <form action @submit="submit" class=" well" style="margin-top: 30px;">

      <labeled-text
        v-model="labeledText.options"
        label-text="版本名称"
        label-class="class1"
        control-width="500px"
        control-placeholder="输入版本名称"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <button class="basebtn" type="submit" @click="confirm">确认添加</button>
      <button class="basebtn" @click="cancel">取消</button>
    </form>
    <p class="bg-success" v-if="succeed">操作成功！</p>
    <p class="bg-danger" v-if="failed">操作失败，请重试！</p>
  </div>
</template>

<script>
import labeledText from "~/components/labeledText";
import axios from "axios";
import config from "../common/api";

export default {
  components: {
    labeledText,
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
    };
  },
  created() {
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
        url: "http://" + config.host + "/Cargoorbs/API/admin/version/create",
        data: {
          name: this.labeledText.options.value,
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
      e.preventDefault()
      //console.log("取消");
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
  .form-group {
    align-items: center;
  }
  .coontrol-label {
    text-align: right;
  }
</style>