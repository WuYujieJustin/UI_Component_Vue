<template>
  <div class="example">
    <div style="display:flex" ref="totalWidth">
      <input
        autocomplete="off"
        ref="input"
        :value="pickerValue"
        v-on="inputListeners"
        @focus="showTime"
        class="form-control"
        :required="required"
        :placeholder="placeholder"
        name="from"
        @blur="changeBlur"
        @keydown.tab="tab"
        @keydown.down="down"
        @keydown.right="right"
        @keydown.left="left"
        @keydown.up="up"
        @keydown.enter="enter"
      />
      <div style="width:50px; align-item:center" v-if="daterange">
        <span class="glyphicon glyphicon-minus" aria-hidden="true" style="margin:10px"></span>
      </div>
      <input
        autocomplete="off"
        v-if="daterange"
        ref="inputRange"
        :value="secondPickerValue"
        v-on="inputListeners"
        @focus="showTime"
        class="form-control"
        :required="required"
        :placeholder="placeholder"
        name="end"
        @keydown.tab="tabrange"
        @keydown.down="downrange"
        @keydown.right="rightrange"
        @keydown.left="leftrange"
        @keydown.up="uprange"
        @keydown.enter="enterrange"
      />
    </div>
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
            let eValue = event.target.value;
            vm.$emit("input", [eValue]);
            if (vm.daterange) {
              // input name
              if (event.target.name == "end") {
                vm.$emit("input", [vm.pickerValue || null, eValue]);
                vm.secondPickerValue = eValue;
              } else {
                vm.$emit("input", [eValue, vm.secondPickerValue || null]);
                vm.pickerValue = eValue;
              }
            } else {
              vm.$emit("input", [eValue]);
              vm.pickerValue = eValue;
            }
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
      status: false,
      position: 0,
      poperHeight: 0,
      inputHeight: 0,
      inputTop: 0,
      totalHeight: 0,
      inputBottom: 0,
      pickerValue: this.daterange ? this.value[0] : this.value,
      secondPickerValue: this.daterange ? this.value[1] : ""
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
      default: "yyyy-MM-dd"
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
    var dom = this.$refs.ispan;
    this.spanwidth = dom.offsetWidth;
    // console.log(this.spanwidth+"this.spanwidth")
    let totalWidth = this.$refs.totalWidth.offsetWidth;
    if (this.daterange) {
      //total - span - 50 /2
      // +1px 消除边界
      this.$refs.inputRange.style.width = this.$refs.input.style.width =
        (totalWidth - this.spanwidth - 50 + 2) / 2 + "px";
    } else {
      this.$refs.input.style.width = totalWidth - this.spanwidth + 2 + "px";
    }
  },
  methods: {
    tabrange() {
      this.status = false;
    },
    tab() {
      // 如果是范围选择 不操作
      if (!this.daterange) {
        this.status = false;
      }
    },

    enter(event) {
      event.preventDefault();
      if (this.status) {
        this.$refs.datePanel.$refs.datepicker.enter(event);
      }
    },
    down() {
      if (this.status) {
        event.preventDefault();

        this.$refs.datePanel.$refs.datepicker.down();
      }
    },
    left() {
      if (this.status) {
        event.preventDefault();

        this.$refs.datePanel.$refs.datepicker.left();
      }
    },
    right() {
      if (this.status) {
        event.preventDefault();

        this.$refs.datePanel.$refs.datepicker.right();
      }
      // call child method right()
    },
    up() {
      if (this.status) {
        event.preventDefault();
        this.$refs.datePanel.$refs.datepicker.up();
      }
    },
    enterrange(event) {
      event.preventDefault();
      if (this.status) {
        this.$refs.datePanelRange.$refs.datepicker.enter(event);
      }
    },
    downrange() {
      if (this.status) {
        event.preventDefault();

        this.$refs.datePanelRange.$refs.datepicker.down();
      }
    },
    leftrange() {
      if (this.status) {
        event.preventDefault();

        this.$refs.datePanelRange.$refs.datepicker.left();
      }
    },
    rightrange() {
      if (this.status) {
        event.preventDefault();

        this.$refs.datePanelRange.$refs.datepicker.right();
      }
      // call child method right()
    },
    uprange() {
      if (this.status) {
        event.preventDefault();

        this.$refs.datePanelRange.$refs.datepicker.up();
      }
    },

    updatePosition() {
      if (this.$refs.totalWidth && this.$refs.datepicker) {
        this.$nextTick(() => {
          //assign value

          this.inputTop = this.$refs.totalWidth.getBoundingClientRect().top;
          this.poperHeight = this.$refs.datepicker.offsetHeight;
          this.totalHeight = window.innerHeight;

          this.inputBottom = this.totalHeight - this.inputTop;

          // poper up
          // 上方够下方不够 定位在上方
          if (
            this.poperHeight > this.inputBottom &&
            this.poperHeight < this.inputTop
          ) {
            this.position = this.inputTop - this.poperHeight;
          }
          //上下均不够 定位在底部 bottom 0
          if (
            this.poperHeight > this.inputBottom &&
            this.poperHeight > this.inputTop
          ) {
            this.position = this.totalHeight - this.poperHeight;
          }
          //只要下方空间够 定位在input下方
          if (this.poperHeight < this.inputBottom) {
            this.position = this.inputTop + this.inputHeight;
          }
        });
      }
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
      // if this.secondPickerValue else null

      this.$refs.datePanel.status = null;
      if (this.daterange) {
        this.$emit("input", [str, this.secondPickerValue || null]);
        this.$refs.datePanel.status = "year";
      } else {
        this.$emit("input", str);
        this.status = false;
        this.$refs.input.blur();
      }
    },
    secondconfirm(str) {
      //if second value exits delete
      this.secondPickerValue = str;
      this.$emit("input", [this.pickerValue || null, str]);
      this.$refs.datePanel.status = this.$refs.datePanelRange.status = null;
      this.status = false;
      this.$refs.inputRange.blur();
      this.$refs.input.blur();
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

