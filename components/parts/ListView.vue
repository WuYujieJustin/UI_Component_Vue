<template>
  <div>
    <header>
      <ListviewQuery
        :value="querysetting.length==0?value.query:querysetting"
        :key="ListviewTableKey"
      />

      <div>
        <button v-for="(button,l) in value.button" :key="l">{{button.name}}</button>
        <button @click="tableEditShow">表格设置</button>
        <button @click="queryEditShow">查询设置</button>
        <!-- <button @click="quickInput">批量输入</button> -->
      </div>
    </header>

    <ListviewTable
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
      <button @click="tableEditOk">确认</button>
      <button @click="tableCancel">取消</button>
      <button @click="reDefault();refresh()">恢复默认值</button>
    </DialogueBox>
    <DialogueBox ref="DialogueBox" v-model="queryEditDisplay" @close="refresh()">
      <ListviewQuerySetting v-model="querysettingForEdit" :data="value.query" />
      <button @click="queryEditOk">确认</button>
      <button @click="queryCancel">取消</button>
      <button @click="queryRedefault();refresh()">恢复默认查询</button>
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
      isShowQuickInput: false,
      tableEditDisplay: false,
      queryEditDisplay: false,
      defaultValue: [],
      defaultQuery: [],

      titleList: [],
      titleListForEdit: [],

      querysetting: [],
      querysettingForEdit: [],

      ListviewTableKey: 0 ,//让它更新

      valueForEdit:[],
    };
  },
  props: {
    value: Object,
    multiSelect: Boolean,
    displayId: Boolean
  },
  methods: {
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
      this.titleList= [].concat(this.titleListForEdit)
      this.tableEditDisplay = false;

      this.valueForEdit[0].head=[].concat(this.titleListForEdit)
      this.$emit("settingChange", this.valueForEdit[0])
      this.refresh();
    },
    queryEditOk() {
      this.querysetting= [].concat(this.querysettingForEdit)
      this.queryEditDisplay = false;
      
      this.valueForEdit[0].query= [].concat(this.querysettingForEdit)
      this.$emit("settingChange", this.valueForEdit[0])
      this.refresh();
    },
    tableCancel() {
      this.tableEdit = [].concat(this.titleListBeforeEdit);
    },
    queryCancel() {
      this.querysetting = [].concat(this.querysettingBeforeEdit);
    },
    reDefault() {
      this.titleList = [].concat(this.defaultValue);
    },
    queryRedefault() {
      this.querysetting = [].concat(this.defaultQuery);
    },
    refresh() {
      this.ListviewTableKey++;
    }
  },
  beforeMount() {
    this.defaultValue = [].concat(this.value.head);
    this.defaultQuery = [].concat(this.value.query);

    this.valueForEdit = [].concat(this.value);
  }
};
</script>
<style>
</style>