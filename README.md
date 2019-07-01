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

##驼峰式命名 动词开头 根据项目需求命名如下控件

```javascript
文本控件  <inputText/>
大文本控件 <inputTextBig/>
数字控件    <inputNum/>
下拉选择控件 <selectDown/>
下拉列表控件 <listDown/>
日期时间控件 <pickDate>
查询列表控件<queryList/>
```

#设计规范

```javascript
组件默认功能是组件自身的功能 不对外暴露任何接口

可传入属性为可选属性 未传入将显示为默认值

组件样式统一通过class属性传入 例如 class="color-red"

需要传值的属性 props="value" <component prop="value"/>

不需要传值的属性 只需要加props <component prop/>
```

#使用说明

##文本控件 <inputText/>

```javascript
// 可选属性 label color size
// 代码示例

<inputText label="文本控件" color="red" />
```
##数字控件  <inputNum/>

```javascript


```