
<template>
  <div class="example">
    <div class="all-select-input">
      <div class="inputBox">
        <div :class="{'readonly':readonly}"></div>
        <div class="divBox" @click="handleInput" v-on:mousedown="tableMousedown"
          :style="{'padding-right':icon?'33px':0}"
        >
          <span v-for="obj in selectedData" :key="obj.id">
            {{displayData(obj,displayField)}}
            <span
              class="close"
              aria-label="Close"
              v-on:click.stop="removeSelected"
              :data-id="obj.id"
              aria-hidden="true"
            >&times;</span>
          </span>
          <input
            class="form-control"
            type="text"
            ref="input"
            :style="{'width':(selectedData.length>0?'50%':'100%'),'padding-right':(selectedData.length>0?'0px':'32px')}"
            v-on:focus="toggleTable"
            v-on:blur="toggleTable"
            v-on:keyup.backspace="deleteSeleted"
            v-on:keydown.enter="enterPreventDefault"
            v-on:keyup.up="up"
            v-on:keyup.down="down"
            v-on:keyup.enter="enter"
            :placeholder="placeholder"
            v-on:input="input"
            :required="required"
            :value="value"
          />
        </div>
        <span class="i-container">
    <i v-if="icon" v-bind:class="'fa ' + icon"  aria-hidden="true"></i>

    <i class="fa fa-chevron-down select" v-else-if="!icon && downArrow" aria-hidden="true"></i>
    <i class="fa fa-chevron-up select" v-else aria-hidden="true"></i>
        </span>

        <div
          class="table_box"
          ref="scrollDiv"
          v-on:mousedown="tableMousedown"
          v-if="showTable"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <table ref="table" class="table table-bordered table-hover">
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
                :ref="index"
                v-on:click="trClick(list.id,index)"
                :data-id="list.id"
                :data-index="index"
                :class="hasClass(list.id,index)"
              >
                <td>{{index+1}}</td>
                <td v-for="(value,key) in list" :key="key">{{value}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedData: [],
      showTable: false,
      currentTr: 0,
      downArrow: true
    };
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    //父组件传入的选项数据
    lists: {
      type: Array,
      default: []
    },
    //自定义列头
    colNames: {
      type: String,
      default: ""
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
      default: "表格下拉框"
    },
    //传入的默认显示文字
    placeholder: {
      type: String,
      default: "请选择"
    },    
    icon: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false
    },
    //是否多选
    multi: {
      type: Boolean,
      default: false
    },
    //是否有操作符
    operator: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    theads: function() {
      if (this.lists && this.lists.length > 0) {
        if (this.colNames) {
          var theads = this.colNames.split(",");
        }
        if (theads && theads.length == Object.keys(this.lists[0]).length) {
          return theads;
        }
        //拿到列头
        return Object.keys(this.lists[0]);
      }
    }
  },
  mounted() {
    // console.log("SL数据挂载执行完毕，打印value", this.value);
    if (
      this.lists &&
      this.lists.length > 0 &&
      this.value &&
      this.value.length > 0 &&
      this.selectedData &&
      this.selectedData.length == 0
    ) {
      //数据已经挂载，外部传入value（选中的信息），将对应value显示出来
      // console.log("SL该自动选中列表咯");
      var that = this;
      that.value.forEach(function(num) {
        that.lists.forEach(function(obj, index) {
          if (obj.id == num) {
            // console.log("obj", obj);
            that.selectedData.push(obj);
          }
        });
      });
    }
  },
  methods: {
    input: function(event) {
      // console.log("input event", event);
      event.target.value = this.value;
      if (
        event.inputType === "deleteContentBackward" ||
        event.inputType === "deleteContentForward"
      ) {
        this.selectedData.pop();
        this.value.pop();
      }
    },
    mouseenter: function() {
      // console.log("mouseEnter");
      this.$refs[this.currentTr][0].classList.remove("hover");
    },
    mouseleave: function() {
      // console.log("mouseLeave");
    },
    //将选中的记录按照父组件要求的内容输出
    //传入的输出字段，遍历，找到第一个能输出的字段，结束。若找不到，则默认输出id
    forOutput: function(obj, str) {
      // console.log("forOutput 里面的obj", obj);
      let output = "";
      let arr = str.split(",");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] in obj) {
          output = obj[arr[i]];
          return output;
        }
      }
      output = obj.id;
      if (!output) {
        output = "未找到需要输出的列，请重新设置！";
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
          return showStr;
        }
      }
      showStr = obj.text;
      if (!showStr) {
        showStr = "请确认数据对象中是否含有‘text’属性";
      }
      return showStr;
    },
    enterPreventDefault(event){
      event.preventDefault()
    },
    enter: function(event) {
      event.preventDefault();
      event.target.value = event.target.value.replace(/\s+/g, "");
      let id = this.$refs[this.currentTr][0].dataset.id;
      // console.log("this.currentTr", this.currentTr);
      // this.$options.methods.trClick(id,this.currentTr)
      this.trClick(id, this.currentTr);
    },
    up: function(event) {
      if (this.currentTr === 0) {
        return;
      }
      // console.log("按上键", event);
      //控制滚动
      if (
        this.$refs.scrollDiv.scrollHeight > this.$refs.scrollDiv.clientHeight
      ) {
        // console.log("ul有滚动条")
        // if (this.currentTr > 6) {
        //   this.$refs[this.currentTr - 6][0].scrollIntoView();
        // } else {
        //   this.$refs.table.scrollIntoView();
        // }
          if (this.currentTr < 6) {
          // this.$refs[this.currentTr - 6][0].scrollIntoView();
        } else {
          this.$refs[this.currentTr][0].scrollIntoView(false);
        }
      } else {
        // console.log("ul没有滚动条")
      }
      this.$refs[this.currentTr][0].classList.remove("hover");
      this.$refs[this.currentTr - 1][0].classList.add("hover");
      this.currentTr--;
    },
    down: function(event) {
      event.preventDefault();

      // console.log("按下键", event);
      // this.scrollTop+=20
      // this.$refs.scrollDiv.scrollTop=this.scrollTop
      if (this.lists && this.currentTr === this.lists.length - 1) {
        return;
      }
      this.$refs[this.currentTr][0].classList.remove("hover");

      //控制滚动
      if (
        this.$refs.scrollDiv.scrollHeight > this.$refs.scrollDiv.clientHeight
      ) {
        // console.log("ul有滚动条")
        // if (this.currentTr > 4) {
        //   this.$refs[this.currentTr - 4][0].scrollIntoView();
        // } else {
        //   this.$refs.table.scrollIntoView();
        // }
        if (this.currentTr > 6) {
          this.$refs[this.currentTr + 1][0].scrollIntoView(false);
        } else {
          // this.$refs.table.scrollIntoView();
        }
      } else {
        // console.log("ul没有滚动条")
      }

      this.$refs[this.currentTr + 1][0].classList.add("hover");
      this.currentTr++;
    },
    deleteSeleted: function(event) {
      // console.log("按键事件", event);
      if (event.target.value === "" && this.selectedData) {
        this.selectedData.pop();
        this.value.pop();
      }
    },
    //检测tr是否应该显示底色
    hasClass: function(id, index) {
      var result = "";
      if (
        this.selectedData.some(function(dataObj) {
          return dataObj.id == id;
        })
      ) {
        result += "active1 ";
      }
      if (index === 0) {
        result += "hover ";
      }
      return result;
    },
    //展示选项
    toggleTable: function() {
      if (this.showTable === true) {
        this.showTable = false;
        this.downArrow = true;
      } else {
        this.showTable = true;
        //当前行数设为第一行
        this.currentTr = 0;
        this.downArrow = false;
        this.scrollTop = 0;
      }
    },
    //点击选项时阻止input的blur事件
    tableMousedown: function(event) {
      event.preventDefault();
    },
    //每一行点击事件
    trClick: function(id, index) {
      // console.log("index", index);
      // console.log("this", this);
      // console.log("this.$refs", this.$refs);

      const classList = this.$refs[index][0].classList;
      //找到点击项目的id
      const clickItemId = id;
      const indexInLists = index;
      //如果已有class，清掉
      if (classList.contains("active1")) {
        classList.remove("active1");
        this.selectedData = this.selectedData.filter(function(item) {
          return item.id != clickItemId;
        });
        let indexInValue = this.value.indexOf(clickItemId * 1);
        if (indexInValue != -1) {
          this.value.splice(indexInValue, 1);
        }
        // this.$emit("input", this.value);
        if (this.value.length === 0) {
          // console.log("this.$refs.input", this.$refs.input);
          this.$refs.input.value = "";
        }
      } else {
        //如果单选模式
        if (!this.multi) {
          this.selectedData = [];
          while (this.value && this.value.length > 0) {
            this.value.pop();
          }
        }
        //多选模式
        classList.add("active1");
        this.selectedData.push(this.lists[indexInLists]);
        //用于输出
        // console.log("this.value", this.value);
        this.value.push(
          this.$options.methods.forOutput(
            this.lists[indexInLists],
            this.outputField
          )
        );
        // this.$emit("input", this.value);
      }
    },
    handleInput() {
      this.$refs.input.focus();
    },
    //删除选中的那条记录
    removeSelected: function(event) {
      // console.log("event", event);
      const selectedId = event.target.dataset.id;
      this.selectedData = this.selectedData.filter(function(item) {
        return item.id != selectedId;
      });
      let index = this.value.indexOf(selectedId * 1);
      if (index != -1) {
        this.value.splice(index, 1);
      }
      if (this.value.length === 0) {
        // console.log("this.$refs.input", this.$refs.input);
        this.$refs.input.value = "";
      }
      // this.$emit("input", this.value);
    }
  }
};
</script>
<style lang="less" scoped>
@import "@/assets/font-awesome-4.7.0/css/font-awesome.min.css";


.table_box {
  margin-top: 10px;
  min-width: 50%;
  min-height: 100px;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  position: absolute;
  background-color: #fff;
  z-index: 1;
  padding: 0 20px 0 0;
  table,
  th,
  td {
    border: 1px solid #ccc;
  }
  table {
    position: relative;
  }
  thead {
    background-color: lightblue;
    color: white;
    th {
      text-align: center;
    }
  }
  th,
  td {
    padding: 5px;
  }
  // tr.active {
  //   background-color: wheat;
  // }
}
// span {
//   line-height: 1.1;
//   position: relative;
// }
// span .fa {
//   position: relative;
//   right: 0;
//   top: 0;
// }
// .fa {
//   position: absolute;
//   right: 10px;
//   top: 9px;
// }


.example table tbody tr.active1 {
  background: #ddd;
}
.example table tbody tr.hover {
  background: rgb(245, 245, 245);
}
</style>
