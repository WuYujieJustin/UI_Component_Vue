<template>
  <div class="datepanel" @mousedown="preventDefault">
    <!-- year -->
    <year-table v-if="datetype == `year`" @chooseYear="confirm" v-show="isYear" />

    <!-- month -->
    <div v-if="datetype == `month`">
      <year-table @chooseYear="confirm" v-show="isYear" />
      <month-table v-show="isMonth" @chooseMonth="confirm" />
    </div>

    <!-- date -->
    <i-input-date-picker v-if="datetype == `date`" @chooseDate="confirm" />

    <!-- time -->
    <div v-if="datetype == `time`">
      <hour :hours="hours" @showMin="showMin" v-show="isHour" />
      <minute :minutes="minutes" @confirm="confirm" v-show="isMin" />
    </div>

    <!-- datetime -->
    <div class="poper" v-if="datetype == `datetime`">
      <i-input-date-picker v-show="isYear" @chooseDate="showHour" />
      <hour :hours="hours" @showMin="showMin" v-show="isHour"/>
      <minute :minutes="minutes" :isMin="isMin" @confirm="confirm" v-show="isMin" />
      <today v-show="isYear || isHour || isMin" @chooseToday="chooseToday" />
    </div>
  </div>
</template>

<script>
import IInputDatePicker from "~/components/parts/IInputDatePicker.vue";
import hour from "~/components/parts/hour.vue";
import minute from "~/components/parts/minute.vue";
import today from "~/components/parts/today.vue";
import yearTable from "~/components/parts/yearTable";
import monthTable from "~/components/parts/monthTable";

// polyfill for IE
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    var toItems = function(value) {
      // support set
      if (value.size > 0 && value.values) {
        let values = value.values();
        var it = values.next();
        var o = [];
        while (!it.done) {
          o.push(it.value);
          it = values.next();
        }
        return o;
      }
      return Object(value);
    };
    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = toItems(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}

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
    // add set to aviod mistake when change status value
    isHour: {
      get() {
        return this.status === "hour";
      },
      set() {}
    },
    isMin: {
      get() {
        return this.status === "min";
      },
      set() {}
    },
    isMonth: {
      get() {
        return this.status === "month";
      },
      set() {}
    },
    isYear: {
      get() {
        return this.status === "year";
      },
      set() {}
    },
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
            vm.$emit("onchange", event.target.value);
          }
        }
      );
    }
  },
  methods: {
    preventDefault(e) {
      e.preventDefault();
    },
    chooseToday() {
      // set all tabs false
      if (this.datetype == "datetime") {
        this.status = null;
        this.pickerValue = new Date().Format(this.format);
        let str = this.pickerValue;
        this.$emit("confirm", str);
      }
      if (this.datetype == "date") {
        this.pickerValue = new Date().Format(this.format).split(" ")[0];
        this.$emit("confirm");
      }
    },
    confirm(event) {
      var eventValue = event.target.innerText;
      if (this.datetype == "year") {
        this.isYear = false;
        this.pickerValue = eventValue;
        this.$emit("confirm", this.pickerValue);
      }

      if (this.datetype == "month" && this.isYear) {
        // year layer
        // inform parent set visible false
        this.$emit("changeStatus");
        this.status = "month";
        this.tempValue = "";
        this.tempValue = eventValue;
      } else if (this.datetype == "month") {
        // month layer use else if to aviod datetype does not match month
        this.pickerValue = this.tempValue + eventValue;
        this.pickerValue = new Date(
          //year
          this.pickerValue.substring(0, 4),
          // month
          this.pickerValue.substring(4, this.pickerValue.length) - 1
        )
          .Format(this.format)
          .substring(0, 7);
        // only slice year and month
        this.$emit("confirm", this.pickerValue);
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
        this.$emit("confirm", this.pickerValue);
      }
      if (this.datetype == "datetime") {
        this.pickerValue = this.tempValue + "-" + eventValue;
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
        let str = this.pickerValue;
        this.$emit("input", this.pickerValue);
        this.$emit("confirm", str);
      }
      if (this.datetype == "time") {
        this.pickerValue = eventValue;
        this.$emit("confirm", this.pickerValue);
      }
    },
    showHour(event) {
      if (this.datetype == "datetime") {
        this.status = "hour";
      }
      // formate poperstyle
      this.$nextTick(()=>{
        this.$emit("poperStyle")
      })
      // receive value from child
      this.$emit("changeStatus");
      this.tempValue = event.target.timeStr;
    },
    showMin(event) {
      // formatr poperStyle
      this.$nextTick(()=>{
        this.$emit("poperStyle")
      })      //format minutes
      this.minutes = [];
      this.hourPassed = Number(event.target.innerText.slice(0, -3));

      for (let i = 0; i < 60; i = i + this.minRange) {
        if (i < 10) {
          this.minutes.push(this.hourPassed + ":0" + i);
        } else {
          this.minutes.push(this.hourPassed + ":" + i);
        }
      }
      // show or hide some pages
      if (this.datetype == "datetime") {
        this.status = "min";
      }
      if (this.datetype == "time") {
        this.status = "min";
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
      hourPassed: "",
      popperClass: "",
      defaultValue: "",
      minTime: "",
      maxTime: "",
      width: 0,
      minutes: [],
      btnvisible: false,
      pickerValue: this.value,
      tempValue: "",
      datetype: this.type,
      status: null
    };
  },
  props: {
    isHourprop: {
      type: Boolean
    },
    isMinprop: {
      type: Boolean
    },
    isYearProp: {
      type: Boolean
    },
    hours: {
      type: Array
    },
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
      // 日期format的格式由父组件传入
      type: String
    },
    type: {
      // 日期选择器
      type: String
    },
    visible: {
      type: Boolean
    }
  }
};
</script>


<style lang="less" scoped>
.datepanel {
  // height: 30px;
  width: 300px;
}

.poper {
  width: 300px;
  z-index: 100;
  // position: absolute;
  background-color: #fff;
  border: 1px solid #CCC
}
input {
  cursor: pointer;
}
</style>
