<template>
  <div class="container" style="margin-top: 50px;">
    <form @submit="submit">
      <div class="form-group">
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
      </div>

      <button class="basebtn" type="submit">添加</button>
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
    labeledText
  },
  data() {
    return {
      tableList: [],
      succeed: false,
      failed: false,
      labeledText: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      }
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      //console.log("提交");
      //console.log("id", this.labeledGridSelectInput.options.value);
      //console.log("name", this.labeledText.options.value);
      axios({
        method: "POST",
        url: "http://" + config.host + "/Cargoorbs/API/admin/group/add",
        data: {
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
  }
};
</script>