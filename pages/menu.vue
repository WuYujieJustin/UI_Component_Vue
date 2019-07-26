<template>
  <div class="setting">
    <ul>
      <tree v-if="treeNodes!=null" :treeNode="treeNodes" :rowName="'name'"
      v-slot:default="treeNode">
        <a :href="treeNode.treeNode.address">{{treeNode.treeNode.name}}</a>
        <a href="#">新建</a>
        <a href="#">编辑</a>
        <a href="#" @click="deletei(treeNode.treeNode.id)">删除</a>
      </tree>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import config from "../common/api";
import tree from "~/components/parts/tree.vue";

export default {
  components:{
    tree,
  },
  data() {
    return {
      name: "name",
      treeNodes:null,
      log:console,
    };
  },
  computed: {},
  methods: {
    request(id) {
      const that = this;
      console.log(that);
      console.log(id)
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/menu/add",
        data: {
          name:that.name,
          deptId:id
        },
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        //console.log(res.data.posts)
        //that.posts = res.data.posts;
        that.info=res;
      });
    },
    update(data) {
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/menu/update",
        data: data,
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        console.log(res)
      });
    },
    deletei(id){
    const that = this;
    axios({
      method: "post",
      url:"http://"+config.host+"/admin/menu/delete",
        data:{
          id:id
        },
        headers:{
          Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"
        }
    }).then(function(res) {
        that.info=res;
    });
  }
  

  },

  created() {
    const that = this;
    axios({
        method: "get",
        url:"http://"+config.host+"/admin/menu/list",
        headers:{Authorization:"cb401ee5-2b5a-4c44-996d-71679e77cfdd"}
      }).then(function(res) {
        //console.log(res)
        that.treeNodes=res.data.data;
      });
  },
};
</script>
<style>
li{
    padding-left: 40px;
}
</style>
