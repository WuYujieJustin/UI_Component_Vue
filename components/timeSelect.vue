<template>
  <div class="datePanel">
    <input :value="pickerValue" v-on="inputListeners" @click="showTime" @input="changeInput" />

    <!-- year -->
    <year-table v-if="datetype == `year`" v-show="isYear" @chooseYear="confirm" />

    <!-- month -->
    <div v-if="datetype == `month`">
      <year-table v-show="isYear" @chooseYear="confirm" />
      <month-table v-show="isMonth" @chooseMonth="confirm" />
    </div>

    <!-- date -->
    <i-input-date-picker v-if="datetype == `date`" v-show="visible" @chooseDate="confirm" />

    <!-- time -->
    <div v-if="datetype == `time`">
      <hour :hours="hours" @showMin="showMin" v-show="isHour" />
      <minute :minutes="minutes" @confirm="confirm" v-show="isMin" />
    </div>

    <!-- datetime -->
    <div class="poper" v-if="datetype == `datetime`">
      <i-input-date-picker v-show="visible" @chooseDate="showHour" />
      <!-- hour -->
      <hour :hours="hours" @showMin="showMin" v-show="isHour" />
      <!-- minute -->
      <minute :minutes="minutes" :isMin="isMin" @confirm="confirm" v-show="isMin" />
      <today v-show="btnvisible" @chooseToday="chooseToday" />
    </div>
  </div>
</template>

<script>
import IInputDatePicker from "~/components/IInputDatePicker.vue";
import hour from "~/components/hour.vue";
import minute from "~/components/minute.vue";
import today from "~/components/today.vue";
import yearTable from "~/components/yearTable";
import monthTable from "~/components/monthTable";

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时 H 大写
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

