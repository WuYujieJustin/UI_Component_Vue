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

#### 驼峰式命名  动词开头 根据项目需求命名如下控件

1. ```html
   1. 文本控件<inputText/>
   2. 大文本控件<inputTextBig/>
   3. 数字控件 <inputNum/>
   4. 下拉选择控件<selectDown/>
   5. 下拉列表控件<listDown/>
   6. 日期时间控件<pickDate>
   7. 查询列表控件<queryList/>
   ```

   

# 设计规范

#### 组件默认功能是组件自身的功能 不对外暴露任何接口

#### 可传入属性为可选属性 未传入将显示为默认值

```html
#### 组件样式统一通过class属性传入 例如 class="color-red"

#### 需要传值的属性 props="value"  <component prop="value"></component>

#### 不需要传值的属性 只需要加 props  <component prop></component>
```



# 使用说明

#### 文本控件 <inputText>

可选属性 label color size
label(String)为文字内容 
color(String)为其对应的颜色
size(String)为对应的字体大小  可选值有 large/medium/small

```html
<!-- label为红色的文本控件的文本控件 -->
<inputText label="文本控件" color="red"></inputText>
```

#### 数字控件  <inputNum>

可选属性 precision radix icon
precision(Boolean)为是否使用千分位 
radix(Number)为保留几位小数
icon(String)为自定义图标	可选值为货币单位

```html
<!-- 使用千分位 保留两位小数 使用默认图标的数字控件 -->
<inputNum precision radix="2" icon="CBM"></inputNum>
```

#### 下拉选择控件<selectDown>

可选属性 read-only select-Opt
read-only(Boolean)为内容是否为只读
select-Opt(Object)为下拉列表的选项 传入对象

```html
<!-- 只读的下拉列表控件 -->
<selectDown read-only select-Opt = "{}"></selectDown>
```


