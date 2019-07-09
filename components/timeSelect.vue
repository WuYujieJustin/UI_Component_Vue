<template>
  <div class="i-input-number">
    <i-input-number v-model="pickerValue" label="时间选择器" @click="showTime" />
    <!-- year and date -->
    <div class="poper">
      <i-input-date-picker v-show="visible" @chooseDate="showHour" />
      <!-- hour -->
      <hour :isHour="isHour" :visible="visible" :hours="hours" @showMin="showMin" />
      <!-- minute -->
      <minute
        :isHour="isHour"
        :visible="visible"
        :minutes="minutes"
        :isMin="isMin"
        @confirm="confirm"
      />
      <today v-show="btnvisible" @chooseToday="chooseToday" />
    </div>
  </div>
</template>

<script>
import IInputDatePicker from "~/components/IInputDatePicker.vue";
import IInputNumber from "~/components/IInputNumber.vue";
import hour from "~/components/hour.vue";
import minute from "~/components/minute.vue";
import today from "~/components/today.vue";

export default {
  components: {
    IInputDatePicker,
    IInputNumber,
    hour,
    minute,
    today
  },
  methods: {
    chooseToday() {
      this.visible = this.isHour = this.isMin = this.btnvisible = false;
      this.pickerValue = new Date();
    },
    confirm(event) {
      // console.log(event.toElement.innerText)
      this.pickerValue = event.target.innerText;
      this.visible = this.isHour = this.isMin = this.btnvisible = false;
    },
    showHour() {
      if (this.isHour) {
        // if isHour false all related will be set false
        this.isHour = this.isMin = false;
      } else {
        this.visible = false;
        this.isHour = true;
      }
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
      if (this.isMin) {
        this.visible = this.isHour = this.isMin = false;
      } else {
        this.isMin = true;
        this.isHour = this.visible = false;
      }
    },
    showTime() {
      // clear time before show
      this.hours = [];
      // format hours
      for (let i = 0; i <= 23; i = i + this.hourRange) {
        this.hours.push(i + ":00");
      }
      if (this.visible) {
        // if isHour false all related will be set false
        this.visible = this.isHour = this.isMin = false;
      } else {
        this.btnvisible = this.visible = true;
      }
    }
  },

  data() {
    return {
      isHour: false,
      hourPassed: "",
      isMin: false,
      popperClass: "",
      value: "",
      defaultValue: "",
      visible: false,
      minTime: "",
      maxTime: "",
      width: 0,
      hours: [],
      minutes: [],
      pickerValue: new Date(),
      btnvisible: false
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
    }
  }
};
</script>


<style lang="less" scoped>

.i-input-number{
  height: 30px;
  width: 300px;
}

.poper{
  width:300px;
  height: 300px;
}
</style>
