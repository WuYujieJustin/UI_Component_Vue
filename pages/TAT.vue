<template>
    <div id="TAT">
        <Listview :value="json[0]"/>
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
                            "contorl": "textbox",
                            "defalutvalue": ""
                        },
                        {
                            "id": "ETD",
                            "name": "业务日期",
                            "orderindex": 1,
                            "contorl": "datebox",
                            "defalutvalue": {
                                "from": "2019-08-23",
                                "to": "2019-09-23"
                            }
                        },
                        {
                            "id": "Qty",
                            "name": "件数",
                            "orderindex": 2,
                            "contorl": "numberbox",
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
