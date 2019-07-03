# UI_Component_Vue

> Nuxt.js构建的几个组件

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# 命名规范

#### 驼峰式命名 IIInputText, 调用时 i-input-text, 根据项目需求命名如下控件(i—>ifans)
1. 文本控件`<IIInputText/>`
2. 大文本控件`<IIInputTextarea/>`
3. 数字控件 `<IIInputNumberber/>`
4. 下拉选择控件`<IInputSelect/>`
5. 下拉列表控件`<IInputSelectList/>`
6. 日期时间控件`<IInputDatePicker/>`
7. 查询控件`<IInputQuery/>`
8. 列表控件`<ITable/>`

# 设计规范

#### 组件默认功能是组件自身的功能 不对外暴露任何接口

#### 可传入属性为可选属性 未传入将显示为默认值

```html
#### 组件样式统一通过class属性传入 例如 class="color-red"

#### 需要传值的属性 props="value"  <component prop="value"></component>

#### 不需要传值的属性 只需要加 props  <component isRange></component>
```


# 通用属性说明

#### IInput

1. labe(String)（定义组件中label的文本）
2. class(String)（定义样式，后续会提供样式清单，也有可能更改定义样式的方法）
3. placeholder(String)（定义组件中输入框，未输入状态时的文本）
4. readonly(Boolean)（使组件只可读取，不可更改）
5. prefix-icon(String)（输入框前的图标区域文本）
6. suffix-icon(String)（输入框后的图标文本区域）


# 使用说明

#### 文本控件`<IInputText>`

1. 全部使用通用属性

```html
<!-- label为红色的文本控件的文本控件 -->
<IInputText label="文本控件" class="red"></IInputText>
```

#### 数字控件 `<IInputNumber>`

1. 可选属性 suffix-icon isFormat precision
2. isFormat(Boolean)为是否使用千分位占位符
3. precision(Number)为保留几位小数
4. suffix-icon(String)为自定义图标	可选值为货币单位
5. 包含全部通用属性

```html
<!-- 使用千分位 保留两位小数 使用默认图标的数字控件 -->
<IInputNumber isFormat precision="2" suffix-icon="CBM"></IInputNumber>
```

#### 下拉选择控件`<IInputSelect>`

1. multi(Boolean)是否支持多选
2. data(对象数组)可直接传对象数组[{text:"西瓜",value:"1"}……]
3. data-url(url)可直接传入接口地址，自动接收并处理数据

```html
<!-- 直接输入数据的下拉列表控件  -->
<IInputSelect  data = "[{text:"西瓜",value:"1"},{text:"芒果",value:"2"}]"></IInputSelect>
```

#### 下拉列表控件`<IInputSelectList/>`

1. multi(Boolean)是否支持多选
2. data(对象数组)可直接传对象数组[{text:"西瓜",value:"1"}……]
3. data-url(Url)可直接传入接口地址，自动接收并处理数据

```html
<!--支持多选的，输入接口地址的下拉列表控件  -->
<IInputSelect multi=true data-url = "http://interface.example.com:port/address"></IInputSelect>
```

#### 日期时间控件`<IInputDatePicker>`

1. 可选属性 year month date date-time time range
2. year(Number) 输入框年
3. month(Number) 输入框月
4. date(Number) 输入框日期
5. time输入框时间 小时
6. is-Range(Boolean) 输入框是否显示时间范围 默认false
7. start 起始时间(is-Range 必选)
8. end 结束时间(is-Range 必选)
9. format(Boolean) 是否对日期格式化 默认为否 时间戳格式

```html
<!--传入日期2019/06/20  -->
<IInputDatePicker year="2019" month="6" date="20"></IInputDatePicker>
<!--日期2019/06/20 - 2019/06/26之间的日期 -->
<IInputDatePicker is-Range start="2019/06/20" end="2019/06/26"></IInputDatePicker>

```

