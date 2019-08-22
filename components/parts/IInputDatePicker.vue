<template>
  <div class="datepicker">
    <div class="controlPanel">
      <div>
        <button type="button" class="btn" @click="prevYear">&lt;&lt;</button>
        <button type="button" class="btn" @click="prevMonth" v-show="currentView === 'date'">&lt;</button>
      </div>
      <div class="yearmonth">
        <p @click="popYear">{{ yearLabel }}</p>
        <p @click="popMonth">{{`${ month + 1 }`}}月</p>
      </div>
      <div style="margin-right:2px">
        <button type="button" class="btn" @click="nextMonth" v-show="currentView === 'date'">&gt;</button>
        <button type="button" class="btn" @click="nextYear">&gt;&gt;</button>
      </div>
    </div>
    <year-table v-show="yearVisible" @chooseYear="closeYear" />
    <month-table v-show="monthVisible" @chooseMonth="closeMonth" />
    <table>
      <tbody>
        <tr>
          <th disabled class="weeks" v-for="(week, key) in WEEKS" :key="key">{{week}}</th>
        </tr>
        <tr v-for="(row, key) in rows" :key="key">
          <td
            v-for="(cell, key) in row"
            :class="getCellClasses(cell)"
            :key="key"
            @click="chooseDate(cell)"
          >
            <span>{{ cell.text }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import {
  getFirstDayOfMonth,
  getDayCountOfMonth,
  getWeekNumber,
  getStartDateOfMonth,
  prevDate,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  nextDate,
  isDate,
  clearTime as _clearTime,
  arrayFindIndex,
  arrayFind,
  coerceTruthyValueToArray
} from "~/utils/date-util";
import yearTable from "~/components/parts/yearTable";
import monthTable from "~/components/parts/monthTable";

const WEEKS = ["日", "一", "二", "三", "四", "五", "六"];
const getDateTimestamp = function(time) {
  if (typeof time === "number" || typeof time === "string") {
    return _clearTime(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return _clearTime(time).getTime();
  } else {
    return NaN;
  }
};
export default {
  components: {
    yearTable,
    monthTable
  },
  methods: {
    enter() {
      this.chooseDate();
    },
    right() {
      this.time = this.date.setDate(this.date.getDate() + 1);
      this.date = new Date(this.time);
    },
    left() {
      this.time = this.date.setDate(this.date.getDate() - 1);
      this.date = new Date(this.time);
    },
    up() {
      this.time = this.date.setDate(this.date.getDate() - 7);
      this.date = new Date(this.time);
    },
    down() {
      this.time = this.date.setDate(this.date.getDate() + 7);
      this.date = new Date(this.time);
    },
    popYear(event) {
      this.yearVisible = !this.yearVisible;
      this.monthVisible = false;
    },
    popMonth() {
      this.monthVisible = !this.monthVisible;
      this.yearVisible = false;
    },
    closeMonth() {
      let times = Number(event.target.innerText) - (this.month + 1);
      if (times > 0) {
        for (let k = 0; k < times; k++) {
          this.date = nextMonth(this.date);
        }
      } else {
        for (let k = 0; k < -times; k++) {
          this.date = prevMonth(this.date);
        }
      }
      this.monthVisible = false;
      this.yearVisible = false;
    },
    closeYear(event) {
      // change this.date to change year

      let times = Number(event.target.innerText) - this.year;
      if (times > 0) {
        for (let i = 0; i < times; i++) {
          this.date = nextYear(this.date);
        }
      } else {
        for (let j = 0; j < -times; j++) {
          this.date = prevYear(this.date);
        }
      }
      this.yearVisible = false;
      this.monthVisible = false;
    },
    chooseDate(cell) {
      // cell 用来判断月份类型  非必须
      if (cell) {
        if (cell.type == "prev-month") {
          this.date = prevMonth(this.date);
        }
        if (cell.type == "next-month") {
          this.date = nextMonth(this.date);
        }
      }

      this.rightMonth = this.month + 1;
      let timeStr = this.year + "-" + this.rightMonth + "-";
      // 通过键盘或者点击事件选择
      if (cell === undefined) {
        timeStr += this.date.getDate();
      } else {
        timeStr += Number(cell.text);
        this.time = this.date.setDate(Number(cell.text));
        this.date = new Date(this.time);
      }
      // add timeStr to event Object
      event.target.timeStr = timeStr;
      // inform parent component chooseDate fired
      this.$emit("chooseDate", event);
    },
    prevMonth() {
      this.date = prevMonth(this.date);
    },

    nextMonth() {
      this.date = nextMonth(this.date);
    },

    prevYear() {
      if (this.currentView === "year") {
        this.date = prevYear(this.date, 10);
      } else {
        this.date = prevYear(this.date);
      }
    },

    nextYear() {
      if (this.currentView === "year") {
        this.date = nextYear(this.date, 10);
      } else {
        this.date = nextYear(this.date);
      }
    },
    getDateOfCell(row, column) {
      const offsetFromStart =
        row * 7 + (column - (this.showWeekNumber ? 1 : 0)) - this.offsetDay;
      return nextDate(this.startDate, offsetFromStart);
    },
    cellMatchesDate(cell, date) {
      const value = new Date(date);
      return (
        this.year === value.getFullYear() &&
        this.month === value.getMonth() &&
        Number(cell.text) === value.getDate()
      );
    },
    getCellClasses(cell) {
      const selectionMode = this.selectionMode;
      const defaultValue = this.defaultValue
        ? Array.isArray(this.defaultValue)
          ? this.defaultValue
          : [this.defaultValue]
        : [];

      let classes = [];
      if ((cell.type === "normal" || cell.type === "today") && !cell.disabled) {
        classes.push("available");
        if (cell.type === "today") {
          classes.push("today");
        }
      } else {
        classes.push(cell.type);
      }

      if (
        cell.type === "normal" &&
        defaultValue.some(date => this.cellMatchesDate(cell, date))
      ) {
        classes.push("default");
      }

      if (
        (cell.type === "normal" || cell.type === "today") &&
        this.cellMatchesDate(cell, this.date)
      ) {
        classes.push("current");
      }
      if(cell.selected == true){
        classes.push("current")
      }

      if (
        cell.inRange &&
        (cell.type === "normal" ||
          cell.type === "today" ||
          this.selectionMode === "week")
      ) {
        classes.push("in-range");

        if (cell.start) {
          classes.push("start-date");
        }

        if (cell.end) {
          classes.push("end-date");
        }
      }

      if (cell.disabled) {
        classes.push("disabled");
      }

      if (cell.selected) {
        classes.push("selected");
      }

      return classes.join(" ");
    },
    isWeekActive(cell) {
      if (this.selectionMode !== "week") return false;
      const newDate = new Date(this.year, this.month, 1);
      const year = newDate.getFullYear();
      const month = newDate.getMonth();

      if (cell.type === "prev-month") {
        newDate.setMonth(month === 0 ? 11 : month - 1);
        newDate.setFullYear(month === 0 ? year - 1 : year);
      }

      if (cell.type === "next-month") {
        newDate.setMonth(month === 11 ? 0 : month + 1);
        newDate.setFullYear(month === 11 ? year + 1 : year);
      }

      newDate.setDate(parseInt(cell.text, 10));

      if (isDate(this.value)) {
        const dayOffset =
          ((this.value.getDay() - this.firstDayOfWeek + 7) % 7) - 1;
        const weekDate = prevDate(this.value, dayOffset);
        return weekDate.getTime() === newDate.getTime();
      }
      return false;
    }
  },
  props: {
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: val => val >= 1 && val <= 7
    },

    value: {},

    defaultValue: {
      validator(val) {
        // either: null, valid Date object, Array of valid Date objects
        return (
          val === null ||
          isDate(val) ||
          (Array.isArray(val) && val.every(isDate))
        );
      }
    },

    propDate: {
      type: Date,
      default: function() {
        return new Date();
      }
    },

    selectionMode: {
      default: "day"
    },

    showWeekNumber: {
      type: Boolean,
      default: false
    },

    disabledDate: {},

    minDate: {},

    maxDate: {},

    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },
  data() {
    return {
      time: new Date().getTime(),
      isHour: false,
      tableRows: [[], [], [], [], [], []],
      lastRow: null,
      lastColumn: null,
      currentView: "date",
      rightMonth: this.month,
      yearVisible: false,
      monthVisible: false,
      date: new Date(this.propDate.getTime())
    };
  },
  computed: {
    year() {
      if (this.date) {
        // console.log(this.date.getFullYear())
        return this.date.getFullYear();
      }
    },
    month() {
      if (this.date) {
        // console.log(this.date.getMonth())
        return this.date.getMonth();
      }
    },
    yearLabel() {
      const yearTranslation = "年";
      if (this.currentView === "year") {
        const startYear = Math.floor(this.year / 10) * 10;
        if (yearTranslation) {
          return (
            startYear +
            " " +
            yearTranslation +
            " - " +
            (startYear + 9) +
            " " +
            yearTranslation
          );
        }
        return startYear + " - " + (startYear + 9);
      }
      return this.year + yearTranslation;
    },
    offsetDay() {
      const week = this.firstDayOfWeek;
      // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
      return week > 3 ? 7 - week : -week;
    },

    WEEKS() {
      const week = this.firstDayOfWeek;
      return WEEKS.concat(WEEKS).slice(week, week + 7);
    },

    startDate() {
      return getStartDateOfMonth(this.year, this.month);
    },
    rows() {
      // TODO: refactory rows / getCellClasses
      const date = new Date(this.year, this.month, 1);
      let day = getFirstDayOfMonth(date); // day of first day
      const dateCountOfMonth = getDayCountOfMonth(
        date.getFullYear(),
        date.getMonth()
      );
      const dateCountOfLastMonth = getDayCountOfMonth(
        date.getFullYear(),
        date.getMonth() === 0 ? 11 : date.getMonth() - 1
      );

      day = day === 0 ? 7 : day;

      const offset = this.offsetDay;
      const rows = this.tableRows;
      let count = 1;

      const startDate = this.startDate;
      const disabledDate = this.disabledDate;
      const selectedDate =
        this.selectionMode === "dates"
          ? coerceTruthyValueToArray(this.value)
          : [];
      const now = getDateTimestamp(new Date());

      for (let i = 0; i < 6; i++) {
        const row = rows[i];

        if (this.showWeekNumber) {
          if (!row[0]) {
            row[0] = {
              type: "week",
              text: getWeekNumber(nextDate(startDate, i * 7 + 1))
            };
          }
        }

        for (let j = 0; j < 7; j++) {
          let cell = row[this.showWeekNumber ? j + 1 : j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
              inRange: false,
              start: false,
              end: false
            };
          }

          cell.type = "normal";

          const index = i * 7 + j;
          const time = nextDate(startDate, index - offset).getTime();
          cell.inRange =
            time >= getDateTimestamp(this.minDate) &&
            time <= getDateTimestamp(this.maxDate);
          cell.start = this.minDate && time === getDateTimestamp(this.minDate);
          cell.end = this.maxDate && time === getDateTimestamp(this.maxDate);
          const isToday = time === now;

          if (isToday) {
            cell.type = "today";
          }

          if (i >= 0 && i <= 1) {
            const numberOfDaysFromPreviousMonth =
              day + offset < 0 ? 7 + day + offset : day + offset;

            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++;
            } else {
              cell.text =
                dateCountOfLastMonth -
                (numberOfDaysFromPreviousMonth - (j % 7)) +
                1 +
                i * 7;
              cell.type = "prev-month";
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++;
            } else {
              cell.text = count++ - dateCountOfMonth;
              cell.type = "next-month";
            }
          }

          let cellDate = new Date(time);
          cell.disabled =
            typeof disabledDate === "function" && disabledDate(cellDate);
          cell.selected = arrayFind(
            selectedDate,
            date => date.getTime() === cellDate.getTime()
          );

          this.$set(row, this.showWeekNumber ? j + 1 : j, cell);
        }

        if (this.selectionMode === "week") {
          const start = this.showWeekNumber ? 1 : 0;
          const end = this.showWeekNumber ? 7 : 6;
          const isWeekActive = this.isWeekActive(row[start + 1]);

          row[start].inRange = isWeekActive;
          row[start].start = isWeekActive;
          row[end].inRange = isWeekActive;
          row[end].end = isWeekActive;
        }
      }

      return rows;
    }
  }
};
</script>

<style lang="less" scoped>
.available:hover {
  color: skyblue;
}
.current:hover {
  color: white;
}
.controlPanel {
  display: flex;
  justify-content: space-between;
}
.available {
  cursor: pointer;
}
.prev-month {
  cursor: pointer;
  color: gray;
}
.next-month {
  cursor: pointer;
  color: gray;
}
button {
  background: #fff;
  border: none;
}
table {
  width: 300px;
}
.yearmonth {
  padding: 10px;
  display: flex;
}
p {
  cursor: pointer;
}
.current {
  color: white;
  background: skyblue;
}
td {
  padding: 10px;
}
.datepicker {
  width: 300px;
  background: #fff;
  border: 1px solid #cccccc;
}
th {
  text-align: center;
}
</style>

