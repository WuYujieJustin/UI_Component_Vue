
<template>
  <div class="example" ref="example">
    <div class="all-select-input">
      <div class="inputBox">
        <div :class="{'readonly':readonly}"></div>
        <div class="divBox" @click="handleInput" v-on:mousedown="tableMousedown">
          <!-- <span v-for="obj in selectedData" :key="obj.id">
            {{displayData(obj,displayField)}}
            <span
              class="close"
              aria-label="Close"
              v-on:click.stop="removeSelected"
              :data-id="obj.id"
              aria-hidden="true"
            >&times;</span>
          </span>-->
          <span ref="span0" v-if="selectedData.length>0">
            {{displayData(selectedData[0],displayField)}}
            <span
              class="close"
              aria-label="Close"
              v-on:click.stop="removeSelected"
              :data-id="selectedData[0].id"
              aria-hidden="true"
            >&times;</span>
          </span>

          <span v-if="selectedData.length>1" ref="span1">+ {{selectedData.length-1}}…</span>
          <input
            class="form-control"
            type="text"
            :style="{'width':(selectedData.length>0?(inputwidth+'px'):'100%'),'padding-right':selectedData.length===0?spanwidth+'px':0}"
            ref="input"
            v-on:focus="toggleTable"
            v-on:blur="toggleTable"
            v-on:keyup.backspace="deleteSeleted"
            v-on:keydown.enter="enterPreventDefault"
            v-on:keyup.up="up"
            v-on:keyup.down="down"
            v-on:keyup.enter="enter"
            :placeholder="placeholder"
            v-on:input="input"
            :required="selectedData.length>0?false:required"
          />
        </div>
        <span class="i-container" ref="ispan" @click="inputfocus" v-on:mousedown="tableMousedown">
          <i v-if="icon" v-bind:class="'fa ' + icon" aria-hidden="true">{{icontext}}</i>

          <i class="fa fa-chevron-down select" v-else-if="!icon && downArrow" aria-hidden="true"></i>
          <i class="fa fa-chevron-up select" v-else aria-hidden="true"></i>
        </span>

        <div
          :style="{'position':fixed?'fixed':'absolute','top':topDiv}"
          class="table_box"
          ref="scrollDiv"
          v-if="showTable"
          v-on:mousedown="tableMousedown"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <div style="position:absolute;height:31px;background-color:#fff;z-index:10;width:100%">
            <table class="table table-bordered table-hover">
              <thead>
                <tr v-if="theads">
                  <th>序号</th>
                  <th v-for="thead in theads" :key="thead">{{thead}}</th>
                </tr>
              </thead>
              <tbody style="visibility:hidden" v-if="!searchState">
                <tr>
                  <td>1</td>
                  <td v-for="(value,key) in lists[lists.length-1]" :key="key">{{value}}</td>
                </tr>
              </tbody>
              <tbody style="visibility:hidden" v-else-if="searchState && !noResult">
                <tr>
                  <td>1</td>
                  <td v-for="(value,key) in searchLists[searchLists.length-1]" :key="key">{{value}}</td>
                </tr>
              </tbody>
              <tbody style="visibility:hidden" v-else-if="noResult">
                <tr>
                  <td :colspan="Object.keys(lists[0]).length+1">暂无结果，请重新搜索……</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="position:relative;max-height:400px;overflow:auto;height:auto">
            <table ref="table" class="table table-bordered table-hover">
              <thead>
                <tr v-if="theads">
                  <th>序号</th>
                  <th v-for="thead in theads" :key="thead">{{thead}}</th>
                </tr>
              </thead>
              <tbody v-if="!searchState">
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
              <tbody v-else-if="searchState && !noResult">
                <tr
                  v-for="(list,index) in searchLists"
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
              <tbody v-else-if="noResult">
                <tr>
                  <td :colspan="Object.keys(lists[0]).length+1">暂无结果，请重新搜索……</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      clickPix: 0,
      divTop: 0,
      isUpDown: false,
      noResult: false,
      triggerEnter: false,
      searchLists: [],
      searchState: false,
      triggerDel: true,
      spanwidth: 0,
      displayspanwidth: 0,
      inputwidth: 0,
      selectedData: [],
      showTable: false,
      currentTr: 0,
      downArrow: true,
      topDiv: ""
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
      type: String
    },
    icontext: {
      type: String
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
    },

    // divTop() {
    //   return this.$refs.input.getBoundingClientRect().top;
    // },
    screenHeight() {
      return document.documentElement.clientHeight;
    }
  },
  mounted() {
    var that = this;

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
  updated() {
    var that = this;
    //获取已选择span选项在display的宽度
    setTimeout(() => {
      // console.log("updated")
      if (this.$refs.ispan) {
        let dom = this.$refs.ispan;
        this.spanwidth = dom.offsetWidth;
        // console.log("spanwidth", this.spanwidth);
      }
      if (that.$refs.span0) {
        let dom0 = that.$refs.span0;
        that.displayspanwidth = dom0.offsetWidth + 16;
        if (that.$refs.span1) {
          let dom1 = that.$refs.span1;
          that.displayspanwidth += dom1.offsetWidth + 6;
        }
        let example = that.$refs.example;
        that.inputwidth =
          example.offsetWidth - that.displayspanwidth - that.spanwidth;
        // console.log("that.displayspanwidth", that.displayspanwidth);
      }
    }, 10);
  },
  methods: {
    scrollListener: function() {
      if (this.showTable) {
        this.divTop = this.$refs.example.getBoundingClientRect().top;
        // console.log("距顶", this.divTop);
        // if (
        //   (!this.searchState && this.lists.length >= 13) ||
        //   (this.searchState && this.searchLists.length >= 13)
        // ) {
        //位于下半部分
        // console.log("clientHeight/2",document.documentElement.clientHeight/2)
        // console.log("this.divTop",this.divTop)
        let halfHeight = document.documentElement.clientHeight / 2;
        if (this.divTop == halfHeight) {
          this.clickPix = halfHeight;
        }
        if (this.divTop - halfHeight >= 0) {
          this.isUpDown = true;
          let that = this;
          setTimeout(() => {
            let dom = that.$refs.scrollDiv;
            let domHeight = dom.offsetHeight;
            // 矫正值60，因为顶部高60
            if (domHeight + 60 < that.divTop) {
              // this.topDiv = "-410px";
              this.fixed = false;
              that.topDiv = "-" + domHeight + "px";
            } else {
              // console.log("距顶", that.divTop);
              // console.log("移动距离", that.divTop - that.clickPix);
              // let dif = that.divTop - that.clickPix;
              // that.topDiv = "-" + (domHeight + dif - 26) + "px";
              that.fixed = true;
              that.topDiv = 60 + "px";
            }
          }, 10);
        } else {
          this.fixed = false;
          this.isUpDown = false;
          this.topDiv = "";
        }
        // }
        // else {
        //   // console.log("lists222222222", this.lists);
        //   // 按照option 个数来计算高度
        //   if (
        //     document.documentElement.clientHeight - this.divTop <
        //     (400 * this.lists.length) / 13
        //   ) {
        //     this.topDiv = (-this.lists.length * 400) / 13 + "px";
        //   } else {
        //     this.topDiv = "";
        //   }
        // }
      }
    },
    input: function(event) {
      // console.log("input event", event);
      // event.target.value = this.value;
      this.triggerDel = false;
      this.triggerEnter = false;
    },
    inputfocus(event) {
      this.$refs.input.focus();
    },
    mouseenter: function() {
      // console.log("mouseEnter");
      if (!this.searchState) {
        this.$refs[this.currentTr][0].classList.remove("hover");
      }
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
    enterPreventDefault(event) {
      event.preventDefault();
    },
    enter: function(event) {
      event.preventDefault();
      if (this.triggerEnter === true && this.noResult === false) {
        event.target.value = event.target.value.replace(/\s+/g, "");
        let id = this.$refs[this.currentTr][0].dataset.id;
        // console.log("this.currentTr", this.currentTr);
        // this.$options.methods.trClick(id,this.currentTr)
        this.trClick(id, this.currentTr);
      } else {
        this.noResult = false;
        let searchString = "";

        if (event.target.value.length > 0) {
          searchString = event.target.value.trim().toLowerCase();
          event.target.value = searchString;
        } else {
          this.searchLists = [];
          this.searchState = false;
        }
        if (searchString) {
          this.searchLists = this.lists;
          this.searchLists = this.searchLists.filter(function(obj) {
            let keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
              let key = keys[i];
              if (
                obj[key]
                  .toString()
                  .toLowerCase()
                  .indexOf(searchString) !== -1
              ) {
                return obj;
              }
            }
          });
          this.searchState = true;
          this.currentTr = 0;
          if (this.searchLists.length === 0) {
            this.noResult = true;
            event.target.value = "";
          }
        } else {
          this.searchState = false;
        }

        let that = this;
        if (this.isUpDown) {
          setTimeout(() => {
            let dom1 = that.$refs.scrollDiv;
            let dom2 = that.$refs.table;
            console.log(
              "scrollDiv,table",
              dom1.offsetHeight,
              dom2.offsetHeight
            );
            that.topDiv = "-" + dom2.offsetHeight + "px";
          }, 10);
        }
      }
    },
    up: function(event) {
      event.preventDefault();

      this.triggerEnter = true;

      if (this.currentTr === 0) {
        if (this.$refs[this.currentTr][0]) {
          this.$refs[this.currentTr][0].classList.add("hover");
        }
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
      if (this.$refs[this.currentTr - 1][0]) {
        this.$refs[this.currentTr][0].classList.remove("hover");
        this.$refs[this.currentTr - 1][0].classList.add("hover");
        this.currentTr--;
      }
    },
    down: function(event) {
      event.preventDefault();
      if (this.currentTr === 0 && this.triggerEnter === false) {
        if (this.$refs[this.currentTr][0]) {
          this.$refs[this.currentTr][0].classList.add("hover");
        }
        this.triggerEnter = true;
        return;
      }

      // console.log("按下键", event);
      // this.scrollTop+=20
      // this.$refs.scrollDiv.scrollTop=this.scrollTop

      if (this.lists && this.currentTr === this.lists.length - 1) {
        return;
      }

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
      if (this.$refs[this.currentTr + 1][0]) {
        this.$refs[this.currentTr][0].classList.remove("hover");
        this.$refs[this.currentTr + 1][0].classList.add("hover");
        this.currentTr++;
      }
    },
    deleteSeleted: function(event) {
      // console.log("按键事件", event);
      if (event.target.value === "" && this.triggerDel && this.selectedData) {
        this.selectedData.pop();
        this.value.pop();
      } else {
        this.triggerDel = true;
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
      // if (index === 0) {
      //   result += "hover ";
      // }
      return result;
    },
    //展示选项
    toggleTable: function(e) {
      var that = this;
      if (this.showTable === true) {
        this.isUpDown = false;
        this.showTable = false;
        this.downArrow = true;
        this.triggerEnter = false;
        e.target.value = "";
        this.noResult = false;
        this.searchState = false;
        window.removeEventListener("scroll", that.scrollListener);
      } else {
        this.triggerEnter = false;
        e.target.value = "";
        this.noResult = false;
        this.searchState = false;

        //当前行数设为第一行
        this.currentTr = 0;
        this.downArrow = false;
        this.scrollTop = 0;

        this.divTop = this.$refs.input.getBoundingClientRect().top;
        let halfHeight = document.documentElement.clientHeight / 2;

        //位于下半部分
        if (halfHeight - this.divTop <= 0) {
          this.isUpDown = true;
          this.fixed= false
          this.topDiv = '-400px'
          if(460>this.divTop){
          this.fixed= true
          this.topDiv = '60px'
          }
          // setTimeout(() => {
          //   let dom = that.$refs.scrollDiv;
          //   let domHeight = dom.offsetHeight;
          //   //矫正值60，因为顶部高60
          //   if (domHeight + 60 < that.divTop) {
          //     // this.topDiv = "-410px";
          //     this.fixed = false;
          //     that.topDiv = "-" + domHeight + "px";
          //   } else {
          //     that.fixed = true;
          //     that.isUpDown = false;
          //     that.topDiv = 60 + "px";
          //   }
          // }, 10);
        } else {
          this.fixed = false;
          this.topDiv = "";
        }
        this.showTable = true;
        window.addEventListener("scroll", that.scrollListener);
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
        if (!this.searchState) {
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
        } else {
          this.selectedData.push(this.searchLists[indexInLists]);
          //用于输出
          // console.log("this.value", this.value);
          this.value.push(
            this.$options.methods.forOutput(
              this.searchLists[indexInLists],
              this.outputField
            )
          );
        }
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
  // margin-top: 10px;
  // min-width: 50%;
  // min-height: 100px;
  width:100%;
  max-width: 400px;
  max-height: 400px;
  // overflow-y: auto;
  overflow: hidden;
  border: 1px solid #ccc;
  position: absolute;
  background-color: #fff;
  z-index: 1;
  // padding: 0 20px 0 0;
  table,
  th,
  td {
    border: 1px solid #ccc;
  }
  table {
    // position: relative;
    width: 100%;
  }
  thead {
    // background-color: lightblue;
    th {
      text-align: center;
    }
  }
  th,
  td {
    padding: 5px;
  }
}

.example table tbody tr.active1 {
  background: #e6e9ed;
}
.example table tbody tr.hover {
  background: rgb(245, 245, 245);
}
</style>
