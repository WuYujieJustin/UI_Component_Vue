<template>
    <div class="translate">
        <h1>语言</h1>
        <h1>语言</h1>
        <table-list 
        :data="internationalList" 
        :title="title"
        @submit="update" 
        v-slot:default="row"><a href="#" @click="deleteg(row.row.id)">删除</a></table-list>
    </div>
</template>
<script>
import axios from "axios";
import config from "../common/api";
import tableList from "~/components/parts/tableList"

export default {
    components: {
        tableList
    },
  data() {
    return {
      internationalList:[],
      name:"",
      langCode:[1],
      translate:"",
      langcodeList:[],
      title:[
        {key:"id",title:"序号"},
        {key:"name",title:"词汇名称"},
        {key:"langCode",title:"语言代码"},
        {key:"translate",title:"翻译"}],
    };
  },
  methods: {
    add() {
      const that = this;
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/international/add",
        data:{
          name:that.name,
        },
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        //console.log(res)
      });
    },
    deleteg(id){
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/international/delete",
        data: {
          id:id
        },
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        console.log(res)
      });
    },
    update(data) {
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/international/update",
        data: data,
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        console.log(res)
      });
    },
    test(v){
      console.log("父级组件也监听到了呢")
      console.log(v)
    }
  },
  mounted(){
    const that = this;
      axios({
        method: "get",
        url:"http://"+config.host+"/admin/international/list",
        data: that.reqData,
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        that.internationalList=res.data.data
      });
      axios({
        method: "get",
        url:"http://"+config.host+"/admin/lang/list",
        data: that.reqData,
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
          let list=new Array(res.data.data.length)
          for(let QAQ=0; QAQ <res.data.data.length; QAQ++){
              list[QAQ]={
                  id:0,
                  code:"",
                  text: "",
              }
              console.log(QAQ)
              console.log(res.data.data[QAQ])
              console.log(res.data.data[QAQ].id)
              list[QAQ].id=res.data.data[QAQ].id
              list[QAQ].value=res.data.data[QAQ].code
              list[QAQ].text=res.data.data[QAQ].name
          }
        that.langcodeList=list
        console.log(list)
      });
  }
};
</script>
<style>
div.translate{
    width: 100%;
}
</style>
