<template>
  <div>
    <Listview :value="json[0]" :multiSelect="true"  :displayId="true" @settingChange="test"/>
    <quick-input
    :theads="head"
    />
  </div>
</template>
<script>
import Listview from "~/components/parts/Listview.vue";
import quickInput from "~/components/parts/quickInput.vue";


export default {
  components: {
    Listview,
    quickInput
  },
  methods:{
    test(v){
      console.log(v);
    }
  },
  data() {
    return {
      head: [
            {
              id: "id",
              name: "ID",
              orderindex: 0,
              width: "50px",
              class: "",
              align: "left",
              required: true,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",              
            },
            {
              id: "OrderBillCode",
              name: "业务编号",
              orderindex: 1,
              width: "200px",
              class: "",
              align: "left",
              required: false,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",
            },
            {
              id: "CustomerName",
              name: "客户名称",
              orderindex: 2,
              width: "200px",
              class: "",
              align: "left",
              required: false,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",
            },
            {
              id: "Qty",
              name: "件数",
              orderindex: 3,
              width: "200px",
              class: "",
              align: "right",
              required: false,
              isTotal: true,
              isSelTotal: true,
              jsFun: "",
              control: "textbox",
            },
            {
              id: "ETD",
              name: "业务日期",
              orderindex: 4,
              width: "200px",
              class: "",
              align: "right",
              required: false,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",
            }
          ],
      json: [
        {
          query: [
            {
              id: "OrderBillCode",
              name: "业务编号",
              orderindex: 0,
              control: "textbox",
              defalutvalue: ""
            },
            {
              id: "ETD",
              name: "业务日期",
              orderindex: 1,
              control: "datebox",
              defalutvalue: {
                from: "2019-08-23",
                to: "2019-09-23"
              }
            },
            {
              id: "Qty",
              name: "件数",
              orderindex: 2,
              control: "numberbox",
              defalutvalue: {
                from: 0,
                to: 100
              }
            },
            {
              id: "area",
              name: "地区",
              orderindex: 3,
              control: "selectList",
              data: [
                {
                  id: 1,
                  code: 110000,
                  text: "北京",
                  discribe: "beijing"
                },
                {
                  id: 2,
                  code: 310000,
                  text: "上海",
                  discribe: "shanghai"
                },
                {
                  id: 3,
                  code: 440100,
                  text: "广州",
                  discribe: "groundrou"
                },
                {
                  id: 4,
                  code: 440300,
                  text: "深圳",
                  discribe: "shenzhen"
                }
              ]
            }
          ],
          head: [
            {
              id: "id",
              name: "ID",
              orderindex: 0,
              width: "50px",
              class: "",
              align: "left",
              required: true,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",              
            },
            {
              id: "OrderBillCode",
              name: "业务编号",
              orderindex: 1,
              width: "200px",
              class: "",
              align: "left",
              required: false,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",
            },
            {
              id: "CustomerName",
              name: "客户名称",
              orderindex: 2,
              width: "200px",
              class: "",
              align: "left",
              required: false,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",
            },
            {
              id: "Qty",
              name: "件数",
              orderindex: 3,
              width: "200px",
              class: "",
              align: "right",
              required: false,
              isTotal: true,
              isSelTotal: true,
              jsFun: "",
              control: "textbox",
            },
            {
              id: "ETD",
              name: "业务日期",
              orderindex: 4,
              width: "200px",
              class: "",
              align: "right",
              required: false,
              isTotal: false,
              isSelTotal: false,
              jsFun: "",
              control: "textbox",
            }
          ],
          data: [
            {
              id: 12306,
              OrderBillCode: "TTKJSEH19070003",
              CustomerName: "中国铁路总公司",
              Qty: 100,
              Address: "北京市海淀区",
              Contact: "传真",
              ETD: "2019-07-19"
            },
            {
              id: 12315,
              OrderBillCode: "TTKJSEH19070003",
              CustomerName: "消费者投诉热线",
              Qty: 100,
              Address: "上海市杨浦区",
              Contact: "email",
              ETD: "2019-07-19"
            },
            {
              id: 12345,
              OrderBillCode: "TTKJSEH19070002",
              CustomerName: "上海钛腾计算机科技有限公司",
              Qty: 50,
              Address: "上海市宝山区上大路2999弄9号楼3楼",
              Contact: "QQ",
              ETD: "2019-07-18"
            },
            {
              id: 12346,
              OrderBillCode: "TTKJSEH19070003",
              CustomerName: "上海铁集物流供应链有限公司",
              Qty: 100,
              Address: "上海市杨浦区",
              Contact: "MM",
              ETD: "2019-07-19"
            },
            {
              id: 12377,
              OrderBillCode: "TTKJSEH19070003",
              CustomerName: "上海铁集物流供应链有限公司",
              Qty: 100,
              Address: "上海市杨浦区",
              Contact: "tel",
              ETD: "2019-07-19"
            }
          ],
          button: [
            {
              id: "new",
              name: "新增",
              icon: "fa-plus",
              display: true,
              disabled: false,
              align: "right",
              function: "DoNew()"
            },
            {
              id: "edit",
              name: "修改",
              icon: "fa-edit",
              display: true,
              disabled: true,
              align: "right",
              function: "DoEdit()"
            }
          ],
          pagination: true,
          pagesize: 1000,
          pagenumber: 1,
          pagelist: [1, 2, 5, 10],
          checkbox: true
        }
      ]
    };
  }
};
</script>

