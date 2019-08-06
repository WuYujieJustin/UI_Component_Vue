<template>
  <div class="showArea">
    <div class="content_body">
      <form class="form-horizontal" @submit="submit">
        <div style="display:flex;flex-direction:column">
          <labeled-text
            v-model="labeledText.options"
            label-text="text"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-refresh fa-spin fa-fw"
            control-icontext=" "
          />
          <labeled-text-area
            v-model="labeledTextArea.options"
            label-text="textarea"
            label-class="class1"
            control-height="200"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
          />
          <labeled-select-input
            v-model="labeledSelectInput.options"
            label-text="select"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-bolt"
            control-icontext=" select"
            :control-multiple="false"
            :data-sources="labeledSelectInput.data.sources"
            data-url
            data-displayfield="text"
          />
          <labeled-select-input
            v-model="labeledSelectInputM.options"
            label-text="select multiple"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon
            control-icontext
            :control-multiple="true"
            :data-sources="labeledSelectInputM.data.sources"
            data-url
            data-displayfield="text"
          />
          <labeled-grid-select-input
            v-model="labeledGridSelectInput.options"
            label-text="grid select"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-search"
            control-icontext=" grid select"
            :control-multiple="false"
            :data-sources="labeledGridSelectInput.data.sources"
            data-url
            data-displayfield
            data-columns="text"
          />
          <labeled-grid-select-input
            v-model="labeledGridSelectInputM.options"
            label-text="grid select multiple"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-search"
            control-icontext=" multiple"
            :control-multiple="true"
            :data-sources="labeledGridSelectInputM.data.sources"
            data-url
            data-displayfield
            data-columns="text"
          />
          <labeled-date-time-input
            v-model="labeledDateTimeInputDateTime.options"
            label-text="datetime with range"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-calendar"
            control-icontext=" datetime range"
            control-type="datetime"
            :control-date-range="true"
            control-format="yyyy-MM-dd HH:mm:ss"
          />
          <labeled-date-time-input
            v-model="labeledDateTimeInputTime.options"
            label-text="time"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-calendar"
            control-icontext=" time"
            control-type="time"
            control-range
            control-format="HH:mm:ss"
          />
          <labeled-date-time-input
            v-model="labeledDateTimeInputMonth.options"
            label-text="datetime"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-calendar"
            control-icontext=" datetime"
            control-type="datetime"
            :control-range="false"
            control-format="yyyy-MM-dd HH:mm:ss"
          />
          <labeled-number-input
            v-model="labeledNumberInput.options"
            label-text="number"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-usd"
            control-icontext=" number"
            :control-precision="2"
            :control-isgroupseparator="true"
            :control-number-range="false"
          />
          <labeled-number-input
            v-model="labeledNumberInputRange.options"
            label-text="numberrange"
            label-class="class1"
            control-width="500"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-usd"
            control-icontext=" number"
            :control-precision="2"
            :control-isgroupseparator="true"
            :control-number-range="true"
          />
        </div>
        <div style="display:flex;    justify-content: space-between;align-items: center;">
          <button type="submit" class="btn btn-primary">测试能否提交表单</button>
          <p :class="tips.class" v-show="tips.isShowTips">{{tips.message}}</p>
        </div>
      </form>

      <div style="margin-left:20px" class>
        <p>您输入了以下数据</p>
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>name</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width:150px;min-width:150px">text</td>
              <td style="width:600px;max-width:600px">{{labeledText.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">textarea</td>
              <td style="width:600px;max-width:600px">{{labeledTextArea.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">select</td>
              <td style="width:600px;max-width:600px">{{labeledSelectInput.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">select multiple</td>
              <td style="width:600px;max-width:600px">{{labeledSelectInputM.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">grid select</td>
              <td style="width:600px;max-width:600px">{{labeledGridSelectInput.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">grid select multiple</td>
              <td style="width:600px;max-width:600px">{{labeledGridSelectInputM.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">datetime with range</td>
              <td style="width:600px;max-width:600px">{{labeledDateTimeInputDateTime.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">time</td>
              <td style="width:600px;max-width:600px">{{labeledDateTimeInputTime.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">datetime</td>
              <td style="width:600px;max-width:600px">{{labeledDateTimeInputMonth.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">number</td>
              <td style="width:600px;max-width:600px">{{labeledNumberInput.options.value}}</td>
            </tr>
            <tr>
              <td style="width:150px;min-width:150px">number with range</td>
              <td style="width:600px;max-width:600px">{{labeledNumberInputRange.options.value}}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      labeledText: {
        options: {
          value: "this is text",
          locked: false,
          required: true
        }
      },
      labeledTextArea: {
        options: {
          value: "this is textarea",
          locked: false,
          required: true
        }
      },
      labeledSelectInput: {
        options: {
          value: [1],
          locked: false,
          required: true
        },
        data: {
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
          ]
        }
      },
      labeledSelectInputM: {
        options: {
          value: [1, 2],
          locked: false,
          required: true
        },

        data: {
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
          ]
        }
      },
      labeledGridSelectInput: {
        options: {
          value: [1],
          locked: false,
          required: true
        },
        data: {
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
          ]
        }
      },
      labeledGridSelectInputM: {
        options: {
          value: [1, 2],
          locked: false,
          required: true
        },
        data: {
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
              id: 200,
              code: 20,
              text: "詹姆斯邦德020",
              discribe: "JamesBond020"
            }
          ]
        }
      },
      labeledDateTimeInputDateTime: {
        options: {
          value: [],
          locked: false,
          required: true
        }
      },
      labeledDateTimeInputTime: {
        options: {
          value: ["2019-07-09 09:25:00"],
          locked: false,
          required: true
        }
      },
      labeledDateTimeInputMonth: {
        options: {
          value: [],
          locked: false,
          required: true
        }
      },
      labeledNumberInputRange: {
        options: {
          value: [1, 1],
          locked: false,
          required: true
        }
      },
      labeledNumberInput: {
        options: {
          value: [1],
          locked: false,
          required: true
        }
      }
    };
  },
  methods: {
    submit(event) {
      // console.log("submit event", event);
      event.preventDefault();
      this.tips.isShowTips = true;
      this.tips.message = "可以提交！";
      this.tips.class = "text-success";
      var that = this;
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
}
.content_title {
  display: flex;
  padding: 5px;
}
.content_body {
  display: flex;
  justify-content: space-around;
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
