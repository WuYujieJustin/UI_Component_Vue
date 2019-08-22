<template>
  <div class="container" style="margin-top: 50px;">
    <form @submit="submit">
      <labeled-text
        v-model="user.options"
        label-text="输入用户名"
        label-class="class1"
        control-width="500"
        control-placeholder="输入用户名"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="email.options"
        label-text="输入邮箱"
        label-class="class1"
        control-width="500"
        control-placeholder="输入邮箱"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="lang.options"
        label-text="输入语言"
        label-class="class1"
        control-width="500"
        control-placeholder="输入语言"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="dep.options"
        label-text="输入部门id"
        label-class="class1"
        control-width="500"
        control-placeholder="输入部门id"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="group.options"
        label-text="输入用户组"
        label-class="class1"
        control-width="500"
        control-placeholder="输入用户组"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <button class="basebtn" type="submit">添加</button>
    </form>
    <p class="bg-success" v-if="succeed">操作成功！</p>
    <p class="bg-danger" v-if="failed">操作失败，请重试！</p>
  </div>
</template>


<script>
import axios from "axios";
import config from "../common/api";
import labeledText from "~/components/labeledText";
import labeledTextArea from "~/components/labeledTextArea";
import labeledSelectInput from "~/components/labeledSelectInput";
import labeledGridSelectInput from "~/components/labeledGridSelectInput";
import labeledDateTimeInput from "~/components/labeledDateTimeInput";
import labeledNumberInput from "~/components/labeledNumberInput";

export default {
  components: {
    labeledText,
    labeledTextArea,
    labeledSelectInput,
    labeledGridSelectInput,
    labeledDateTimeInput,
    labeledNumberInput
  },
  data() {
    return {
      tableList: [],
      succeed: false,
      failed: false,
      user: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      },
      dep: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      },
      group: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      },
      email: {
        options: {
          value: "",
          locked: false,
          required: true
        }
      },
      lang: {
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
        url: "http://" + config.host + "/Cargoorbs/API/admin/user/add",
        data: {
          email: this.email.options.value,
          username:this.user.options.value,
          lang:this.lang.options.value,
          deptid:this.dep.options.value,
          groupid:this.group.options.value,
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