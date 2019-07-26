<template>
  <div class="example">
    <div >
      <!-- <label for="IInputnumber" :style="{color:`${color}`}">{{label}}</label> -->
      <label type="button" disabled v-if="suffixIcon" :value="`${unit}`"></label>
      <input
        class="form-control"
        ref="inputcompon"
        type="text"
        v-bind="$attrs"
        :placeholder="placeholder"
        :readonly="readonly"
        :suffixIcon="suffixIcon"
        :isFormat="isFormat"
        :value="displayText"
        v-on="inputListeners"
        :precision="precision"
        :required="required"
        :style="{'padding-right':icon?'23px':0}"
      />
    </div>
    <span class="i-container">

    <i v-if="icon || icontext" v-bind:class="'fa ' + icon"  aria-hidden="true">{{icontext}}</i>
    </span>

  </div>
</template>

<script>
var NumeralFormatter = function(
  numeralDecimalMark,
  numeralIntegerScale,
  numeralDecimalScale,
  numeralThousandsGroupStyle,
  numeralPositiveOnly,
  stripLeadingZeroes,
  prefix,
  signBeforePrefix,
  delimiter
) {
  var owner = this;

  owner.numeralDecimalMark = numeralDecimalMark || ".";
  owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
  owner.numeralDecimalScale =
    numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
  owner.numeralThousandsGroupStyle =
    numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
  owner.numeralPositiveOnly = !!numeralPositiveOnly;
  owner.stripLeadingZeroes = stripLeadingZeroes !== false;
  owner.prefix = prefix || prefix === "" ? prefix : "";
  owner.signBeforePrefix = !!signBeforePrefix;
  owner.delimiter = delimiter || delimiter === "" ? delimiter : ",";
  owner.delimiterRE = delimiter ? new RegExp("\\" + delimiter, "g") : "";
};

NumeralFormatter.groupStyle = {
  thousand: "thousand",
  lakh: "lakh",
  wan: "wan",
  none: "none"
};

NumeralFormatter.prototype = {
  getRawValue: function(value) {
    return value
      .replace(this.delimiterRE, "")
      .replace(this.numeralDecimalMark, ".");
  },

  format: function(value) {
    var owner = this,
      parts,
      partSign,
      partSignAndPrefix,
      partInteger,
      partDecimal = "";

    // strip alphabet letters
    value = value
      .replace(/[A-Za-z]/g, "")
      // replace the first decimal mark with reserved placeholder
      .replace(owner.numeralDecimalMark, "M")

      // strip non numeric letters except minus and "M"
      // this is to ensure prefix has been stripped
      .replace(/[^\dM-]/g, "")

      // replace the leading minus with reserved placeholder
      .replace(/^\-/, "N")

      // strip the other minus sign (if present)
      .replace(/\-/g, "")

      // replace the minus sign (if present)
      .replace("N", owner.numeralPositiveOnly ? "" : "-")

      // replace decimal mark
      .replace("M", owner.numeralDecimalMark);

    // strip any leading zeros
    if (owner.stripLeadingZeroes) {
      value = value.replace(/^(-)?0+(?=\d)/, "$1");
    }

    partSign = value.slice(0, 1) === "-" ? "-" : "";
    if (typeof owner.prefix != "undefined") {
      if (owner.signBeforePrefix) {
        partSignAndPrefix = partSign + owner.prefix;
      } else {
        partSignAndPrefix = owner.prefix + partSign;
      }
    } else {
      partSignAndPrefix = partSign;
    }

    partInteger = value;

    if (value.indexOf(owner.numeralDecimalMark) >= 0) {
      parts = value.split(owner.numeralDecimalMark);
      partInteger = parts[0];
      partDecimal =
        owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
    }

    if (partSign === "-") {
      partInteger = partInteger.slice(1);
    }

    if (owner.numeralIntegerScale > 0) {
      partInteger = partInteger.slice(0, owner.numeralIntegerScale);
    }

    switch (owner.numeralThousandsGroupStyle) {
      case NumeralFormatter.groupStyle.lakh:
        partInteger = partInteger.replace(
          /(\d)(?=(\d\d)+\d$)/g,
          "$1" + owner.delimiter
        );

        break;

      case NumeralFormatter.groupStyle.wan:
        partInteger = partInteger.replace(
          /(\d)(?=(\d{4})+$)/g,
          "$1" + owner.delimiter
        );

        break;

      case NumeralFormatter.groupStyle.thousand:
        partInteger = partInteger.replace(
          /(\d)(?=(\d{3})+$)/g,
          "$1" + owner.delimiter
        );

        break;
    }

    return (
      partSignAndPrefix +
      partInteger.toString() +
      (owner.numeralDecimalScale > 0 ? partDecimal.toString() : "")
    );
  }
};

