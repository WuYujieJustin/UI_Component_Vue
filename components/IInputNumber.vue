<template>
  <div class="IInputnumber">
    <div>
      <label for="IInputnumber" :style="{color:`${color}`}">{{label}}</label>
      <input type="button" disabled v-if="suffixIcon" :value="`${unit}`"/>
      <input 
        ref="inputcompon"
        type="text"
        :placeholder="placeholder"
        :readonly="readonly"
        :suffixIcon="suffixIcon"
        @keydown="hangdlekeydown"
        v-on="inputListeners"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // set for v-model
    value: {},
    // 单位
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
    precision: {
      type: Number
    },
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
      validator(val) {
        return val >= 0 && val === parseInt(val, 10);
      }
    }
  },
  mounted() {
      this.tempvalue = this.value
      console.log('created this.value', this.value)
      this.$refs.inputcompon.value = this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  },
  methods:{
      hangdlekeydown(){
        //   console.log(this.num)
      }
  },
  watch: {
    num: function() {
      console.log(this.num);
      this.num = this.num.replace(/,/g, "");
      this.num = this.num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      return this.num;
    },
  },
  computed: {
    xvalue() {
        console.log('this.value', this.value)
        let num = Number(this.value.toString().replace(',',''))
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
       
    },
    inputListeners: function () {
         console.log('$listeners', Object.keys(this.$listeners))
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            let str = vm.$refs.inputcompon.value
            let num = Number(str.replace(/,/g, ''))
            if(isNaN(num)) {
                console.log('isNaN', num, str.replace(/,/g, ''))
                num = vm.tempvalue
            }
            console.log('num is', num, 'str', str)
            vm.tempvalue = num
            vm.$refs.inputcompon.value = num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            vm.$emit('input', num)
          }
        }
      )
    }
  }
};
</script>

<style scoped>
input {
  float: right;
}
</style>

