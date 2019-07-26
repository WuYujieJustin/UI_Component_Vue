<template>
  <div class="example"
   
  >
    <input
      :value="this.value"
      v-on="inputListeners"
      @click="showTime"
      class="form-control"
      @blur="changeBlur"
      :required="required"
      :placeholder="placeholder"
       :style="{'padding-right':icon?'23px':0}"
    />
    <div class="datepicker" v-show="status">
      <date-panel
        ref="datePanel"
        :hours="hours"
        @confirm="firstconfirm"
        :format="format"
        :type="type"
        :isYearProp="isYearProp"
      />
      <date-panel
        ref="datePanelRange"
        v-if="range"
        :hours="hours"
        @confirm="secondconfirm"
        :format="format"
        :type="type"
        :isYearProp="isYearProp"
      />
    </div>
    <span class="i-container">

    <i v-if="icon || icontext" v-bind:class="'fa ' + icon"  aria-hidden="true">{{icontext}}</i>
    </span>

  </div>
</template>

<script>
import datePanel from "~/components/parts/datePanel.vue";
// window.onClick = function(){
//   console.log("??????????????????")
// }
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
            vm.$emit("input", event.target.value);
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
      hours: [],
      minutes: [],
      datetype: this.type,
      isHourprop: false,
      isMinprop: false,
      isMonthprop: false,
      btnvisibleprop: false,
      isYearProp: false,
      pickerValue: this.value,
      status: false
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
      type: String,
    },
    value: {
      type: String,
      default: ""
    },
    range: {
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
  methods: {
    changeBlur() {
      this.status = false;
    },
    firstconfirm(str) {
      this.pickerValue = str;
      this.$emit("input", str);
      this.$refs.datePanel.status = null;
      if (this.range) {
        this.$refs.datePanel.status = "year";
      } else {
        this.status = false;
      }
    },
    secondconfirm(str) {
      // if second value exits delete
      if (this.pickerValue.indexOf(" 到 ")) {
        this.pickerValue = this.pickerValue.split("到")[0];
      }
      this.pickerValue = this.pickerValue + "到" + str;

      this.$emit("input", this.pickerValue);
      this.$refs.datePanel.status = this.$refs.datePanelRange.status = null;
      this.status = false;
    },
    showTime() {
      this.status = !this.status;
      if (this.datetype == "month") {
        this.$refs.datePanel.status = "year";
        if (this.range) {
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
        if (this.range) {
          this.$refs.datePanelRange.status = "year";
        }
      }

      // only one layer use boolean type
      if (this.datetype == "year" || this.datetype == "date") {
        this.$refs.datePanel.status = "year";
        if (this.range) {
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
        if (this.range) {
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
  z-index: 100;
}
</style>

