<template>
  <div class="listview container">
    <header class="well" style="position:relative">
      <ListviewQuery
        :value="querysetting.length==0?value.query:querysetting"
        :key="ListviewTableKey"
        @query="queryEvent"
      />
    </header>
    <div class="groupbtn well" style=" width: 100%;margin-bottom: 0px">
      <div>
        <!-- 根据传入种类跳转到不同的新增页面 -->
        <button class="basebtn" type="submit" @click="doNew">添加</button>
        <button class="basebtn" @click="doEdit">编辑</button>
        <button class="basebtn" @click="doChange" v-if="this.value.type === 'edition'">更改对应菜单</button>
        <button class="basebtn" @click="doDel">删除</button>
        <button class="basebtn"
          v-for="(button,l) in value.button"
          :key="l"
          @click="handelClick(button.function)"
        >{{button.name}}</button>
      </div>
      <div>
        <button class="basebtn" @click="tableEditShow">表格设置</button>
        <button class="basebtn" @click="queryEditShow">查询设置</button>
      </div>
      <!-- <button @click="quickInput">批量输入</button> -->
    </div>
    <ListviewTable
      v-model="tableData"
      :data="value.data"
      :title="titleList.length==0?value.head:titleList"
      :key="ListviewTableKey"
      :limitSetting="value.pagination?value.pagesize:0"
      :multiSelect="multiSelect"
      :checkBox="value.checkBox"
      :displayId="displayId"
      :pagenumber="value.pagenumber"
      :pagelist="value.pagelist"
    />

    <DialogueBox ref="DialogueBox" v-model="tableEditDisplay" @close="refresh()">
      <ListviewTableSetting v-model="titleListForEdit" :data="value.head" />
      <button class="basebtn" @click="tableEditOk">确认</button>
      <button class="basebtn" @click="tableCancel">取消</button>
      <button class="basebtn" @click="reDefault();refresh()">恢复默认值</button>
    </DialogueBox>
    <DialogueBox ref="DialogueBox" v-model="queryEditDisplay" @close="refresh()">
      <ListviewQuerySetting v-model="querysettingForEdit" :data="value.query" />
      <button class="basebtn" @click="queryEditOk">确认</button>
      <button class="basebtn" @click="queryCancel">取消</button>
      <button class="basebtn" @click="queryRedefault();refresh()">恢复默认查询</button>
    </DialogueBox>
  </div>
