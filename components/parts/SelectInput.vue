<template>
  <div class="example" ref="example">
    <div class="all-select-input">
      <div class="inputBox">
        <div :class="{'readonly':readonly}"></div>
        <div class="divBox" @click="handleInput" v-on:mousedown="ulMousedown" ref="divBox">
          <!-- <span v-for="(obj,index) in selectedData" :key="obj.id" :ref="'span'+index">
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
            ref="input"
            :style="{'width':(selectedData.length>0?(inputwidth+'px'):'100%'),'padding-right':selectedData.length===0?spanwidth+'px':0}"
            v-on:focus="inputFocus"
            v-on:blur="inputBlur"
            v-on:keyup.up="up"
            v-on:keyup.down="down"
            v-on:keydown.enter="enterPreventDefault"
            v-on:keyup.enter="enter"
            v-on:keyup.backspace="deleteSeleted"
            :placeholder="placeholder"
            v-on:input="input"
            v-on:mousedown="inputMousedown"
            :required="selectedData.length>0?false:required"
          />
        </div>
        <span class="i-container" ref="ispan" @click="inputfocus" v-on:mousedown="ulMousedown">
          <i v-if="icon || icontext" v-bind:class="'fa ' + icon" aria-hidden="true">{{icontext}}</i>

          <i class="fa fa-chevron-down select" v-else-if="!icon && downArrow" aria-hidden="true"></i>
          <i class="fa fa-chevron-up select" v-else aria-hidden="true"></i>
        </span>

        <ul
          class="ul_box"
          :style="{'position':fixed?'fixed':'absolute','top':topDiv}"
          ref="scrollDiv"
          v-on:mousedown="ulMousedown"
          v-if="showUl && !searchState"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <li
            v-for="(option,index) in options"
            :key="index"
            :ref="index"
            v-on:click="ulClick(option.id,index)"
            :value="option.id"
            :data-id="option.id"
            :data-index="index"
            :class="hasClass(option.id,index)"
          >{{option.text ? option.text :option.name}}</li>
        </ul>
        <ul
          class="ul_box"
          :style="{'position':fixed?'fixed':'absolute','top':topDiv}"
          ref="scrollDiv"
          v-on:mousedown="ulMousedown"
          v-else-if="showUl && searchState && !noResult"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <li
            v-for="(option,index) in searchOptions"
            :key="index"
            :ref="index"
            v-on:click="ulClick(option.id,index)"
            :value="option.id"
            :data-id="option.id"
            :data-index="index"
            :class="hasClass(option.id,index)"
          >{{option.text ? option.text :option.name}}</li>
        </ul>
        <ul
          class="ul_box"
          :style="{'position':fixed?'fixed':'absolute','top':topDiv}"
          ref="scrollDiv"
          v-on:mousedown="ulMousedown"
          v-else-if="showUl && noResult"
        >
          <li>暂无结果，请重新搜索……</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTimeOutFlag: 0,
      fixed: false,
      clickPix: 0,
      divTop: 0,
      isUpDown: false,
      noResult: false,
      triggerEnter: false,
      searchOptions: [],
      searchState: false,
      triggerDel: true,
      spanwidth: 0,
      displayspanwidth: 0,
      inputwidth: 0,
      selectedData: [],
      showUl: false,
      currentUl: 0,
      downArrow: true,
      topDiv: "",
      top: ""
    };
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    //父组件传入的选项数据
    options: {
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
      type: [Array, Number]
    },
    //传入的label文本内容
    label: {
      type: String,
      default: "下拉选择框"
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

  computed: {},
  mounted: function() {
    var that = this;
    // console.log("this.value", this.value);
    // console.log("this.multi", this.multi);
    if (!this.multi) {
      // // console.log("数据挂载执行完毕，打印value", this.value);
      if (
        this.options &&
        this.options.length > 0 &&
        this.value &&
        this.selectedData &&
        this.selectedData.length == 0
      ) {
        //数据已经挂载，外部传入value（选中的信息），将对应value显示出来
        // // console.log("该自动选中列表咯");
        let num = this.value;
        // console.log("num", num);
        this.options.forEach(function(obj, index) {
          if (obj.id == num) {
            // console.log("obj", obj);
            that.selectedData.push(obj);
          }
        });
      }
      // // console.log("this.$refs",this.$refs)
    } else {
      if (
        this.options &&
        this.options.length > 0 &&
        this.value &&
        this.value.length > 0 &&
        this.selectedData &&
        this.selectedData.length == 0
      ) {
        this.value.forEach(function(num) {
          that.options.forEach(function(obj, index) {
            if (obj.id == num) {
              // console.log("multi num", num);
              // console.log("obj", obj);
              that.selectedData.push(obj);
            }
          });
        });
      }
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
      if (this.showUl) {
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
      if (this.triggerDel) {
        this.triggerDel = false;
      }
      if (this.triggerEnter) {
        this.triggerEnter = false;
      }
      // console.log(event);
      if (!this.showUl) {
        this.showUl = true;
      }
      //定义延时搜索
      let that = this;
      let timout = setTimeout(() => {
        that.noResult = false;
        let searchString = "";
        if (event.target.value.length > 0) {
          searchString = event.target.value.trim().toLowerCase();
          event.target.value = searchString;
        } else {
          that.searchOptions = [];
          that.searchState = false;
        }
        if (searchString) {
          that.searchOptions = that.options;
          that.searchOptions = that.searchOptions.filter(function(obj) {
            // let keys = Object.keys(obj);
            let keys = "text";

            // for (let i = 0; i < keys.length; i++) {
            //   let key = keys[i];
            if (
              obj[keys] &&
              obj[keys]
                .toString()
                .toLowerCase()
                .indexOf(searchString) !== -1
            ) {
              return obj;
            }
            keys = "name";
            if (
              obj[keys] &&
              obj[keys]
                .toString()
                .toLowerCase()
                .indexOf(searchString) !== -1
            ) {
              return obj;
            }
            // }
          });
          that.searchState = true;
          that.currentUl = 0;
          if (that.searchOptions.length === 0) {
            //若搜索结果为空，清除输入文本，提示无搜索结果，延时1s后显示所有选项
            that.noResult = true;
            event.target.value = "";
            setTimeout(() => {
              that.searchOptions = that.options;
              that.noResult = false;
            }, 1000);
          } else {
            that.triggerEnter = true;
          }
        } else {
          that.searchState = false;
        }
        that.scrollListener();
      }, 1000);

      //执行或清除延时搜索
      if (this.searchTimeOutFlag == 0) {
        this.searchTimeOutFlag = timout;
      } else {
        clearTimeout(this.searchTimeOutFlag);
        this.searchTimeOutFlag = timout;
      }
    },
    inputfocus() {
      this.$refs.input.focus();
    },
    mouseenter: function() {
      // // console.log("mouseEnter");
      if (!this.searchState) {
        this.$refs[this.currentUl][0].classList.remove("hover");
      }
    },
    mouseleave: function() {
      // // console.log("mouseLeave");
    },
    //将选中的记录按照父组件要求的内容输出
    //传入的输出字段，遍历，找到第一个能输出的字段，结束。若找不到，则默认输出id
    forOutput: function(obj, str) {
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
      if (
        this.triggerEnter === true &&
        this.noResult === false &&
        this.showUl
      ) {
        this.$refs.input.value = this.$refs.input.value.replace(/\s+/g, "");
        let id = this.$refs[this.currentUl][0].dataset.id;
        // // console.log("this.currentUl", this.currentUl);
        // this.$options.methods.trClick(id,this.currentUl)
        this.ulClick(id, this.currentUl);
      } else {
        //单选 enter特殊处理
        if (!this.multi && !this.triggerEnter && this.showUl) {
          this.showUl = false;
          //敲击回车时若未激活回车选择功能，且panel是展开的，就关闭panel
          // if (this.showUl) {
          //   this.showUl = false;
          // }
        } else if (!this.multi && !this.triggerEnter && !this.showUl) {
          this.inputFocus();
        }
      }
    },
    up: function(event) {
      if (!this.showUl) {
        return;
      }
      event.preventDefault();
      this.triggerEnter = true;
      if (this.currentUl === 0) {
        if (this.$refs[this.currentUl][0]) {
          this.$refs[this.currentUl][0].classList.add("hover");
        }
        return;
      }
      // // console.log("按上键", event);
      //控制滚动
      if (
        this.$refs.scrollDiv.scrollHeight > this.$refs.scrollDiv.clientHeight
      ) {
        // // console.log("ul有滚动条")
        // if (this.currentUl > 8) {
        //   this.$refs[this.currentUl - 8][0].scrollIntoView(false);
        // } else {
        //   this.$refs[0][0].scrollIntoView(false);
        // }
        if (this.currentUl < 6) {
          // this.$refs[this.currentUl + 6][0].scrollIntoView(false);
        } else {
          this.$refs[this.currentUl][0].scrollIntoView(false);
        }
      } else {
        // // console.log("ul没有滚动条")
      }
      if (this.$refs[this.currentUl - 1][0]) {
        this.$refs[this.currentUl][0].classList.remove("hover");
        this.$refs[this.currentUl - 1][0].classList.add("hover");
        this.currentUl--;
      }
    },
    down: function(event) {
      if (!this.showUl) {
        return;
      }
      event.preventDefault();
      // // console.log("按下键", event);
      if (this.currentUl === 0 && this.triggerEnter === false) {
        if (this.$refs[this.currentUl][0]) {
          this.$refs[this.currentUl][0].classList.add("hover");
        }
        this.triggerEnter = true;
        return;
      }
      if (this.options && this.currentUl === this.options.length - 1) {
        return;
      }
      //控制滚动
      if (
        this.$refs.scrollDiv.scrollHeight > this.$refs.scrollDiv.clientHeight
      ) {
        // // console.log("ul有滚动条")
        // if (this.currentUl > 6) {
        //   this.$refs[this.currentUl - 6][0].scrollIntoView(false);
        // } else {
        //   this.$refs[0][0].scrollIntoView(false);
        // }
        if (this.currentUl > 4) {
          this.$refs[this.currentUl + 1][0].scrollIntoView(false);
        } else {
        }
      } else {
        // // console.log("ul没有滚动条")
      }
      if (this.$refs[this.currentUl + 1][0]) {
        this.$refs[this.currentUl][0].classList.remove("hover");
        this.$refs[this.currentUl + 1][0].classList.add("hover");
        this.currentUl++;
      }
    },
    deleteSeleted: function(event) {
      // // console.log("按键事件", event);
      if (event.target.value === "" && this.triggerDel && this.selectedData) {
        if (!this.multi) {
          this.selectedData = [];
          this.$emit("input", null);
        } else {
          this.selectedData.pop();
          this.value.pop();
        }
      } else {
        this.triggerDel = true;
      }
    },
    //检测li是否应该显示底色
    hasClass: function(id, index) {
      var result = "";
      if (
        this.selectedData.some(function(dataObj) {
          return dataObj.id == id;
        })
      ) {
        result += "active ";
      }
      if (!this.noResult && this.triggerEnter && index === 0) {
        result += "hover ";
      }
      return result;
    },
    //展示选项
    toggleUl: function(e) {
      var that = this;
      if (this.showUl === true) {
        this.showUl = false;
        this.downArrow = true;
        this.triggerEnter = false;
        //失焦后清除input内的文本
        this.$refs.input.value = "";
        this.noResult = false;
        this.searchState = false;
        window.removeEventListener("scroll", that.scrollListener);
      } else {
        this.triggerEnter = false;
        this.noResult = false;
        this.searchState = false;
        this.currentUl = 0;
        this.downArrow = false;
        this.scrollTop = 0;
        this.divTop = this.$refs.input.getBoundingClientRect().top;
        let halfHeight = document.documentElement.clientHeight / 2;
        //位于下半部分
        if (halfHeight - this.divTop <= 0) {
          this.isUpDown = true;
          this.fixed = false;
          this.topDiv = "-250px";
          if (310 > this.divTop) {
            this.fixed = true;
            this.topDiv = "60px";
          }
        } else {
          this.fixed = false;
          this.topDiv = "";
        }
        this.showUl = true;
        window.addEventListener("scroll", that.scrollListener);
      }
    },

    inputFocus(event) {
      let that = this;
      this.triggerEnter = false;
      this.noResult = false;
      this.searchState = false;
      this.currentUl = 0;
      this.downArrow = false;
      this.scrollTop = 0;
      this.divTop = this.$refs.input.getBoundingClientRect().top;
      let halfHeight = document.documentElement.clientHeight / 2;
      //位于下半部分
      if (halfHeight - this.divTop <= 0) {
        this.isUpDown = true;
        this.fixed = false;
        this.topDiv = "-250px";
        if (310 > this.divTop) {
          this.fixed = true;
          this.topDiv = "60px";
        }
      } else {
        this.fixed = false;
        this.topDiv = "";
      }
      this.showUl = true;
      window.addEventListener("scroll", that.scrollListener);
    },
    //input 失焦
    inputBlur(event) {
      let that = this;
      if (this.showUl === true) {
        this.showUl = false;
      } else {
        this.$refs.input.blur();
      }
      this.downArrow = true;
      this.triggerEnter = false;
      //失焦后清除input内的文本
      event.target.value = "";
      // this.$refs.input.value = "";
      this.noResult = false;
      this.searchState = false;
      window.removeEventListener("scroll", that.scrollListener);
    },
    //点击选项时阻止input的blur事件
    ulMousedown: function(event) {
      event.preventDefault();
    },
    //单选状态下，panel关闭状态下，点击input时，重新触发focus
    inputMousedown: function(event) {
      event.preventDefault();
      if (!this.multi && !this.showUl) {
        this.inputFocus();
      }
    },
    //选项的点击事件
    ulClick: function(id, index) {
      const selectedId = id;
      const classList = this.$refs[index][0].classList;
      const indexInOptions = index;

      //如果已有class，清掉
      if (classList.contains("active")) {
        classList.remove("active");
        this.selectedData = this.selectedData.filter(function(item) {
          return item.id != selectedId;
        });
        if (this.multi) {
          let indexInValue = this.value.indexOf(selectedId * 1);
          if (indexInValue != -1) {
            this.value.splice(indexInValue, 1);
          }
        } else {
          this.$emit("input", null);
        }
        // if (this.value.length === 0) {
        //   // console.log("this.$refs.input", this.$refs.input);
        //   this.$refs.input.value = "";
        // }
      } else {
        // 如果单选模式;
        if (!this.multi) {
          this.selectedData = [];
        }
        classList.add("active");
        if (!this.searchState) {
          this.selectedData.push(this.options[indexInOptions]);
          //用于输出
          if (!this.multi) {
            let value = this.$options.methods.forOutput(
              this.options[indexInOptions],
              this.outputField
            );
            this.$emit("input", value);
          } else {
            this.value.push(
              this.$options.methods.forOutput(
                this.options[indexInOptions],
                this.outputField
              )
            );
          }
        } else {
          this.selectedData.push(this.searchOptions[indexInOptions]);
          //用于输出
          if (!this.multi) {
            let value = this.$options.methods.forOutput(
              this.searchOptions[indexInOptions],
              this.outputField
            );
            this.$emit("input", value);
          } else {
            this.value.push(
              this.$options.methods.forOutput(
                this.searchOptions[indexInOptions],
                this.outputField
              )
            );
          }
        }
      }
      if (!this.multi) {
        this.triggerEnter = false;
        this.showUl = false;
        this.$refs.input.value = "";
      }
    },
    handleInput() {
      this.$refs.input.focus();
    },
    removeSelected: function(event) {
      // // console.log("event", event);
      const selectedId = event.target.dataset.id;
      this.selectedData = this.selectedData.filter(function(item) {
        return item.id != selectedId;
      });
      if (!this.multi) {
        this.$emit("input", null);
      } else {
        let index = this.value.indexOf(selectedId * 1);
        if (index != -1) {
          this.value.splice(index, 1);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "@/assets/font-awesome-4.7.0/css/font-awesome.min.css";

.all-select-input {
  display: flex;
}
.divBox > span {
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
.ul_box {
  // margin-top: 5px;
  width: auto;
  border: 2px solid lightblue;
  min-width: 250px;
  max-width: 400px;
  max-height: 250px;
  overflow-y: auto;
  background-color: #fff;
  z-index: 1;
  // border-left: 1px solid #ccc;
  // border-top: 1px solid #ccc;
}
.ul_box li {
  padding: 5px 20px;
  cursor: pointer;
}
.ul_box li:hover,
li.hover {
  background: rgb(245, 245, 245);
}
</style>
