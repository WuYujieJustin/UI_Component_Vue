[TOC]

# 控件列表

- labeledText（文本）

- labeledTextArea（多行文本）

- labeledSelectInput（下拉选择）

- labeledGridSelectInput（列表下拉选择）

- labeledDateTimeInput（日期）

- labeledNumberInput（数字）



# 使用方法

在"~/page/"文件夹下，新建vue文件，并导入对应组件，传入相应参数即可。（详见/pages/index.vue）

每个组件可使用v-model来进行数据的双向绑定（绑定的变量必须是对象，且必须有value属性），还需传入组件的配置数据"label、control、data"等



## 所有参数：

| options参数 | 类型    | 是否必填 | 描述                                                         | 默认值 |
| ----------- | ------- | -------- | ------------------------------------------------------------ | ------ |
| value       | Any     | 是       | 可与当前页面的某一变量双向绑定（向组件传值，并从组件接收改动） |        |
| locked      | Boolean | 否       | 是否锁定                                                     | false  |
| required    | Boolean | 否       | 是否必填（仅form表单中生效）                                 | false  |
| privilege   |         |          | 未知                                                         |        |
| attach      |         |          | 未知                                                         |        |



| 其他参数                 | 类型    | 是否必填 | 描述                                                        | 默认值                        |
| ------------------------ | ------- | -------- | ----------------------------------------------------------- | ----------------------------- |
| label-text               | String  | 否       | 设置label内容等                                             |                               |
| label-id                 |         |          | 未知                                                        |                               |
| label-class              | String  | 否       | label的class                                                |                               |
| control-width            | String  | 否       | 控件宽度                                                    |                               |
| control-height           | String  | 否       | 控件高度（textarea）                                        |                               |
| control-placeholder      | String  | 否       | 组件中输入框默认文字                                        |                               |
| control-multiple         | Boolean | 否       | 下拉列表是否能多选                                          | false                         |
| control-type             | String  | 否       | 日期选择器的类型 年月日 时间等                              | datetime                      |
| control-range            | Boolean | 否       | 日期选择器 选择范围                                         | false                         |
| control-precision        | Number  | 否       | 数字输入框保留小数位                                        | 2                             |
| control-isgroupseparator | Boolean | 否       | 数字输入框 是否使用千分位分隔符                             | false                         |
| control-format           | String  | 否       | 时间选择器的日期格式                                        | "yyyy-MM-dd HH:mm:ss"         |
| countrol-readonly        | Boolean | 否       | 控件是否只读                                                | false                         |
| data-columns             | String  | 否       | 指定列表选项的列名（只对GridSelect组件有效）                | data-sources数据中的对应key值 |
| data-sources             | Object  | 条件必填 | （目前只对Select/GridSelect组件必填）用于显示选项           |                               |
| data-url                 | String  | 否       | 接口地址，用于请求数据（目前只对Select/GridSelect组件有效） |                               |
| data-type                |         |          | 未知                                                        |                               |
| data-displayfield        | String  | 否       | 指定选中后的数据显示的列（只对Select/GridSelect组件有效）   | "Text"                        |
| data-attach              |         |          | 未知                                                        |                               |





# 详细解释如下：



## 公共参数：



| options参数 | 类型    | 是否必填 | 描述                                                         | 默认值 |
| ----------- | ------- | -------- | ------------------------------------------------------------ | ------ |
| value       | Any     | 是       | 可与当前页面的某一变量双向绑定（向组件传值，并从组件接收改动） |        |
| locked      | Boolean | 否       | 是否锁定                                                     | false  |
| required    | Boolean | 否       | 是否必填（仅form表单中生效）                                 | false  |
| privilege   |         |          | 未知                                                         |        |
| attach      |         |          | 未知                                                         |        |



| 其他参数                 | 类型    | 是否必填 | 描述                                                        | 默认值                        |
| ------------------------ | ------- | -------- | ----------------------------------------------------------- | ----------------------------- |
| label-text               | String  | 否       | 设置label内容等                                             |                               |
| label-id                 |         |          | 未知                                                        |                               |
| label-class              | String  | 否       | label的class                                                |                               |
| control-width            | String  | 否       | 控件宽度                                                    |                               |
| control-placeholder      | String  | 否       | 组件中输入框默认文字                                        |                               |
| countrol-readonly        | Boolean | 否       | 控件是否只读                                                | false                         |
| data-type                |         |          | 未知                                                        |                               |
| data-attach              |         |          | 未知                                                        |                               |





## 各组件私有参数：





### labeledText（文本）

全部使用公共参数

示例代码如下

```vue
<!-- index.vue -->    
<template>
				<labeled-text
          v-model="options"
          :label-text="label.text"
          :label-class="label.class"
          :control-width="control.width"
          :control-placeholder="control.placeholder"
          :control-readonly="control.readonly"
        />
</template>

<script>
import labeledText from "~/components/labeledText";
  export default {
    components: {
      labeledText,
    },
    data() {
      return {
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
            width: "100",
            placeholder: "placeholder",
            readonly: false
          },
      }
    }
  }
```



------

### labeledTextArea（多行文本）

| 独有参数       | 类型   | 是否必填 | 描述                 | 默认值 |
| -------------- | ------ | -------- | -------------------- | ------ |
| control-height | String | 否       | 控件高度（textarea） |        |

示例代码如下

