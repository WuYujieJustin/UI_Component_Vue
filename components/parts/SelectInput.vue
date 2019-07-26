<template>
  <div class="example">
    <div class="all-select-input">
      <div class="inputBox">
        <div :class="{'readonly':readonly}"></div>
        <div
          class="divBox"
          @click="handleInput"
          v-on:mousedown="ulMousedown"
          ref="divBox"
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
            v-on:focus="toggleUl"
            v-on:blur="toggleUl"
            v-on:keyup.up="up"
            v-on:keyup.down="down"
            v-on:keydown.enter="enterPreventDefault"
            v-on:keyup.enter="enter"
            v-on:keyup.backspace="deleteSeleted"
            :placeholder="placeholder"
            v-on:input="input"
            :required="required"
            :value="value"
          />
        </div>
        <span class="i-container">
    <i v-if="icon || icontext" v-bind:class="'fa ' + icon"  aria-hidden="true">{{icontext}}</i>

    <i class="fa fa-chevron-down select" v-else-if="!icon && downArrow" aria-hidden="true"></i>
    <i class="fa fa-chevron-up select" v-else aria-hidden="true"></i>
        </span>


        <ul
          class="ul_box"
          :style="{'position':'absolute','top':topDiv}"
          ref="scrollDiv"
          v-on:mousedown="ulMousedown"
          v-if="showUl"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
          :value="value"
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
          >{{option.text}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedData: [],
      showUl: false,
      currentUl: 0,
      downArrow: true,
      topDiv: ''
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
      type: Array
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
    divTop(){
      return  this.$refs.divBox.getBoundingClientRect().top
    },
    screenHeight(){
      return document.documentElement.clientHeight
    }  
  },
  mounted: function() {
    // console.log("数据挂载执行完毕，打印value", this.value);
    if (
      this.options &&
      this.options.length > 0 &&
      this.value &&
      this.value.length > 0 &&
      this.selectedData &&
      this.selectedData.length == 0
    ) {
      //数据已经挂载，外部传入value（选中的信息），将对应value显示出来
      // console.log("该自动选中列表咯");
      var that = this;
      that.value.forEach(function(num) {
        that.options.forEach(function(obj, index) {
          if (obj.id == num) {
            // console.log("obj", obj);
            that.selectedData.push(obj);
          }
        });
      });
    }
  },
  methods: {
        scroll(){
      return window.onscroll 
    },
    input: function(event) {
      // console.log("event.target.value",event.target.value)
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
      this.$refs[this.currentUl][0].classList.remove("hover");
    },
    mouseleave: function() {
      // console.log("mouseLeave");
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
          break;
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
      let id = this.$refs[this.currentUl][0].dataset.id;
      // console.log("this.currentUl", this.currentUl);
      // this.$options.methods.trClick(id,this.currentUl)
      this.ulClick(id, this.currentUl);
    },
    up: function(event) {
      event.preventDefault();
      if (this.currentUl === 0) {
        return;
      }
      // console.log("按上键", event);
      //控制滚动
      if (
        this.$refs.scrollDiv.scrollHeight > this.$refs.scrollDiv.clientHeight
      ) {
        // console.log("ul有滚动条")
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
        // console.log("ul没有滚动条")
      }
      this.$refs[this.currentUl][0].classList.remove("hover");
      this.$refs[this.currentUl - 1][0].classList.add("hover");
      this.currentUl--;
    },
    down: function(event) {
      event.preventDefault();
      // console.log("按下键", event);
      if (this.options && this.currentUl === this.options.length - 1) {
        return;
      }
      this.$refs[this.currentUl][0].classList.remove("hover");
      //控制滚动
      if (
        this.$refs.scrollDiv.scrollHeight > this.$refs.scrollDiv.clientHeight
      ) {
        // console.log("ul有滚动条")
        // if (this.currentUl > 6) {
        //   this.$refs[this.currentUl - 6][0].scrollIntoView(false);
        // } else {
        //   this.$refs[0][0].scrollIntoView(false);
        // }
        if (this.currentUl > 8) {
          this.$refs[this.currentUl + 1][0].scrollIntoView(false);
        } else {
        }
      } else {
        // console.log("ul没有滚动条")
      }
      this.$refs[this.currentUl + 1][0].classList.add("hover");
      this.currentUl++;
    },
    deleteSeleted: function(event) {
      // console.log("按键事件", event);
      if (event.target.value === "" && this.selectedData) {
        this.selectedData.pop();
        this.value.pop();
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
      if (index === 0) {
        result += "hover ";
      }
      return result;
    },
    //展示选项
    toggleUl: function(e) {
      if (this.showUl === true) {
        this.showUl = false;
        this.downArrow = true;
      } else {
        this.showUl = true;
        this.currentUl = 0;
        this.downArrow = false;
        this.scrollTop = 0;
        // input距离顶部距离  屏幕宽度 this.screenHeight-this.divTop
        // 如果元素超过13个 ul绝对高度 400px
        if (this.options.length >= 13) {
          // 如果大于400

          if(document.documentElement.clientHeight-this.divTop<400){
            this.topDiv = '-400px'
          }else{
            this.topDiv = ''
          }
        }else{
          // 按照option 个数来计算高度
          if(document.documentElement.clientHeight-this.divTop<(400*this.options.length/13)){
            this.topDiv = -this.options.length*400/13 +"px"
          }else{
            this.topDiv = ''
          }

        }
      }
    },
    //点击选项时阻止input的blur事件
    ulMousedown: function(event) {
      event.preventDefault();
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
        let indexInValue = this.value.indexOf(selectedId * 1);
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
        classList.add("active");
        this.selectedData.push(this.options[indexInOptions]);
        //用于输出
        this.value.push(
          this.$options.methods.forOutput(
            this.options[indexInOptions],
            this.outputField
          )
        );
        // this.$emit("input", this.value);
      }
    },
    handleInput() {
      this.$refs.input.focus();
    },
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
        this.$refs.input.value = "";
      }
      // this.$emit("input", this.value);
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
  border: 1px solid #ccc;
  min-width: 250px;
  max-width: 400px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #fff;
  z-index: 1;
}
.ul_box li {
  padding: 5px 0 5px 20px;
  cursor: pointer;
}
.ul_box li:hover,
li.hover {
  background: rgb(245, 245, 245);
}
</style>
