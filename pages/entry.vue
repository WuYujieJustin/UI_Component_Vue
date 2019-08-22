<template>
  <div class="entry">
    <form class="form-horizontal container" @submit="submit">
      <div>
        <labeled-text
          v-model="labeledText.options"
          label-text="报关代理"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-refresh fa-spin fa-fw"
          control-icontext=" "
        />
        <labeled-text
          v-model="labeledText2.options"
          label-text="报关代理"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
        />
      </div>
      <div>
        <div style="display:flex;padding-left:15px;width:50%" class="form-group input-box">
          <labeled-text
            v-model="labeledText3.options"
            label-text="报关联系人"
            label-class="class1"
            control-width="50%"
            control-placeholder="placeholder"
            :control-readonly="false"
          />
          <labeled-text
            v-model="labeledText4.options"
            label-text="报关电话"
            label-class="class1"
            control-width="50%"
            control-placeholder="placeholder"
            :control-readonly="false"
          />
        </div>
        <labeled-text
          v-model="labeledText5.options"
          label-text="报关邮箱"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
        />
      </div>
      <div>
        <labeled-select-input
          v-model="labeledSelectInput.options"
          label-text="单选项"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-bolt"
          control-icontext
          :control-multiple="false"
          :data-sources="labeledSelectInput.data.sources"
          data-url
          data-displayfield="text"
        />
        <labeled-select-input
          v-model="labeledSelectInputM.options"
          label-text="多选项"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon
          control-icontext
          :control-multiple="true"
          :data-sources="labeledSelectInputM.data.sources"
          data-url
          data-displayfield="text"
        />
      </div>
      <div>
        <labeled-grid-select-input
          v-model="labeledGridSelectInput.options"
          label-text="单选列表1"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-search"
          control-icontext
          :control-multiple="false"
          :data-sources="labeledGridSelectInput.data.sources"
          data-url
          data-displayfield
          data-columns="text"
        />
        <labeled-grid-select-input
          v-model="labeledGridSelectInput.options"
          label-text="单选列表2"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-search"
          control-icontext
          :control-multiple="false"
          :data-sources="labeledGridSelectInput.data.sources"
          data-url
          data-displayfield
          data-columns="text"
        />
      </div>
      <div>
        <labeled-grid-select-input
          v-model="labeledGridSelectInputM.options"
          label-text="多选列表1"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-search"
          control-icontext
          :control-multiple="true"
          :data-sources="labeledGridSelectInputM.data.sources"
          data-url
          data-displayfield
          data-columns="text"
        />
        <labeled-grid-select-input
          v-model="labeledGridSelectInputM.options"
          label-text="多选列表2"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-search"
          control-icontext
          :control-multiple="true"
          :data-sources="labeledGridSelectInputM.data.sources"
          data-url
          data-displayfield
          data-columns="text"
        />
      </div>
      <div>
        <labeled-date-time-input
          v-model="labeledDateTimeInputDateTime.options"
          label-text="查验日期"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-calendar"
          control-icontext
          control-type="datetime"
          :control-date-range="true"
          control-format="yyyy-MM-dd HH:mm:ss"
        />
        <labeled-date-time-input
          v-model="labeledDateTimeInputDateTime.options"
          label-text="查验旅行"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-calendar"
          control-icontext
          control-type="datetime"
          :control-date-range="true"
          control-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div>
        <labeled-date-time-input
          v-model="labeledDateTimeInputTime.options"
          label-text="开始时间"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-calendar"
          control-icontext
          control-type="time"
          control-range
          control-format="HH:mm:ss"
        />
        <labeled-date-time-input
          v-model="labeledDateTimeInputTime.options"
          label-text="结束时间"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-calendar"
          control-icontext
          control-type="time"
          control-range
          control-format="HH:mm:ss"
        />
      </div>
      <div>
        <labeled-date-time-input
          v-model="labeledDateTimeInputMonth.options"
          label-text="发单日期"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-calendar"
          control-icontext
          control-type="date"
          :control-range="false"
          control-format="yyyy-MM-dd HH:mm:ss"
        />
        <labeled-date-time-input
          v-model="labeledDateTimeInputMonth.options"
          label-text="截单日期"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-calendar"
          control-icontext
          control-type="date"
          :control-range="false"
          control-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div>
        <div style="display:flex;width:50%" class="form-group input-box">
          <labeled-number-input
            v-model="labeledNumberInput.options"
            label-text="总销售"
            label-class="class1"
            control-width="50%"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-usd"
            control-icontext
            :control-precision="2"
            :control-isgroupseparator="true"
            :control-number-range="false"
          />
          <labeled-number-input
            v-model="labeledNumberInput2.options"
            label-text="成本价"
            label-class="class1"
            control-width="50%"
            control-placeholder="placeholder"
            :control-readonly="false"
            control-icon="fa-usd"
            control-icontext
            :control-precision="2"
            :control-isgroupseparator="true"
            :control-number-range="false"
          />
        </div>
        <labeled-number-input
          v-model="labeledNumberInput3.options"
          label-text="实收入"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-usd"
          control-icontext
          :control-precision="2"
          :control-isgroupseparator="true"
          :control-number-range="false"
        />
      </div>
      <div>
        <labeled-number-input
          v-model="labeledNumberInputRange.options"
          label-text="投入区间"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-usd"
          control-icontext
          :control-precision="2"
          :control-isgroupseparator="true"
          :control-number-range="true"
        />
        <labeled-number-input
          v-model="labeledNumberInputRange2.options"
          label-text="实收区间"
          label-class="class1"
          control-width="50%"
          control-placeholder="placeholder"
          :control-readonly="false"
          control-icon="fa-usd"
          control-icontext
          :control-precision="2"
          :control-isgroupseparator="true"
          :control-number-range="true"
        />
      </div>
      <labeled-text-area
        v-model="labeledTextArea.options"
        label-text="相关备注"
        label-class="class1"
        control-height="200"
        control-width="auto"
        control-placeholder="placeholder"
        :control-readonly="false"
      />
      <div style="display:flex;justify-content: space-between;align-items: center;">
      <button class="basebtn">提交</button>
      <span :class="tips.class" v-show="tips.isShowTips">{{tips.message}}</span>
      </div>
    </form>
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
    labeledNumberInput,
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
      labeledText2: {
        options: {
          value: "this is text",
          locked: false,
          required: true
        }
      },
      labeledText3: {
        options: {
          value: "this is text",
          locked: false,
          required: true
        }
      },
      labeledText4: {
        options: {
          value: "this is text",
          locked: false,
          required: true
        }
      },
      labeledText5: {
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
      labeledNumberInputRange2: {
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
      },
      labeledNumberInput2: {
        options: {
          value: [1],
          locked: false,
          required: true
        }
      },
      labeledNumberInput3: {
        options: {
          value: [1],
          locked: false,
          required: true
        }
      }
    };
  }
};
</script>

<style scoped>
.container {
  padding: 20px 30px 0 30px;
  margin-top: 50px;
  background: rgb(248, 248, 248);
}
.container > div {
  display: flex;
  justify-content: space-between;
}
.input-box .form-group {
  margin: 0;
  padding: 0;
}
</style>
