# Listview
这是一个表格组件。
通过拖动标题行，可以更改数据列的显示顺序。
暂不支持“操作列”（最后一列）的拖动。
## 参数

|参数名称   |是否必需   |数据类型   |说明       |默认           |
|-----------|-----------|-----------|-----------|-----------|
|data       |是         |Array      |表格中要显示的数据|        |
|title      |是         |Array      |字段名到文字的映射|        |
|multiSelect|否         |Boolean    |是否多选         |false    |
|checkBox   |否         |Boolean    |是否显示框       |false    |
|displayId  |否         |Boolean    |是否显示序号     |false    |
|refresh    |否         |Boolean    |是否显示刷新按钮  |false   |
|excel      |否         |Boolean    |是否显示excel按钮|false    |
|limit      |否         |Number     |每页的条目数     |0        |


### data
必需。一个对象数组，表格中要显示的数据。数组中的对象中有哪些内容无强制规定，但要确保所有对象的格式一致。

如：

```json
    foods:[
        {id:1,name:"羊肉串",price:10,type:"中",taste:"孜然"},
        {id:2,name:"奥尔良烤翅",price:12,type:"中",taste:"无"},
        {id:3,name:"土豆泥",price:5,type:"大",taste:"无"},
        {id:4,name:"鸡排",price:15,type:"大",taste:"麻辣"},
        {id:5,name:"超级至尊披萨",price:50,type:"中",taste:"无"},
        {id:6,name:"布丁奶茶",price:22,type:"大",taste:"正常甜度"},
        {id:7,name:"海鲜意面",price:32,type:"大",taste:"无"},
        {id:8,name:"香辣鸡腿堡",price:15,type:"中",taste:"无"},
    ]
```

### title
必须。一个对象数组，表示要显示的字段、字段显示顺序以及字段名到文字的映射。
该数组的每个元素都有key、title这两个键。
key表示data中的字段名；
title表示字段名到文字的映射。 

例：

```json
    title:[
        {key:'id',title:"序号"},
        {key:"name",title:"名称"},
        {key:"price",title:"价格"},
        {key:"type",title:"规格"},
        {key:"taste",title:"口味"},
    ],
```

### multiSelect
可选。是否多选。true为多选，false为单选。

### checkBox
可选。是否显示框。
### displayId
可选。是否显示序号。
### refresh
可选。是否显示刷新按钮。
### excel
可选。是否显示excel按钮。
### limit
可选。每页的条目数。当不添加此参数或值设置为0时表示不分页。

## 例

```vue
    <template>
        <div>
            <h1>QAQ</h1>
            <Listview
                :data="foods"
                :title="title"
                :displayId="true"
                :checkBox="true"
                :multiSelect="true"
                :limit="5"
                :excel="true"
               v-model="TAT"
                @select="test"
            />
            {{TAT}}
        </div>
    </template>
    <script>
    import Listview from "~/components/parts/ListView.vue"

    export default {
        components: {
            Listview
        },
        methods:{
            test(v){
                console.log("事件被触发")
                console.log("什么鬼"+v)
                console.log(v)
            }
        },
        data() {
            return {
                TAT:[],
                title:[
                    {key:'id',title:"序号"},
                    {key:"name",title:"名称"},
                    {key:"price",title:"价格"},
                    {key:"type",title:"规格"},
                    {key:"taste",title:"口味"},
                ],
                foods:[
                    {id:1,name:"羊肉串",price:10,type:"中",taste:"孜然"},
                    {id:2,name:"奥尔良烤翅",price:12,type:"中",taste:"无"},
                    {id:3,name:"土豆泥",price:5,type:"大",taste:"无"},
                    {id:4,name:"鸡排",price:15,type:"大",taste:"麻辣"},
                    {id:5,name:"超级至尊披萨",price:50,type:"中",taste:"无"},
                    {id:6,name:"布丁奶茶",price:22,type:"大",taste:"正常甜度"},
                    {id:7,name:"海鲜意面",price:32,type:"大",taste:"无"},
                    {id:8,name:"香辣鸡腿堡",price:15,type:"中",taste:"无"},
                ],
            
            }
        },
    }
    </script>
```