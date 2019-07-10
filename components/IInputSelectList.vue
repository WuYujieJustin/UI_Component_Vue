<template>
  <div class="example">
    <label>{{ label || "这是默认文本标签"}}</label>

    <div v-if="multi">
      <p>多选的数据：{{selectedData}}</p>
      <p>输出的数据：{{value}}</p>
    </div>
    <div v-else>
      <p>单选的数据：{{selectedData}}</p>
      <p>输出的数据：{{value}}</p>
    </div>

    <div class="inputBox">
      <div :class="{'readonly':readonly}"></div>
      <div class="divBox" @click="handleInput" v-on:mousedown="tableMousedown">
        <span v-for="obj in selectedData" :key="obj.id">
          {{displayData(obj,displayField)}}
          <i v-on:click.stop="removeSelected" :data-id="obj.id">x</i>
        </span>
        <input
          type="text"
          ref="input"
          :style="{'width':selectedData.length>0?'30%':'100%'}"
          v-on:focus="toggleTable"
          v-on:blur="toggleTable"
          v-on:keydown="handleKeyDown"
          :placeholder="placeholder"
          :readonly="readonly"
        />
      </div>
    </div>
    <div class="table_box">
    <table v-if="showTable" v-on:mousedown="tableMousedown">
      <thead>
        <tr v-if="theads">
          <th>序号</th>
          <th v-for="thead in theads" :key="thead">{{thead}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(list,index) in lists"
          :key="index"
          v-on:click="trClick"
          :class="hasClass(list)?'active':''"
        >
          <td>{{index+1}}</td>
          <td v-for="(value,key) in list" :key="key">{{value}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedData: [],
      outputData: [],
      showTable: false
    };
  },
  props: {
    //父组件传入的选项数据
    lists: {
      type: Array,
      default: []
    },
    //用于指定组件输出的字段
    outputField: {
      type: String,
      default: "id"
    },
    //用于指定组件用于显示的字段
    displayField: {
      type: String,
      default: "text"
    },
    //组件传出的数据
    value: {
      type: Array
    },
    //传入的label文本内容
    label: {
      type: String,
      default: "下拉选择控件"
    },
    //传入的默认显示文字
    placeholder: {
      type: String,
      default: "请选择"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    //是否多选
    multi: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    theads: function() {
      if (this.lists && this.lists.length > 0) {
        //拿到列头
        return Object.keys(this.lists[0]);
      }
    }
  },
  mounted() {
    console.log("SL数据挂载执行完毕，打印value", this.value);
    if (
      this.lists &&
      this.lists.length > 0 &&
      this.value &&
      this.value.length > 0 &&
      this.selectedData &&
      this.selectedData.length == 0
    ) {
      //数据已经挂载，外部传入value（选中的信息），将对应value显示出来
      console.log("SL该自动选中列表咯");
      var that = this;
      that.value.forEach(function(num) {
        that.lists.forEach(function(obj, index) {
          if (obj.id == num) {
            console.log("obj", obj);
            that.selectedData.push(obj);
          }
        });
      });
    }
  },
  methods: {
    //将选中的记录按照父组件要求的内容输出
    //传入的输出字段，遍历，找到第一个能输出的字段，结束。若找不到，则默认输出id
    forOutput: function(obj, str) {
      let output = "";
      let arr = str.split(",");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] in obj) {
          output = obj[arr[i]];
          break;
        }
      }
      if (!output) {
        output = "请确认数据对象中是否含有‘id’属性";
      }
      return output;
    },
    /**
     * 自定义选中后需要显示的字段
     * 如果调用时不传显示字段，则默认显示“text”字段的值
     * 如果传值，则split，找到第一个能用于展示的字段，
     * 若都没找到，则展示“text”字段对应的值，如果数据对象里没有text，则给出提示
     */
    displayData: function(obj, str) {
      let showStr = "";
      let arr = str.split(",");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] in obj) {
          showStr = obj[arr[i]];
          break;
        }
      }
      if (!showStr) {
        showStr = "请确认数据对象中是否含有‘text’属性";
      }
      return showStr;
    },
    handleKeyDown: function(event) {
      if (
        event.target.value === "" &&
        event.key === "Backspace" &&
        this.selectedData
      ) {
        this.selectedData.pop();
        this.value.pop();
      }
    },
    //检测tr是否应该显示底色
    hasClass: function(list) {
      console.log("hasClass传入的option", list);
      return this.selectedData.some(function(dataObj) {
        return dataObj.id == list.id;
      });
    },
    //展示选项
    toggleTable: function() {
      if (this.showTable === true) {
        this.showTable = false;
      } else {
        this.showTable = true;
      }
    },
    //点击选项时阻止input的blur事件
    tableMousedown: function(event) {
      event.preventDefault();
    },
    //每一行点击事件
    trClick: function(event) {
      console.log("tr click event", event);
      console.log("rowIndex", event.target.parentNode.rowIndex);
      console.log(
        "children[1].innerText",
        event.target.parentNode.children[1].innerText
      );
      console.log("event.target.innerText", event.target.innerText);

      const cssList = event.target.parentNode.classList;
      const clickItemId = event.target.parentNode.children[1].innerText;

      //如果已有class，清掉
      if (cssList.contains("active")) {
        cssList.remove("active");
        this.selectedData = this.selectedData.filter(function(item) {
          return item.id != clickItemId;
        });
        let index = this.value.indexOf(clickItemId * 1);
        if (index != -1) {
          this.value.splice(index, 1);
        }
        this.$emit("input", this.value);
      } else {
        //如果单选模式
        if (!this.multi) {
          this.selectedData = [];
          while (this.value && this.value.length > 0) {
            this.value.pop();
          }
        }
        //多选模式
        cssList.add("active");
        this.selectedData.push(
          this.lists[event.target.parentNode.rowIndex - 1]
        );
        //用于输出
        this.value.push(
          this.$options.methods.forOutput(
            this.lists[event.target.parentNode.rowIndex - 1],
            this.outputField
          )
        );
        this.$emit("input", this.value);
      }
    },
    handleInput() {
      this.$refs.input.focus();
    },
    //删除选中的那条记录
    removeSelected: function(event) {
      console.log("event", event);
      const selectedId = event.target.dataset.id;
      this.selectedData = this.selectedData.filter(function(item) {
        return item.id != selectedId;
      });
      let index = this.value.indexOf(selectedId * 1);
      if (index != -1) {
        this.value.splice(index, 1);
      }
      this.$emit("input", this.value);
    }
  }
};
</script>
<style lang="less" scoped>
.table_box {
  width: 100%;
  min-height: 100px;
  max-height: 300px;
  overflow: scroll;
}
</style>
