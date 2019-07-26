<template>
  <div class="showArea">
    <form  class="form-horizontal" @submit="submit">
      <div
        v-for="(value,name) in allComponents"
        :key="name"
        style="display:flex;flex-direction:column"
      >
        <labeled-text
          v-if="name==='labeledText'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-placeholder="value.control.placeholder"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
        />
        <labeled-text-area
          v-if="name==='labeledTextArea'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-height="value.control.height"
          :control-placeholder="value.control.placeholder"
          :control-readonly="value.control.readonly"
          v-on:keydown="keydowntest"
          v-on:keyup="keyuptest"
        />
        <labeled-select-input
          v-if="name==='labeledSelectInput'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-height="value.control.height"
          :control-placeholder="value.control.placeholder"
          :control-multiple="value.control.multiple"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
          :data-sources="value.data.sources"
          :data-url="value.data.url"
          :data-displayfield="value.data.displayfield"
        />
        <labeled-select-input
          v-if="name==='labeledSelectInputM'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-height="value.control.height"
          :control-placeholder="value.control.placeholder"
          :control-multiple="value.control.multiple"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
          :data-sources="value.data.sources"
          :data-url="value.data.url"
          :data-displayfield="value.data.displayfield"
        />
        <labeled-grid-select-input
          v-if="name==='labeledGridSelectInput'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-height="value.control.height"
          :control-placeholder="value.control.placeholder"
          :control-multiple="value.control.multiple"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
          :data-columns="value.data.columns"
          :data-sources="value.data.sources"
          :data-url="value.data.url"
          :data-displayfield="value.data.displayfield"
        />
        <labeled-grid-select-input
          v-if="name==='labeledGridSelectInputM'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-height="value.control.height"
          :control-placeholder="value.control.placeholder"
          :control-multiple="value.control.multiple"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
          :data-columns="value.data.columns"
          :data-sources="value.data.sources"
          :data-url="value.data.url"
          :data-displayfield="value.data.displayfield"
        />
        <labeled-date-time-input
          v-if="name==='labeledDateTimeInputDateTime'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-placeholder="value.control.placeholder"
          :control-type="value.control.type"
          :control-range="value.control.range"
          :control-format="value.control.format"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
          :data-type="value.data.type"
        />
        <labeled-date-time-input
          v-if="name==='labeledDateTimeInputTime'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-placeholder="value.control.placeholder"
          :control-type="value.control.type"
          :control-range="value.control.range"
          :control-format="value.control.format"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
          :data-type="value.data.type"
        />
        <labeled-date-time-input
          v-if="name==='labeledDateTimeInputMonth'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-placeholder="value.control.placeholder"
          :control-type="value.control.type"
          :control-range="value.control.range"
          :control-format="value.control.format"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
          :data-type="value.data.type"
        />
        <labeled-number-input
          v-on:keydown="keydowntest"
          @keyup="keyuptest"
          v-if="name==='labeledNumberInput'"
          v-model="value.options"
          :label-text="value.label.text"
          :label-class="value.label.class"
          :control-width="value.control.width"
          :control-placeholder="value.control.placeholder"
          :control-precision="value.control.precision"
          :control-isgroupseparator="value.control.isgroupseparator"
          :control-readonly="value.control.readonly"
          :control-icon="value.control.icon"
          :control-icontext="value.control.icontext"
        />
      </div>
      <div style="display:flex;    justify-content: space-between;align-items: center;">
        <button type="submit" class="btn btn-primary" >测试能否提交表单</button>
        <p :class="tips.class" v-show="tips.isShowTips">{{tips.message}}</p>
      </div>
    </form>


    <div style="width:784px" class="">
      <p>您输入了以下数据</p>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>name</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value,name) in allComponents" :key="name">
            <td style="width:150px;min-width:150px">{{value.label.text}}</td>
            <td style="width:600px;max-width:600px">{{value.options.value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
</template>

<script>
import labeledText from "~/components/labeledText";
import labeledTextArea from "~/components/labeledTextArea";
import labeledSelectInput from "~/components/labeledSelectInput";
import labeledGridSelectInput from "~/components/labeledGridSelectInput";
import labeledDateTimeInput from "~/components/labeledDateTimeInput";
import labeledNumberInput from "~/components/labeledNumberInput";

export default {
  components: {
    labeledText,
    labeledTextArea,
    labeledSelectInput,
    labeledGridSelectInput,
    labeledDateTimeInput,
    labeledNumberInput
  },
  data() {
    return {
      tips: {
        message: "",
        class: "",
        isShowTips: false
      },
      allComponents: {
        labeledText: {
          options: {
            value: "this is text",
            locked: false,
            required: true
          },
          label: {
            text: "text",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            readonly: false,
            icon:"fa-spinner fa-spin"
          },
          data: {}
        },
        labeledTextArea: {
          options: {
            value: "this is textarea",
            locked: false,
            required: true
          },
          label: {
            text: "textArea",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            height: "200",
            placeholder: "placeholder",
            readonly: false
          },
          data: {}
        },
        labeledSelectInput: {
          options: {
            value: [1],
            locked: false,
            required: true
          },
          label: {
            text: "select",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            multiple: false,
            readonly: false,
            icon: "fa-bolt"
          },
          data: {
            columns: "",
            sources: [
              {
                id: 1,
                text: "选项1"
              },
              {
                id: 2,
                text: "选项2"
              },
              {
                id: 3,
                text: "选项3"
              },
              {
                id: 4,
                text: "选项4"
              },
              {
                id: 5,
                text: "选项5"
              },
              {
                id: 6,
                text: "选项6"
              },
              {
                id: 7,
                text: "选项7"
              },
              {
                id: 8,
                text: "选项8"
              },
              {
                id: 9,
                text: "选项9"
              },
              {
                id: 10,
                text: "选项10"
              },
              {
                id: 11,
                text: "选项11"
              },
              {
                id: 12,
                text: "选项12"
              },
              {
                id: 13,
                text: "选项13"
              },
              {
                id: 14,
                text: "选项14"
              },
              {
                id: 15,
                text: "选项15"
              },
              {
                id: 16,
                text: "选项16"
              },
              {
                id: 17,
                text: "选项17"
              },
              {
                id: 18,
                text: "选项18"
              },
              {
                id: 19,
                text: "选项19"
              },
              {
                id: 20,
                text: "选项20"
              }
            ],
            url: "",
            displayfield: ""
          }
        },
        labeledSelectInputM: {
          options: {
            value: [1],
            locked: false,
            required: true
          },
          label: {
            text: "select multiple",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            multiple: true,
            readonly: false
          },
          data: {
            columns: "",
            sources: [
              {
                id: 1,
                text: "选项1"
              },
              {
                id: 2,
                text: "选项2"
              },
              {
                id: 3,
                text: "选项3"
              },
              {
                id: 4,
                text: "选项4"
              },
              {
                id: 5,
                text: "选项5"
              },
              {
                id: 6,
                text: "选项6"
              },
              {
                id: 7,
                text: "选项7"
              },
              {
                id: 8,
                text: "选项8"
              },
              {
                id: 9,
                text: "选项9"
              },
              {
                id: 10,
                text: "选项10"
              },
              {
                id: 11,
                text: "选项11"
              },
              {
                id: 12,
                text: "选项12"
              },
              {
                id: 13,
                text: "选项13"
              },
              {
                id: 14,
                text: "选项14"
              },
              {
                id: 15,
                text: "选项15"
              },
              {
                id: 16,
                text: "选项16"
              },
              {
                id: 17,
                text: "选项17"
              },
              {
                id: 18,
                text: "选项18"
              },
              {
                id: 19,
                text: "选项19"
              },
              {
                id: 20,
                text: "选项20"
              }
            ],
            url: "",
            displayfield: ""
          }
        },
        labeledGridSelectInput: {
          options: {
            value: [1],
            locked: false,
            required: true
          },
          label: {
            text: "grid select",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            multiple: false,
            readonly: false,
            icon:"fa-search"
          },
          data: {
            columns: "",
            sources: [
              {
                id: 1,
                code: 1,
                text: "詹姆斯邦德001",
                discribe: "JamesBond001"
              },
              {
                id: 2,
                code: 2,
                text: "詹姆斯邦德002",
                discribe: "JamesBond002"
              },
              {
                id: 3,
                code: 3,
                text: "詹姆斯邦德003",
                discribe: "JamesBond003"
              },
              {
                id: 4,
                code: 4,
                text: "詹姆斯邦德004",
                discribe: "JamesBond004"
              },
              {
                id: 5,
                code: 5,
                text: "詹姆斯邦德005",
                discribe: "JamesBond005"
              },
              {
                id: 6,
                code: 6,
                text: "詹姆斯邦德006",
                discribe: "JamesBond006"
              },
              {
                id: 7,
                code: 7,
                text: "詹姆斯邦德007",
                discribe: "JamesBond007"
              },
              {
                id: 8,
                code: 8,
                text: "詹姆斯邦德008",
                discribe: "JamesBond008"
              },
              {
                id: 9,
                code: 9,
                text: "詹姆斯邦德009",
                discribe: "JamesBond009"
              },
              {
                id: 10,
                code: 10,
                text: "詹姆斯邦德010",
                discribe: "JamesBond010"
              },
              {
                id: 11,
                code: 11,
                text: "詹姆斯邦德011",
                discribe: "JamesBond011"
              },
              {
                id: 12,
                code: 12,
                text: "詹姆斯邦德012",
                discribe: "JamesBond012"
              },
              {
                id: 13,
                code: 13,
                text: "詹姆斯邦德013",
                discribe: "JamesBond013"
              },
              {
                id: 14,
                code: 14,
                text: "詹姆斯邦德014",
                discribe: "JamesBond014"
              },
              {
                id: 15,
                code: 15,
                text: "詹姆斯邦德015",
                discribe: "JamesBond015"
              },
              {
                id: 16,
                code: 16,
                text: "詹姆斯邦德016",
                discribe: "JamesBond016"
              },
              {
                id: 17,
                code: 17,
                text: "詹姆斯邦德017",
                discribe: "JamesBond017"
              },
              {
                id: 18,
                code: 18,
                text: "詹姆斯邦德018",
                discribe: "JamesBond018"
              },
              {
                id: 19,
                code: 19,
                text: "詹姆斯邦德019",
                discribe: "JamesBond019"
              },
              {
                id: 20,
                code: 20,
                text: "詹姆斯邦德020",
                discribe: "JamesBond020"
              }
            ],
            url: "",
            displayfield: ""
          }
        },
        labeledGridSelectInputM: {
          options: {
            value: [1],
            locked: false,
            required: true
          },
          label: {
            text: "grid select multiple",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            multiple: true,
            readonly: false,
            icon:"fa-search"
          },
          data: {
            columns: "",
            sources: [
              {
                id: 1,
                code: 1,
                text: "詹姆斯邦德001",
                discribe: "JamesBond001"
              },
              {
                id: 2,
                code: 2,
                text: "詹姆斯邦德002",
                discribe: "JamesBond002"
              },
              {
                id: 3,
                code: 3,
                text: "詹姆斯邦德003",
                discribe: "JamesBond003"
              },
              {
                id: 4,
                code: 4,
                text: "詹姆斯邦德004",
                discribe: "JamesBond004"
              },
              {
                id: 5,
                code: 5,
                text: "詹姆斯邦德005",
                discribe: "JamesBond005"
              },
              {
                id: 6,
                code: 6,
                text: "詹姆斯邦德006",
                discribe: "JamesBond006"
              },
              {
                id: 7,
                code: 7,
                text: "詹姆斯邦德007",
                discribe: "JamesBond007"
              },
              {
                id: 8,
                code: 8,
                text: "詹姆斯邦德008",
                discribe: "JamesBond008"
              },
              {
                id: 9,
                code: 9,
                text: "詹姆斯邦德009",
                discribe: "JamesBond009"
              },
              {
                id: 10,
                code: 10,
                text: "詹姆斯邦德010",
                discribe: "JamesBond010"
              },
              {
                id: 11,
                code: 11,
                text: "詹姆斯邦德011",
                discribe: "JamesBond011"
              },
              {
                id: 12,
                code: 12,
                text: "詹姆斯邦德012",
                discribe: "JamesBond012"
              },
              {
                id: 13,
                code: 13,
                text: "詹姆斯邦德013",
                discribe: "JamesBond013"
              },
              {
                id: 14,
                code: 14,
                text: "詹姆斯邦德014",
                discribe: "JamesBond014"
              },
              {
                id: 15,
                code: 15,
                text: "詹姆斯邦德015",
                discribe: "JamesBond015"
              },
              {
                id: 16,
                code: 16,
                text: "詹姆斯邦德016",
                discribe: "JamesBond016"
              },
              {
                id: 17,
                code: 17,
                text: "詹姆斯邦德017",
                discribe: "JamesBond017"
              },
              {
                id: 18,
                code: 18,
                text: "詹姆斯邦德018",
                discribe: "JamesBond018"
              },
              {
                id: 19,
                code: 19,
                text: "詹姆斯邦德019",
                discribe: "JamesBond019"
              },
              {
                id: 20,
                code: 20,
                text: "詹姆斯邦德020",
                discribe: "JamesBond020"
              }
            ],
            url: "",
            displayfield: ""
          }
        },
        labeledDateTimeInputDateTime: {
          options: {
            value: "",
            locked: false,
            required: true
          },
          label: {
            text: "datetime with range",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            type: "datetime", //NOT REQUIRED
            range: true, //boolean
            format: "yyyy-MM-dd HH:mm:ss", //string
            readonly: false,
          },
          data: {
            type: ""
          }
        },
        labeledDateTimeInputTime: {
          options: {
            value: "",
            locked: false,
            required: true
          },
          label: {
            text: "time",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            type: "time", //NOT REQUIRED
            range: false, //boolean
            format: "yyyy-MM-dd HH:mm:ss", //string
            readonly: false
          },
          data: {
            type: ""
          }
        },
        labeledDateTimeInputMonth: {
          options: {
            value: "",
            locked: false,
            required: true
          },
          label: {
            text: "datetime",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            type: "datetime", //NOT REQUIRED
            range: false, //boolean
            format: "yyyy-MM-dd HH:mm:ss", //string
            readonly: false
          },
          data: {
            type: ""
          }
        },
        labeledNumberInput: {
          options: {
            value: 1234567890.12,
            locked: false,
            required: true
          },
          label: {
            text: "number",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "500",
            placeholder: "placeholder",
            precision: 2,
            isgroupseparator: true,
            readonly: false,
            icon: "fa-usd"
          },
          data: {
            type: ""
          }
        }
      }
    };
  },
  methods: {
    inputtest() {
      console.log("input");
    },
    keyuptest() {
      console.log("keyup");
    },
    keydowntest(event) {
      console.log("keydown");
    },
    keyuptest(event) {
      console.log("keyup");
    },
    submit(event) {
      console.log("submit event", event);
      event.preventDefault();
      this.tips.isShowTips = true;
      this.tips.message = "提交成功";
      this.tips.class = "text-success";
            var that = this
      setTimeout(() => {
       that.tips.isShowTips = false;
       
     }, 3000);
    }
  }
};
</script>
<style lang="less" scoped>
@import "@/assets/font-awesome-4.7.0/css/font-awesome.min.css";
.showArea {
  width: 100%;
  display: flex;
  justify-content: space-around
}
span {
  line-height: 1.1;
  position: relative;
}
thead tr th {
  text-align: center;
}
// table,
// th,
// td {
//   border: 1px solid black;
// }
// table {
//   position: relative;
//   // table-layout: fixed;
// }
// thead {
//   background-color: gray;
//   color: white;
// }
// th,
// td {
//   padding: 5px;
//   word-wrap: break-word;
// }
// button {
//   margin: 40px;
//   border-radius: 5px;
//   background-color: #49b;
//   height: 40px;
//   width: 150px;
//   font-size: 25px;
//   color: #fff;
// }
</style>
