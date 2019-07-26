<template>
  <div>
    <form action @submit="submit" class="form-example">
      <labeled-text v-model="value1" :options="hocvalue1" />

      <labeled-text-area v-model="value2" :options="hocvalue2" />

      <labeled-select-input v-model="value3" :options="hocvalue1" />

      <labeled-grid-select-input v-model="value4" :options="hocvalue2" />

      <input type="submit" value="submit" />

    </form>
  </div>
</template>

<script>
import labeledText from "~/components/labeledText";
import labeledTextArea from "~/components/labeledTextArea";
import labeledSelectInput from "~/components/labeledSelectInput";
import labeledGridSelectInput from "~/components/labeledGridSelectInput";

export default {
  components: {
    labeledText,
    labeledTextArea,
    labeledSelectInput,
    labeledGridSelectInput
  },
  methods: {
    submit(e) {
      // prevent default behavior
      e.preventDefault();
      //Spread syntax
      console.log(
        [...this.value1.componentValue],
        this.value1.operatorValue,
        this.hocvalue1.label.text
      );
      console.log(
        [...this.value2.componentValue],
        this.value2.operatorValue,
        this.hocvalue1.label.text
      );
      console.log(
        [...this.value3.componentValue],
        this.value3.operatorValue,
        this.hocvalue1.label.text
      );
      console.log(
        [...this.value4.componentValue],
        this.value4.operatorValue,
        this.hocvalue1.label.text
      );
    }
  },
  data() {
    return {
      value1: {
        operatorValue: ">",
        componentValue: [2]
      },
      value2: {
        operatorValue: ">",
        componentValue: [2]
      },
      value3: {
        operatorValue: ">",
        componentValue: [2]
      },
      value4: {
        operatorValue: ">",
        componentValue: [2]
      },
      hocvalue1: {
        label: { text: "12312321", color: "red", fontSize: "30" },
        operator: { isShow: true, value: ">" },
        component: {
          value: [1],
          datas: [
            { id: 1, code: 1, text: "詹姆斯邦德001", discribe: "JamesBond001" },
            { id: 2, code: 2, text: "詹姆斯邦德002", discribe: "JamesBond002" }
          ],
          options: {
            multi: true,
            readonly: false,
            placeholder: "placeholder123",
            displayField: "discribe",
            colNames: "sd,df,2dd,2ddd"
          }
        }
      },
      hocvalue2: {
        label: { text: "12312321", color: "red", fontSize: "30" },
        operator: { isShow: true, value: ">" },
        component: {
          value: [1],
          datas: [
            { id: 1, code: 1, text: "詹姆斯邦德001", discribe: "JamesBond001" },
            { id: 2, code: 2, text: "詹姆斯邦德002", discribe: "JamesBond002" }
          ],
          options: {
            multi: true,
            readonly: false,
            placeholder: "placeholder123",
            displayField: "discribe",
            colNames: "sd,df,2dd,2ddd"
          }
        }
      },
      hocvalue3: {
        label: { text: "12312321", color: "red", fontSize: "30" },
        operator: { isShow: true, value: ">" },
        component: {
          value: [1],
          datas: [
            { id: 1, code: 1, text: "詹姆斯邦德001", discribe: "JamesBond001" },
            { id: 2, code: 2, text: "詹姆斯邦德002", discribe: "JamesBond002" }
          ],
          options: {
            multi: true,
            readonly: false,
            placeholder: "placeholder123",
            displayField: "discribe",
            colNames: "sd,df,2dd,2ddd"
          }
        }
      },
      hocvalue4: {
        label: { text: "12312321", color: "red", fontSize: "30" },
        operator: { isShow: true, value: ">" },
        component: {
          value: [1],
          datas: [
            { id: 1, code: 1, text: "詹姆斯邦德001", discribe: "JamesBond001" },
            { id: 2, code: 2, text: "詹姆斯邦德002", discribe: "JamesBond002" }
          ],
          options: {
            multi: true,
            readonly: false,
            placeholder: "placeholder123",
            displayField: "discribe",
            colNames: "sd,df,2dd,2ddd"
          }
        }
      }
    };
  }
};
</script>