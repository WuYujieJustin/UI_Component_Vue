# Listview
这是一个表格组件。
通过拖动标题行，可以更改数据列的显示顺序。
## 参数

|参数名称   |是否必需   |数据类型   |说明       |默认           |
|-----------|-----------|-----------|-----------|-----------|
|data       |是         |Array(Listview.json)|表格中要显示的数据|        |
|multiSelect|否         |Boolean    |是否多选         |false    |
|checkBox   |否         |Boolean    |是否显示框       |false    |
|displayId  |否         |Boolean    |是否显示序号     |false    |
|limit      |否         |Number     |每页的条目数     |0        |


### data
必需。一个对象数组，表格中要显示的数据。格式如同listview。

### multiSelect
可选。是否多选。true为多选，false为单选。

### checkBox
可选。是否显示框。
### displayId
可选。是否显示序号。

### limit
可选。每页的条目数。当不添加此参数或值设置为0时表示不分页。

## 例

```vue
    <template>
        <div id="TAT">
            <div><h1>把它挤下来</h1></div>
            <Listview :value="json[0]"
            :limit="2"
            :multiSelect="true"
            :checkBox="true"
            :displayId="true"/>

        </div>
    </template>
    <script>
    import Listview from "~/components/parts/Listview.vue"

    export default {
        components: {
            Listview,
        },
        data() {
            return {
                json:[
                    {
                        "query": [
                            {
                                "id": "OrderBillCode",
                                "name": "业务编号",
                                "orderindex": 0,
                                "control": "textbox",
                                "defalutvalue": ""
                            },
                            {
                                "id": "ETD",
                                "name": "业务日期",
                                "orderindex": 1,
                                "control": "datebox",
                                "defalutvalue": {
                                    "from": "2019-08-23",
                                    "to": "2019-09-23"
                                }
                            },
                            {
                                "id": "Qty",
                                "name": "件数",
                                "orderindex": 2,
                                "control": "numberbox",
                                "defalutvalue": {
                                    "from": 0,
                                    "to": 100
                                }
                            }
                        ],
                        "head": [
                            {
                                "id": "id",
                                "name": "ID",
                                "orderindex": 0,
                                "width": "50px",
                                "class": "",
                                "align": "left",
                                "required": true,
                                "isTotal": false,
                                "isSelTotal": false,
                                "jsFun": ""
                            },
                            {
                                "id": "OrderBillCode",
                                "name": "业务编号",
                                "orderindex": 1,
                                "width": "200px",
                                "class": "",
                                "align": "left",
                                "required": false,
                                "isTotal": false,
                                "isSelTotal": false,
                                "jsFun": ""
                            },
                            {
                                "id": "CustomerName",
                                "name": "客户名称",
                                "orderindex": 2,
                                "width": "200px",
                                "class": "",
                                "align": "left",
                                "required": false,
                                "isTotal": false,
                                "isSelTotal": false,
                                "jsFun": ""
                            },
                            {
                                "id": "Qty",
                                "name": "件数",
                                "orderindex": 3,
                                "width": "200px",
                                "class": "",
                                "align": "right",
                                "required": false,
                                "isTotal": true,
                                "isSelTotal": true,
                                "jsFun": ""
                            },
                            {
                                "id": "ETD",
                                "name": "业务日期",
                                "orderindex": 4,
                                "width": "200px",
                                "class": "",
                                "align": "right",
                                "required": false,
                                "isTotal": false,
                                "isSelTotal": false,
                                "jsFun": ""
                            }
                        ],
                        "data": [
                            {
                                "id": 12306,
                                "OrderBillCode": "TTKJSEH19070003",
                                "CustomerName": "中国铁路总公司",
                                "Qty": 100,
                                "Address": "北京市海淀区",
                                "Contact": "传真",
                                "ETD": "2019-07-19"
                            },
                            {
                                "id": 12315,
                                "OrderBillCode": "TTKJSEH19070003",
                                "CustomerName": "消费者投诉热线",
                                "Qty": 100,
                                "Address": "上海市杨浦区",
                                "Contact": "email",
                                "ETD": "2019-07-19"
                            },
                            {
                                "id": 12345,
                                "OrderBillCode": "TTKJSEH19070002",
                                "CustomerName": "上海钛腾计算机科技有限公司",
                                "Qty": 50,
                                "Address": "上海市宝山区上大路2999弄9号楼3楼",
                                "Contact": "QQ",
                                "ETD": "2019-07-18"
                            },
                            {
                                "id": 12346,
                                "OrderBillCode": "TTKJSEH19070003",
                                "CustomerName": "上海铁集物流供应链有限公司",
                                "Qty": 100,
                                "Address": "上海市杨浦区",
                                "Contact": "MM",
                                "ETD": "2019-07-19"
                            },
                            {
                                "id": 12377,
                                "OrderBillCode": "TTKJSEH19070003",
                                "CustomerName": "上海铁集物流供应链有限公司",
                                "Qty": 100,
                                "Address": "上海市杨浦区",
                                "Contact": "tel",
                                "ETD": "2019-07-19"
                            },
                        ],
                        "button": [
                            {
                                "id": "new",
                                "name": "新增",
                                "icon": "fa-plus",
                                "display": true,
                                "disabled": false,
                                "align": "right",
                                "function": "DoNew()"
                            },
                            {
                                "id": "edit",
                                "name": "修改",
                                "icon": "fa-edit",
                                "display": true,
                                "disabled": true,
                                "align": "right",
                                "function": "DoEdit()"
                            }
                        ],
                        "pagination": true,
                        "pagesize": 1000,
                        "pagenumber": 1,
                        "pagelist": [
                            1000,
                            2000,
                            5000,
                            10000
                        ],
                        "checkbox":true
                    }
                ]
            }
        },
    }
    </script>
    <style>
    #TAT{
        margin: 50px;
    }
    </style>

```