</template>
<script>
import ListviewTable from "~/components/parts/ListviewTable";
import ListviewTableSetting from "~/components/parts/ListviewTableSetting";
import DialogueBox from "~/components/parts/DialogueBox";
import ListviewQuery from "~/components/parts/ListviewQuery";
import ListviewQuerySetting from "~/components/parts/ListviewQuerySetting";
export default {
  components: {
    ListviewTable,
    ListviewTableSetting,
    DialogueBox,
    ListviewQuery,
    ListviewQuerySetting
  },
  data() {
    return {
      type: "submit",
      tableData: [],
      isShowQuickInput: false,
      tableEditDisplay: false,
      queryEditDisplay: false,
      defaultValue: [],
      defaultQuery: [],

      titleList: [],
      titleListForEdit: [],

      querysetting: [],
      querysettingForEdit: [],

      ListviewTableKey: 0, //让它更新

      valueForEdit: []
    };
  },
  props: {
    value: Object,
    multiSelect: Boolean,
    displayId: Boolean
  },
  methods: {
    doDel(e) {
      console.log("点击删除");
      let delData = [];
      if (this.tableData && this.tableData.length > 0) {
        let confirmed = confirm(
          "确定要删除 " + this.tableData.length + " 条记录吗？"
        );
        if (confirmed) {
          console.log("准备删除");
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].hasOwnProperty("id")) {
              delData.push(this.tableData[i].id);
            }
          }
          this.$emit("delData", delData);
        }
      }
    },
    doChange(e) {
      console.log("点击修改版本菜单信息");
      //讲选中版本id传至新页面
      if (this.tableData.length === 1) {
        this.$router.push({
          path: "/menuInEdition",
          query: {
            type: this.value.type,
            id: this.tableData[0].id,
            name: this.tableData[0].name
          }
        });
      } else if (this.tableData.length > 1) {
        alert("只能同时编辑一条记录，请重新选择！");
        return;
      }
    },
    doNew(e) {
      // 根据传入种类跳转到不同的新增页面
      this.$router.push({
        path: "/add" + this.value.type,
        query: { type: this.value.type }
      });
    },
    doEdit(e) {
      // 根据传入种类跳转到不同的修改页面
      if (this.tableData.length === 1) {
        if (this.value.type == "organization") {
          let deptName = this.tableData[0].deptName;
          let deptId = this.tableData[0].deptId;
          this.$router.push({
            path: "/edit" + this.value.type,
            query: {
              type: this.value.type,
              id: this.tableData[0].id,
              text: deptName,
              deptId: deptId
            }
          });
        } else if (this.value.type == "Position") {
          let rollName = this.tableData[0].groupName;
          this.$router.push({
            path: "/edit" + this.value.type,
            query: {
              type: this.value.type,
              id: this.tableData[0].id,
              rollName: rollName
            }
          });
        } else if (this.value.type == "menu") {
          this.$router.push({
            path: "/edit" + this.value.type,
            query: {
              type: this.value.type,
              id: this.tableData[0].id,
              name: this.tableData[0].name,
              address: this.tableData[0].url,
              menuId: this.tableData[0].menuId,
              icon: this.tableData[0].icon
            }
          });
        } else if (this.value.type == "edition") {
          this.$router.push({
            path: "/edit" + this.value.type,
            query: {
              type: this.value.type,
              id: this.tableData[0].id,
              name: this.tableData[0].name
            }
          });
        }  else if (this.value.type == "user") {
          this.$router.push({
            path: "/edit" + this.value.type,
            query: {
              type: this.value.type,
              id: this.tableData[0].id,
              name: this.tableData[0].name
            }
          });
        }else {
          // 这里写其他类型 管理界面 需要展示的列的名称
        }
      } else if (this.tableData.length > 1) {
        alert("只能同时编辑一条记录，请重新选择！");
        return;
      }
    },
    handelClick(fun) {
      if (fun) {
        console.log("fun", typeof fun, fun);
        eval(fun);
      }
    },
    // quickInput(e){
    //   console.log("e",e)
    // },
    tableEditShow() {
      this.titleListForEdit = [].concat(this.titleList);
      this.tableEditDisplay = true;
    },
    queryEditShow() {
      this.querysettingForEdit = [].concat(this.querysetting);
      this.queryEditDisplay = true;
    },
    tableEditOk() {
      //this.titleList = [].concat(this.titleListForEdit.filter(ele=>ele.display==true));
      this.titleList = [].concat(this.titleListForEdit);
      //this.titleList =this.titleList.filter(ele=>ele.display==true);
      this.tableEditDisplay = false;

      this.valueForEdit[0].head = [].concat(this.titleListForEdit);
      this.$emit("settingChange", this.valueForEdit[0]);
      this.refresh();
    },
    queryEditOk() {
      this.querysetting = [].concat(this.querysettingForEdit);
      this.queryEditDisplay = false;

      this.valueForEdit[0].query = [].concat(this.querysettingForEdit);
      this.$emit("settingChange", this.valueForEdit[0]);
      this.refresh();
    },
    tableCancel() {
      this.tableEdit = [].concat(this.titleListForEdit);
      this.tableEditDisplay = false;
    },
    queryCancel() {
      this.querysetting = [].concat(this.querysettingForEdit);
      this.queryEditDisplay = false;
    },
    reDefault() {
      this.titleList = [].concat(this.defaultValue);
    },
    queryRedefault() {
      this.querysetting = [].concat(this.defaultQuery);
    },
    refresh() {
      this.ListviewTableKey++;
    },
    //触发query事件
    queryEvent(e) {
      // console.log("event事件触发",e);
      this.$emit("query", e);
    }
  },
  beforeMount() {
    for (let k in this.value.query) {
      this.value.query[k].display = true;
    }
    this.defaultValue = [].concat(this.value.head);
    this.defaultQuery = [].concat(this.value.query);

    this.valueForEdit = [].concat(this.value);
    // console.log("value.data", this.value.data);
  },
  watch: {
    value(val) {
      // console.log("value改变", val);
    }
  }
};
</script>


<style lang="less" scoped>
.listview {
  width: 800px;
  margin-top: 50px;
}

.groupbtn {
  width: 540px;
  display: flex;
  justify-content: space-between;
}
</style>