export default {
  components: {
    IInputDatePicker,
    hour,
    minute,
    today,
    yearTable,
    monthTable
  },
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
          },
          onchange: function(event) {
            vm.$emit("onchang", event.target.value);
          }
        }
      );
    }
  },
  methods: {
    // when user type this.pickerValue follows
    changeInput(e) {
      this.pickerValue = e.target.value;
    },
    chooseToday() {
      // set all tabs false
      if (this.datetype == "datetime") {
        this.visible = this.isHour = this.isMin = this.btnvisible = false;
        this.pickerValue = new Date().Format(this.format);
      }
      if (this.datetype == "date") {
        this.pickerValue = new Date().Format(this.format).split(" ")[0];
      }
    },
    confirm(event) {
      var eventValue = event.target.innerText;
      if (this.datetype == "year") {
        this.isYear = false;
        this.pickerValue = eventValue;
      }

      if (this.datetype == "month" && this.isYear) {
        // year layer
        this.isYear = false;
        this.isMonth = true;
        console.log("thisthis", eventValue);
        this.pickerValue = eventValue;
      } else if (this.datetype == "month") {
        // month layer use else if to aviod datetype does not match month
        this.isYear = this.isMonth = false;
        this.pickerValue += eventValue;
        this.pickerValue = new Date(
          //year
          this.pickerValue.substring(0, 4),
          // month
          this.pickerValue.substring(4, this.pickerValue.length) - 1
        )
          .Format(this.format)
          .substring(0, 7);
        // only slice year and month
      }

      if (this.datetype == "date") {
        this.pickerValue = event.target.timeStr;
        this.pickerValue = new Date(
          //year
          this.pickerValue.split("-")[0],
          //month
          this.pickerValue.split("-")[1] - 1,
          //day
          this.pickerValue.split("-")[2]
        )
          .Format(this.format)
          .substring(0, 10);
        // only slice year month date
      }
      if (this.datetype == "datetime") {
        this.pickerValue = this.tempValue + "-" + eventValue;
        console.log(this.pickerValue);
        let yearArray = this.pickerValue.split("-");
        let hourArray = this.pickerValue.split("-")[3].split(":");
        yearArray.pop();
        let fullArray = yearArray.concat(hourArray);
        this.pickerValue = new Date(
          // year
          fullArray[0],
          //month index 0 month 1
          fullArray[1] - 1,
          //day
          fullArray[2],
          //hour
          fullArray[3],
          //min
          fullArray[4]
        ).Format(this.format);
        // to make v-model work
        this.$emit("input",this.pickerValue)
        this.isMin = this.btnvisible = this.visible = this.isHour = false;
      }
      if (this.datetype == "time") {
        this.pickerValue = eventValue;
        this.isHour = this.isMin = false;
      }
    },
    showHour(event) {
      // if (this.isHour) {
      //   // if isHour false all related will be set false
      //   this.visible = this.isHour = this.isMin = false;
      // } else {
      //   this.visible = false;
      //   this.isHour = true;
      // }
      if (this.datetype == "datetime") {
        console.log("???????????");
        if (this.visible) {
          this.visible = false;
          this.isHour = true;
        }
      }
      // receive value from child
      this.tempValue = event.target.timeStr;
      console.log(this.pickerValue);
      console.log(this.tempValue);
    },
    showMin(event) {
      //format minutes
      this.minutes = [];
      this.hourPassed = Number(event.toElement.innerText.slice(0, -3));

      for (let i = 0; i < 60; i = i + this.minRange) {
        if (i < 10) {
          this.minutes.push(this.hourPassed + ":0" + i);
        } else {
          this.minutes.push(this.hourPassed + ":" + i);
        }
      }
      // show or hide some pages
      if (this.datetype == "datetime") {
        this.isMin = this.btnvisible = true;
        this.isHour = this.visible = false;
      }
      if (this.datetype == "time") {
        this.isHour = false;
        this.isMin = true;
      }
    },
    showTime() {
      if (this.datetype == "datetime") {
        // clear time before show
        this.hours = [];
        // format hours
        for (let i = 0; i <= 23; i = i + this.hourRange) {
          this.hours.push(i + ":00");
        }
        if (!this.visible) {
          this.visible = this.btnvisible = true;
          this.isHour = this.isMin = false;
        } else {
          this.visible = this.isHour = this.isMin = this.btnvisible = false;
        }
      }

      // only one layer use boolean type
      if (this.datetype == "year" || this.datetype == "date") {
        this.isYear = !this.isYear;
        this.visible = !this.visible;
      }
      // showtime 只负责第一层逻辑  一层一层往下
      if (this.datetype == "month") {
        if (this.isYear) {
          this.isYear = false;
          this.isMonth = false;
        } else {
          this.isYear = true;
          this.isMonth = false;
        }
      }

      if (this.datetype == "time") {
        // clear time before show
        this.hours = [];
        // format hours
        for (let i = 0; i <= 23; i = i + this.hourRange) {
          this.hours.push(i + ":00");
        }
        this.isHour = !this.isHour;
        this.isMin = false;
      }
    }
  },

  data() {
    return {
      isHour: false,
      hourPassed: "",
      isMin: false,
      popperClass: "",
      defaultValue: "",
      visible: false,
      minTime: "",
      maxTime: "",
      width: 0,
      hours: [],
      minutes: [],
      btnvisible: false,
      pickerValue: this.value,
      tempValue: "",
      datetype: this.type,
      isYear: false,
      isMonth: false
    };
  },
  props: {
    hourRange: {
      type: Number,
      default: 1
    },
    minRange: {
      type: Number,
      default: 5
    },
    value: {
      type: String
    },
    fmt: {
      type: String
    },
    year: {
      type: Boolean,
      default: false
    },
    month: {
      type: Boolean,
      default: false
    },
    date: {
      type: Boolean,
      default: false
    },
    datetime: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "yyyy-MM-dd HH-mm"
    },
    type: {
      type: String,
      default: "datetime"
    },
    step: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    }
  }
};
</script>


<style lang="less" scoped>
.i-input-number {
  height: 30px;
  width: 300px;
}

.poper {
  width: 300px;
  height: 300px;
}
input {
  cursor: pointer;
}
</style>
