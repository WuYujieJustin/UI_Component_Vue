<template>
  <div class="example">
    <label>{{ label }}</label>
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
      <div class="divBox" @click="handleInput" v-on:mousedown="ulMousedown">
        <span v-for="obj in selectedData" :key="obj.id">
          {{displayData(obj,displayField)}}
          <i v-on:click.stop="removeSelected" :data-id="obj.id">x</i>
        </span>
        <input
          type="text"
          ref="input"
          :style="{'width':selectedData.length>0?'30%':'100%'}"
          v-on:focus="toggleUl"
          v-on:blur="toggleUl"
          v-on:keydown="handleKeyDown"
          :placeholder="placeholder"
          :readonly="readonly"
        />
      </div>
    </div>
    <ul v-on:click="ulClick" v-if="showUl" v-on:mousedown="ulMousedown" :value="value">
      <li
        v-for="option in options"
        :key="option.value"
        :value="option.id"
        :class="hasClass(option)?'active':''"
      >{{option.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedData: [],
      showUl: false,
      searchedData: []
    };
  },
  props: {
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
      default: "下拉列表选择控件"
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

  computed: {},
  mounted: function() {
    console.log("数据挂载执行完毕，打印value", this.value);
    if (
      this.options &&
      this.options.length > 0 &&
      this.value &&
      this.value.length > 0 &&
      this.selectedData &&
      this.selectedData.length == 0
    ) {
      //数据已经挂载，外部传入value（选中的信息），将对应value显示出来
      console.log("该自动选中列表咯");
      var that = this;
      that.value.forEach(function(num) {
        that.options.forEach(function(obj, index) {
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
    //检测li是否应该显示底色
    hasClass: function(option) {
      console.log("hasClass传入的option", option);
      return this.selectedData.some(function(dataObj) {
        return dataObj.id == option.id;
      });
    },
    //展示选项
    toggleUl: function() {
      if (this.showUl === true) {
        this.showUl = false;
      } else {
        this.showUl = true;
      }
    },
    //点击选项时阻止input的blur事件
    ulMousedown: function(event) {
      event.preventDefault();
    },
    //选项的点击事件
    ulClick: function(event) {
      console.log("ul click event", event);
      console.log("event.target.value", event.target.value);
      console.log("event.target.innerText", event.target.innerText);

      const selectedId = event.target.value;
      const cssList = event.target.classList;
      //mousedown后拖动会报错，此处屏蔽报错
      if (!selectedId) {
        return;
      }
      //如果已有class，清掉
      if (cssList.contains("active")) {
        cssList.remove("active");
        this.selectedData = this.selectedData.filter(function(item) {
          return item.id != selectedId;
        });
        let index = this.value.indexOf(selectedId * 1);
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
        cssList.add("active");

        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].id == event.target.value) {
            this.selectedData.push(this.options[i]);
            break;
          }
        }
        //用于输出
        this.value.push(
          this.$options.methods.forOutput(
            this.selectedData[this.selectedData.length - 1],
            this.outputField
          )
        );
        this.$emit("input", this.value);
      }
    },
    handleInput() {
      this.$refs.input.focus();
    },
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
@Height: 1.625rem;

 
</style>
