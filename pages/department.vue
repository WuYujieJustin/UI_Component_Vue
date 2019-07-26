<template>
  <div class="setting">
    <ul>
      <tree v-if="treeNodes!=null" :treeNode="treeNodes" :rowName="'deptName'"
      v-slot:default="treeNode">
        <editableLableWithButton v-model="treeNode.treeNode.deptName" @submit="update(treeNode.treeNode)"/>
        <editableLableWithButton v-model="deptName" @submit="add(treeNode.treeNode.id)"/>
        <a href="#" @click="deletei(treeNode.treeNode.id)">删除</a>
      </tree>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import config from "../common/api";
import tree from "~/components/parts/tree.vue";
import editableLableWithButton from "~/components/parts/editableLableWithButton"

export default {
  components:{
    tree,
    editableLableWithButton
  },
  data() {
    return {
      apiUrl: "http://"+config.host+"/admin/department/add",
      deptName: "新建部门",
      treeNodes:null,
      log:console,
    };
  },
  computed: {},
  methods: {
    add(id) {
      const that = this;
      console.log(that);
      console.log(id)
      axios({
        method: "post",
        url:"http://"+config.host+"/admin/department/add",
        data: {
          deptName:that.deptName,
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
        url:"http://"+config.host+"/admin/department/update",
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
      url:"http://"+config.host+"/admin/department/delete",
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
        url:"http://"+config.host+"/admin/department/list",
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