export default {
  inheritAttrs: false,
  props: {
    required: {
      type: Boolean,
      default: false
    },
    // set for v-model
    value: null,
    // 单位
    icon: {
      type: String,
    },
    icontext: {
      type: String,
    },
    unit: {
      type: String,
      default: "CBM"
    },
    //label 内容
    label: {
      type: String,
      default: "文本控件"
    },
    // label 颜色
    color: {
      type: String,
      default: "black"
    },
    //小数位

    //是否有千分位
    isFormat: {
      type: Boolean,
      default: false
    },
    //输入框默认文字
    placeholder: {
      type: String,
      default: ""
    },
    //是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    //是否带图标
    suffixIcon: {
      type: Boolean,
      default: false
    },
    //精度
    precision: {
      type: Number,
      default: 2
    }
  },
  mounted() {
    this.tempvalue = this.value;
    const groupStyle = this.isFormat
      ? NumeralFormatter.groupStyle.thousand
      : NumeralFormatter.groupStyle.none;
    this.formatter = new NumeralFormatter(
      null,
      0,
      Number(this.precision),
      groupStyle
    );
    //直接改变输入框内的值会改变光标的位置
    if (this.value != null) {
      this.$refs.inputcompon.value = this.formatter.format(
        this.value.toString()
      );
    }
  },
  computed: {
    displayText() {
      if (this.value != null && this.formatter) {
        return this.formatter.format(this.value.toString());
      } else {
        return "";
      }
    },
    inputListeners: function() {
      var vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          keydown(e) {
            vm.backspacePressed = e.keyCode === 8;
            vm.oldstr = vm.$refs.inputcompon.value;
            let position = vm.$refs.inputcompon.selectionStart;
            vm.isMoveCursor = false;
            if (
              vm.$refs.inputcompon.value[
                vm.$refs.inputcompon.selectionStart - 1
              ] === ","
            ) {
              vm.isMoveCursor = true;
            }
          },
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            let input = vm.$refs.inputcompon;
            let rawStr = input.value;

            if (rawStr === "") {
              vm.$emit("input", 0);
              vm.tempvalue = 0;
              return;
            }
            let num = Number(rawStr.replace(/,/g, ""));
            if (isNaN(num)) {
              num = vm.tempvalue;
            }
            vm.tempvalue = num;
            let str = vm.formatter.format(rawStr);
            if (str != undefined && str !== rawStr) {
              let start = input.selectionStart;
              let end = input.selectionEnd;
              let rightStart = rawStr.length - start;
              let rightEnd = rawStr.length - end;
              // TODO： calculate start and end.
              let newStart = str.length - rightStart;
              let newEnd = str.length - rightEnd;
              if (start === end) {
                // if cursor on right of .
                const pointIndex = str.indexOf(".");
                if (pointIndex >= 0 && start > pointIndex) {
                  newStart = start;
                  newEnd = end;
                }
                if (vm.backspacePressed && vm.isMoveCursor) {
                  // backspace pressed, move cursor before ','
                  newStart--;
                  newEnd--;
                } else if (rawStr[start] === "," && rawStr[start - 1] === ",") {
                  newStart++;
                  newEnd++;
                }
                if (newStart < 0) {
                  newStart = 0;
                  newEnd = 0;
                }
              }
              input.value = str;

              input.setSelectionRange(newStart, newEnd);
            }
            vm.$emit("input", num);
          }
        }
      );
    }
  }
};
</script>

<style scoped>
</style>

