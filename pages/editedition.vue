<template>
  <div>
    <div class="welcome">
      <p>welcome to EDIT page</p>
      <p>type:{{$route.query.type}}</p>
      <p>id:{{$route.query.id}}</p>
      <p>name:{{$route.query.name}}</p>
      <button @click="$router.go(-1)">返回</button>
    </div>

    <form action @submit="submit">
      <labeled-number-input
        v-model="sourceId.options"
        label-text="ID"
        label-class="class1"
        control-width="500"
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
        control-width="500"
        control-placeholder
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <labeled-text
        v-model="name.options"
        label-text="新名称"
        label-class="class1"
        control-width="500"
        control-placeholder="输入新名称"
        :control-readonly="false"
        control-icon="fa-refresh fa-spin fa-fw"
        control-icontext=" "
      />
      <button type="submit" @click="confirm">确认修改</button>
      <button @click="cancel">取消</button>
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
    };
  },
  created() {
    this.sourceId.options.value = this.$route.query.id * 1;
    this.sourceName.options.value = this.$route.query.name;
    this.name.options.value = this.$route.query.name;
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
        url: "http://" + config.host + "/Cargoorbs/API/admin/version/update",
        data: {
          id: this.$route.query.id,
          name: this.name.options.value,
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