<template>
  <div class="example" ref="totalWidth">
    <div style="display:flex">
      <!-- <label for="IInputnumber" :style="{color:`${color}`}">{{label}}</label> -->
      <input
        class="form-control"
        ref="input"
        type="text"
        v-bind="$attrs"
        :placeholder="placeholder"
        :readonly="readonly"
        :suffixIcon="suffixIcon"
        :isFormat="isFormat"
        :value="firstText"
        v-on="inputListeners"
        :precision="precision"
        :required="required"
      />
      <div style="width:50px; align-item:center" v-if="numberrange">
        <span class="glyphicon glyphicon-minus" aria-hidden="true" style="margin:10px"></span>
      </div>
      <input
        v-if="numberrange"
        class="form form-control"
        ref="secondinput"
        type="text"
        v-bind="$attrs"
        :placeholder="placeholder"
        :readonly="readonly"
        :suffixIcon="suffixIcon"
        :isFormat="isFormat"
        :value="secondText"
        v-on="secondinputListeners"
        :precision="precision"
        :required="required"
        :style="{'width':width}"
      />
    </div>
    <span v-if="icon || icontext" class="i-container" ref="ispan" @click="inputfocus">
      <i v-bind:class="'fa ' + icon" aria-hidden="true">{{icontext}}</i>
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
  data() {
    return {
      spanwidth: 0,
      width: "0px"
    };
  },
  inheritAttrs: false,
  props: {
    numberrange: {
      type: Boolean
    },
    required: {
      type: Boolean,
      default: false
    },
    // set for v-model
    value: {
      type: [Array, Object, Number]
    },
    // 单位
    icon: {
      type: String
    },
    icontext: {
      type: String
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
      type: Number
    }
  },
  mounted() {
    // // console.log("this.$refs.ispan",this.$refs.ispan)
    if (this.$refs.ispan) {
      var dom = this.$refs.ispan;
      let totalWidth = this.$refs.totalWidth.offsetWidth;
      this.spanwidth = dom.offsetWidth;
      // 固定宽度 400px-50px=350px 400px为totalwidth
      this.width = (totalWidth - 50 - this.spanwidth) / 2 + "px";
      if (this.numberrange) {
        this.$refs.input.style.width = this.width;
      } else {
        this.$refs.input.style.width = totalWidth - this.spanwidth + "px";
      }
    }
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
      this.$refs.input.value = this.formatter.format(this.value.toString());
    }
  },
  computed: {
    firstValue() {
      if (this.numberrange) {
        return this.value[0];
      } else {
        return this.value;
      }
    },
    secondValue() {
      if (this.numberrange) {
        return this.value[1];
      } else {
        return [];
      }
    },
    firstText() {
      if (this.formatter && this.firstValue) {
        return this.formatter.format(this.firstValue.toString());
      } else {
        return this.firstValue;
      }
    },
    secondText() {
      if (this.formatter && this.secondValue) {
        return this.formatter.format(this.secondValue.toString());
      } else {
        return this.secondValue;
      }
    },
    secondinputListeners: function() {
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
            vm.oldstr = vm.$refs.secondinput.value;
            let position = vm.$refs.secondinput.selectionStart;
            vm.isMoveCursor = false;
            if (
              vm.$refs.secondinput.value[
                vm.$refs.secondinput.selectionStart - 1
              ] === ","
            ) {
              vm.isMoveCursor = true;
            }
          },
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            let input = vm.$refs.secondinput;
            let rawStr = input.value;

            if (rawStr === "") {
              // if firsttext exits
              if (vm.firstText) {
                vm.$emit("input", [
                  Number(vm.firstText.toString().replace(/,/g, "")),
                  null
                ]);
              } else {
                vm.$emit("input", [null, null]);
              }
              vm.tempvalue = [];
              return;
            }
            let num = rawStr.replace(/,/g, "");
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

            // 删除最后一位小数  保留两位小数  抛出的num有三位
            // add toString in case num is number
            if (
              num.toString().indexOf(".") > 0 &&
              num
                .toString()
                .split(".")[1]
                .toString().length === 3
            ) {
              num = Number(num.substring(0, num.toString().length - 1));
            }
            if (num.toString().indexOf(".") === num.length - 1) {
              num = Number(num) + ".";
            } else {
              num = Number(num);
            }
            if (vm.firstText !== null) {
              // console.log("not null");
              vm.$emit("input", [
                Number(vm.firstText.toString().replace(/,/g, "")),
                num
              ]);
            } else {
              // console.log(vm.firstText + "??????????????");
              vm.$emit("input", [null, num]);
            }
          }
        }
      );
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
            vm.oldstr = vm.$refs.input.value;
            let position = vm.$refs.input.selectionStart;
            vm.isMoveCursor = false;
            if (
              vm.$refs.input.value[vm.$refs.input.selectionStart - 1] === ","
            ) {
              vm.isMoveCursor = true;
            }
          },
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            let input = vm.$refs.input;
            let rawStr = input.value;
            // console.log(rawStr + "rawStr");

            if (rawStr === "") {
              if (vm.secondText) {
                vm.$emit("input", [
                  null,
                  Number(vm.secondText.toString().replace(/,/g, ""))
                ]);
              } else {
                // if numberrange emit two null
                if (vm.numberrange) {
                  vm.$emit("input", [null, null]);
                } else {
                  vm.$emit("input", null);
                }
              }
              vm.tempvalue = [];
              return;
            }
            let num = rawStr.replace(/,/g, "");
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
            // 删除最后一位小数  保留两位小数  抛出的num有三位
            // add toString in case num is number
            // 如果组件为传值 num !==null
            if (num !== null) {
              if (
                num.toString().indexOf(".") > 0 &&
                num
                  .toString()
                  .split(".")[1]
                  .toString().length === 3
              ) {
                num = Number(num.substring(0, num.toString().length - 1));
              }
              if (num.toString().indexOf(".") === num.length - 1) {
                // num = Number(num)+"."
              } else {
                num = Number(num);
              }
            }

            if (!vm.numberrange) {
              vm.$emit("input", num);
              // console.log(num+"num")
            } else {
              // if numberrange emit the origal secondtext
              if (vm.secondText) {
                vm.$emit("input", [
                  num,
                  Number(vm.secondText.toString().replace(/,/g, ""))
                ]);
              } else {
                vm.$emit("input", [num, null]);
              }
            }
          }
        }
      );
    }
  },
  methods: {
    inputfocus() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped>
</style>

