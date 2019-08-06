<template>
  <div class="example" ref="totalWidth">
    <input
      ref="input"
      :value="pickerValue"
      v-on="inputListeners"
      @focus="showTime"
      class="form-control"
      :required="required"
      :placeholder="placeholder"
      @blur="changeBlur"
    />
    <div
      class="datepicker"
      ref="datepicker"
      v-show="status"
      :style="{'position':'fixed','top':position+'px'}"
    >
      <date-panel
        ref="datePanel"
        :hours="hours"
        @confirm="firstconfirm"
        :format="format"
        :type="type"
        :isYearProp="isYearProp"
        @poperStyle="updatePosition"
      />
      <date-panel
        ref="datePanelRange"
        v-if="daterange"
        :hours="hours"
        @confirm="secondconfirm"
        :format="format"
        :type="type"
        :isYearProp="isYearProp"
        @poperStyle="updatePosition"
      />
    </div>
    <span
      class="i-container"
      ref="ispan"
      v-if="icon || icontext"
      @click="inputfocus"
      v-on:mousedown="dateMousedown"
    >
      <i v-bind:class="'fa ' + icon" aria-hidden="true">{{icontext}}</i>
    </span>
  </div>
</template>

<script>
import datePanel from "~/components/parts/datePanel.vue";
export default {
  inheritAttrs: false,
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            vm.$emit("input", [event.target.value])
            vm.pickerValue = event.target.value
          }
        }
      );
    }
  },
  provide() {
    return {
      isRequired: this.required
    };
  },
  data() {
    return {
      spanwidth: 0,
      hours: [],
      minutes: [],
      datetype: this.type,
      isHourprop: false,
      isMinprop: false,
      isMonthprop: false,
      btnvisibleprop: false,
      isYearProp: false,
      pickerValue: this.value,
      status: false,
      position: 0,
      poperHeight: 0,
      inputHeight: 0,
      inputTop: 0,
      totalHeight: 0,
      inputBottom: 0
    };
  },
  components: {
    datePanel
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "datetime"
    },
    hourRange: {
      type: Number,
      default: 1
    },
    icon: {
      type: String,
      default: "fa-calendar"
    },
    icontext: {
      type: String
    },
    value: {
      type: [Array, String],
      default: []
    },
    daterange: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss"
    },
    placeholder: {
      type: String
    }
  },
  mounted() {
    // input height
    window.addEventListener("scroll", this.updatePosition);
    this.inputHeight = this.$refs.input.offsetHeight;
    this.inputTop = this.$refs.totalWidth.getBoundingClientRect().top;
    this.totalHeight = window.innerHeight;
    this.inputBottom = this.totalHeight - this.inputTop;
    if (this.$refs.ispan) {
      var dom = this.$refs.ispan;
      this.spanwidth = dom.offsetWidth;
    }
    if (this.$refs.input && this.$refs.totalWidth) {
      let totalWidth = this.$refs.totalWidth.offsetWidth;

      this.$refs.input.style.width = totalWidth - this.spanwidth + "px";
    }
  },
  methods: {
    updatePosition() {
      this.$nextTick(() => {
        //assign value
        this.inputTop = this.$refs.totalWidth.getBoundingClientRect().top;
        this.totalHeight = window.innerHeight;
        this.inputBottom = this.totalHeight - this.inputTop;
        this.poperHeight = this.$refs.datepicker.offsetHeight;
        // console.log(
        //   this.poperHeight +
        //     "this.poperHeight = this.$refs.datepicker.style.width;"
        // );

        // poper up
        // 上方够下方不够 定位在上方
        if (
          this.poperHeight > this.inputBottom &&
          this.poperHeight < this.inputTop
        ) {
          // console.log("上方够下方不够 定位在input上方 datetime");
          // console.log(this.poperHeight + "this.poperHeight");
          // console.log(this.$refs.datepicker);
          this.position = this.inputTop - this.poperHeight;
        }
        //上下均不够 定位在底部 bottom 0
        if (
          this.poperHeight > this.inputBottom &&
          this.poperHeight > this.inputTop
        ) {
          // console.log("上下均不够 定位在底部 bottom 0");
          this.position = this.totalHeight - this.poperHeight;
        }
        //只要下方空间够 定位在input下方
        if (this.poperHeight < this.inputBottom) {
          this.position = this.inputTop + this.inputHeight;
          // console.log("只要下方空间够 定位在input下方");
        }
      });
    },
    //点击选项时阻止input的blur事件
    dateMousedown: function(event) {
      event.preventDefault();
    },
    inputfocus() {
      this.$refs.input.focus();
    },
    changeBlur() {
      this.status = false;
      window.removeEventListener("scroll", this.updatePosition);
    },
    firstconfirm(str) {
      this.pickerValue = str;
      this.$emit("input", [str]);
      this.$refs.datePanel.status = null;
      if (this.daterange) {
        this.$refs.datePanel.status = "year";
      } else {
        this.status = false;
      }
    },
    secondconfirm(str) {
      //if second value exits delete
      if (this.pickerValue.indexOf("--") > -1) {
        this.pickerValue = this.pickerValue.split("--")[0];
      }
      this.pickerValue = this.pickerValue + "--" + str;
      // console.log(this.pickerValue);
      // emit array
      this.$emit("input", this.pickerValue.split("--"));
      this.$refs.datePanel.status = this.$refs.datePanelRange.status = null;
      this.status = false;
    },
    showTime() {
      this.status = !this.status;
      // position:
      // this.inputHeight = this.$refs.input.offsetHeight;
      // this.inputTop = this.$refs.totalWidth.getBoundingClientRect().top;
      // this.totalHeight = window.innerHeight;
      // this.inputBottom = this.totalHeight - this.inputTop;
      // init position by click

      // console.log("true" + this.status);
      //如果在可视区域内 没有滚动页面 先初始化
      if (this.status) {
        window.addEventListener("scroll", this.updatePosition);
        if (this.inputTop < this.totalHeight) {
          this.$nextTick(this.updatePosition);
        }
      }

      if (this.datetype == "month") {
        this.$refs.datePanel.status = "year";
        if (this.daterange) {
          this.$refs.datePanel.status = "year";
        }
      }
      if (this.datetype == "datetime") {
        // clear time before show
        this.hours = [];
        // format hours
        for (let i = 0; i <= 23; i = i + this.hourRange) {
          this.hours.push(i + ":00");
        }
        this.$refs.datePanel.status = "year";
        if (this.daterange) {
          this.$refs.datePanelRange.status = "year";
        }
      }

      // only one layer use boolean type
      if (this.datetype == "year" || this.datetype == "date") {
        this.$refs.datePanel.status = "year";
        if (this.daterange) {
          this.$refs.datePanelRange.status = "year";
        }
      }
      // showtime 只负责第一层逻辑  一层一层往下

      if (this.datetype == "time") {
        // clear time before show
        this.hours = [];
        // format hours
        for (let i = 0; i <= 23; i = i + this.hourRange) {
          this.hours.push(i + ":00");
        }
        this.$refs.datePanel.status = "hour";
        if (this.daterange) {
          this.$refs.datePanelRange.status = "year";
        }
      }
    }
  }
};
</script>


<style lang="less" scoped>
.datepicker {
  display: flex;
  position: absolute;
  z-index: 100000;
}
</style>

