<template>
  <div class="container-example">
    <div>
      <p>父组件的value：{{value}}</p>
      <input type="text" v-model="value" />
      <br />
      <h3>文本控件</h3>
      <i-input-text v-model="value" label="文本控件" placeholder="placeholder" readonly="readonly" />
      <h3>多行文本控件</h3>
      <i-input-textarea v-model="value" label="多行文本控件" placeholder="placeholder" />
      <h3>普通单选</h3>
      <p>select内的options{{options2show}}</p>
      <button v-on:click="addOption">增加选项</button>
      <button v-on:click="dropOption">减少选项</button>
      <i-input-select :options="options" label="单选" v-model="selectOutput" />
      <p>父组件接收到的单选数据{{selectOutput}}</p>
      <h3>普通多选</h3>
      <i-input-select
        :options="options"
        multi
        label="多选"
        outputField="id,value,blablalblba"
        displayField="text,value"
        v-model="selectMultiOutput"
      />
      <!-- v-on:output="showSelectMultiOutput" -->

      <p>父组件接收到的多选数据{{selectMultiOutput}}</p>
      <h3>列表单选</h3>
      <p>列表内的lists{{lists2show}}</p>
      <button v-on:click="addList">增加选项</button>
      <button v-on:click="dropList">减少选项</button>
      <i-input-select-list :lists="lists" label="列表单选" v-model="selectListOutput" />
      <p>父组件接收到的单选数据{{selectListOutput}}</p>
      <h3>列表多选</h3>
      <i-input-select-list :lists="lists" multi label="列表多选" v-model="selectListMultiOutput" />
      <p>父组件接收到的多选数据{{selectListMultiOutput}}</p>

      <h3>多选列表</h3>
      <i-input-select-list 
        :lists="testLists"
        multi
        label="列表多选"
        v-model="test"
          displayField="describe"
        placeholder="请选择学校"
        outputField="id"
      />
      <p>父组件接收到的多选数据{{test}}</p>

    </div>
  </div>
</template>

<script>

import comLabel from "~/components/comLabel.vue";
import IInputText from "~/components/IInputText.vue";
import IInputTextarea from "~/components/IInputTextarea.vue";
import IInputSelect from "~/components/IInputSelect.vue";
import IInputSelectList from "~/components/IInputSelectList.vue";

export default {
  components: {
    comLabel,
    IInputText,
    IInputTextarea,
    IInputSelect,
    IInputSelectList
  },
  data() {
    return {
      value: "",
      options: [
        { id: 1, value: 1, text: "雨女1瓜" },
        { id: 2, value: 2, text: "雨女2瓜" }
      ],
      lists: [
        { id: 1, code: 1, text: "詹姆斯邦德001", 英文名称: "JamesBond001" },
        { id: 2, code: 2, text: "詹姆斯邦德002", 英文名称: "JamesBond002" }
      ],
      selectOutput: [1],
      selectMultiOutput: [1, 2],
      selectListOutput: [1],
      selectListMultiOutput: [1],
      testLists: [{ id: 1, code:"A", text: "A学校", describe: "这是A学校" },
        { id: 2, code:"B", text: "B学校", describe: "这是B学校" }],
        test:[]
    };
  },
  computed: {
    options2show: function() {
      return JSON.stringify(this.options);
    },
    lists2show: function() {
      return JSON.stringify(this.lists);
    }
  },
  methods: {
    addOption: function() {
      if (this.options.length === 0) {
        console.log("options 没了");
        this.options = this.options.concat([
          { id: 1, value: 1, text: "雨女1瓜" },
          { id: 2, value: 2, text: "雨女2瓜" }
        ]);
      } else {
        var newValue = this.options[this.options.length - 1].value * 1 + 1;
        var newOption = [];
        newOption.push({
          id: newValue,
          value: newValue,
          text: "雨女" + newValue + "瓜"
        });
        this.options = this.options.concat(newOption);
      }
    },
    dropOption: function() {
      this.options.pop();
    },
    addList: function() {
      if (this.lists.length === 0) {
        console.log("lists 没了");
        this.lists = this.lists.concat([
          {
            id: 1,
            code: 1,
            text: "詹姆斯邦德001",
            英文名称: "JamesBond001"
          },
          {
            id: 2,
            code: 2,
            text: "詹姆斯邦德002",
            英文名称: "JamesBond002"
          }
        ]);
      } else {
        var newValue = this.lists[this.lists.length - 1].id * 1 + 1;
        var newOption = [];
        newOption.push({
          id: newValue,
          code: newValue,
          text: "詹姆斯邦德00" + newValue,
          英文名称: "JamesBond00" + newValue
        });
        this.lists = this.lists.concat(newOption);
      }
    },
    dropList: function() {
      this.lists.pop();
    }
  }
};
</script>

<style lang="less">
.container-example {
  margin-left: 260px;
  li.active,
  tr.active {
    background-color: blanchedalmond;
  }
  .inputBox {
    border: 1px solid #ccc;
    position: relative;
    cursor: text;
    .divBox {
      overflow: hidden;
      span {
        float: left;
        color: #333;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 26px;
        margin: 4px 2px;
        padding: 0 0.25em;
        line-height: 26px;
      }
      i {
        cursor: pointer;
      }
      input {
        margin-top: 4px;
        float: left;
        border: 0;
        outline: none;
      }
    }
    .readonly {
      background-color: rgba(0, 0, 0, 0.1);
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 100;
    }
  }
  ul,
  table {
    width: 100%;
    min-height: 100px;
    max-height: 300px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    box-shadow: -2px 0 5px #ccc,
        0 5px 8px #ccc,
        2px 0 5px #ccc;
    li,
    tr {
      text-align: left;
      padding-left: 10px;
      cursor: pointer;
      &:hover {
        background: rgb(245, 245, 245);
      }
    }
    tr {
      text-align: center;
    }
  }
 
}
</style>
