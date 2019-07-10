<template>
  <div class="i-input-number">
    <input :value="pickerValue" v-on="inputListeners" @click="showTime" />

    <!-- year -->
    <year-table v-if="datetype == `year`" v-show="visible && isYear" @chooseYear="confirm" />

    <!-- month -->
    <div v-if="datetype == `month`">
      <year-table v-show="visible && isYear" @chooseYear="confirm"/>
      <month-table v-show="visible && isMonth" @chooseMonth="confirm" />
    </div>

    <!-- date -->
    <i-input-date-picker v-if="datetype == `date`" v-show="visible" @chooseDate="confirm" />

    <!-- time -->
    <div v-if="datetype == `time`">
      <hour />
      <minute />
    </div>

    <!-- year month datepicker -->
    <div class="poper" v-if="datetype == `datetime`">
      <i-input-date-picker v-show="visible" @chooseDate="showHour" />
      <!-- hour -->
      <hour :isHour="isHour" :hours="hours" @showMin="showMin" />
      <!-- minute -->
      <minute :minutes="minutes" :isMin="isMin" @confirm="confirm" />
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
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
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
          }
        }
      );
    }
  },
  methods: {
    chooseToday() {
      this.visible = this.isHour = this.isMin = this.btnvisible = false;
      this.pickerValue = new Date().Format(this.format);
    },
    confirm(event) {
      if (this.datetype == "datetime" || "month" || "year") {
        // controls the order of year and month
        if(this.isYear){
          console.log("year",this.isYear)
          this.isYear = false
          this.isMonth = true
        }else{
          this.isYear =  this.isMonth = false
        }
        if(!this.visible){
          this.isYear = this.isMonth = false
        }
        // if final step done clear all content
        if(this.datetype == "month" && this.pickerValue && this.pickerValue.length >5){
          this.pickerValue = this.tempValue = ''
        }
        if(this.datetype == "year" && this.pickerValue){
          this.pickerValue = this.tempValue = ''
        }
        // assign value to input
        this.tempValue = this.tempValue + " " + event.target.innerText;
        this.pickerValue = this.tempValue;
        console.log("tempValue",this.tempValue)
        this.isHour = this.isMin = this.btnvisible = false;
      } else {
        this.pickerValue = event.target.innerText;
      }
      if(this.datetype == "date"){
        this.pickerValue = event.target.timeStr;
        this.visible = false;
      }
    },
    showHour(event) {
      if (this.isHour) {
        // if isHour false all related will be set false
        this.visible = this.isHour = this.isMin = false;
      } else {
        this.visible = false;
        this.isHour = true;
      }
      // receive value from child
      this.tempValue = event.target.timeStr
      console.log(this.tempValue)
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
      if (this.isMin) {
        this.visible = this.isHour = this.isMin = false;
      } else {
        this.isMin = true;
        this.isHour = this.visible = false;
      }
      // this.tempValue = this.tempValue+' '+ event.target.innerText
      // // console.log(event.target.innerText)
      // console.log(this.tempValue)
    },
    showTime() {
      if (this.datetype == "datetime") {
        // clear time before show
        this.hours = [];
        // format hours
        for (let i = 0; i <= 23; i = i + this.hourRange) {
          this.hours.push(i + ":00");
        }
      }
      if (this.visible) {
        // if isHour false all related will be set false
        this.visible = this.isHour = this.isMin = this.btnvisible = false;
      } else {
        this.btnvisible = this.visible = this.isYear = true;
        this.isHour = this.isMin = false;
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
</style>
