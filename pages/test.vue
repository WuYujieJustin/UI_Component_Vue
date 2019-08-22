<template>
  <div>
    <button @click="test">click</button>
    <labeled-date-time-input
      v-if="status"
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
  </div>
</template>

<script>
export default {
  components: {
    labeledDateTimeInput: () => import("~/components/labeledDateTimeInput")
  },
  data() {
    return {
      status: false,
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
    test() {
      this.status = !this.status;
    }
  }
};
</script>