```vue
<!-- index.vue -->    
<template>
				<labeled-text-area
          v-model="options"
          :label-text="label.text"
          :label-class="label.class"
          :control-width="control.width"
          :control-height="control.height"
          :control-placeholder="control.placeholder"
          :control-readonly="control.readonly"
        />
</template>

<script>
import labeledTextArea from "~/components/labeledTextArea";
  export default {
    components: {
      labeledTextArea,
    },
    data() {
      return {
				  options: {
            value: "this is text",
            locked: false,
            required: true
          },
          label: {
            text: "textarea",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "100",
            height: "200",
            placeholder: "placeholder",
            readonly: false
          },
      }
    }
  }
```



------

### labeledSelectInput（下拉选择）

| 参数              | 类型    | 是否必填 | 描述                                                        | 默认值 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- | ------ |
| control-multiple  | Boolean | 否       | 下拉列表是否能多选                                          | false  |
| data-sources      | Object  | 条件必填 | （目前只对Select/GridSelect组件必填）用于显示选项           |        |
| data-url          | String  | 否       | 接口地址，用于请求数据（目前只对Select/GridSelect组件有效） |        |
| data-displayfield | String  | 否       | 指定选中后的数据显示的列（只对Select/GridSelect组件有效）   | "Text" |

示例代码如下

```vue
<!-- index.vue -->    
<template>
				<labeled-select-input
          v-model="options"
          :label-text="label.text"
          :label-class="label.class"
          :control-width="control.width"
          :control-height="control.height"
          :control-placeholder="control.placeholder"
          :control-multiple="control.multiple"
          :control-readonly="control.readonly"
          :data-sources="data.sources"
          :data-url="data.url"
          :data-displayfield="data.displayfield"
        />
</template>

<script>
import labeledSelectInput from "~/components/labeledSelectInput";
  export default {
    components: {
      labeledSelectInput,
    },
    data() {
      return {
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
            width: "100",
            placeholder: "placeholder",
            multiple: false,
            readonly: false
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
              }
            ],
            url: "",
            displayfield: ""
          }
      }
    }
  }
```



------

### labeledGridSelectInput（列表下拉选择）

同下拉选择，多一个属性

| 参数              | 类型    | 是否必填 | 描述                                                        | 默认值 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- | ------ |
| data-columns             | String  | 否       | 指定列表选项的列名（只对GridSelect组件有效）                | data-sources数据中的对应key值 |

示例代码如下

```vue
<!-- index.vue -->    
<template>
				<labeled-grid-select-input
          v-model="options"
          :label-text="label.text"
          :label-class="label.class"
          :control-width="control.width"
          :control-height="control.height"
          :control-placeholder="control.placeholder"
          :control-multiple="control.multiple"
          :control-readonly="control.readonly"
          :data-columns="data.columns"
          :data-sources="data.sources"
          :data-url="data.url"
          :data-displayfield="data.displayfield"
        />
</template>

<script>
import labeledGridSelectInput from "~/components/labeledGridSelectInput";
  export default {
    components: {
      labeledGridSelectInput,
    },
    data() {
      return {
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
            width: "100",
            placeholder: "placeholder",
            multiple: true,
            readonly: false
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
              }
            ],
            url: "",
            displayfield: "",
          }
      }
    }
  }
```



------

### labeledDateTimeInput（日期）

| 参数              | 类型    | 是否必填 | 描述                                                        | 默认值 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- | ------ |
| control-type             | String  | 否       | 日期选择器的类型 年月日 时间等                              | datetime                      |
| control-range            | Boolean | 否       | 日期选择器 选择范围                                         | false                         |
| control-format           | String  | 否       | 时间选择器的日期格式                                        | "yyyy-MM-dd HH:mm:ss"         |

示例代码如下

```vue
<!-- index.vue -->    
<template>
				<labeled-date-time-input
          v-model="options"
          :label-text="label.text"
          :label-class="label.class"
          :control-width="control.width"
          :control-placeholder="control.placeholder"
          :control-type="control.type"
          :control-range="control.range"
          :control-format="control.format"
          :control-readonly="control.readonly"
        />
</template>

<script>
import labeledDateTimeInput from "~/components/labeledDateTimeInput";
  export default {
    components: {
      labeledDateTimeInput,
    },
    data() {
      return {
				  options: {
            value: "此处应显示当前时间",
            locked: false,
            required: true
          },
          label: {
            text: "date",
            id: "label ID",
            class: "class1"
          },
          control: {
            width: "100",
            placeholder: "placeholder",
            type: "datetime"
            range: true,//boolean
            format: "yyyy-MM-dd",//string
            readonly: false
          }
      }
    }
  }
```



------

### labeledNumberInput（数字）

| 参数              | 类型    | 是否必填 | 描述                                                        | 默认值 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- | ------ |
| control-precision        | Number  | 否       | 数字输入框保留小数位                                        | 2                             |
| control-isgroupseparator | Boolean | 否       | 数字输入框 是否使用千分位分隔符                             | false                         |

示例代码如下

```vue
<!-- index.vue -->    
<template>
				<labeled-number-input
          v-model="options"
          :label-text="label.text"
          :label-class="label.class"
          :control-width="control.width"
          :control-placeholder="control.placeholder"
          :control-precision="control.precision"
          :control-isgroupseparator="control.isgroupseparator"
          :control-readonly="control.readonly"
        />
</template>

<script>
import labeledNumberInput from "~/components/labeledNumberInput";
  export default {
    components: {
      labeledNumberInput,
    },
    data() {
      return {
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
            width: "100",
            placeholder: "placeholder",
            precision: 2,
            isgroupseparator: true,
            readonly: false
          }
      }
    }
  }
```

