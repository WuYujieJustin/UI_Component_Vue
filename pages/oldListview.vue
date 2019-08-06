<template>
    <div>
        <h1>文档树</h1>
    </div>
</template>
<script>
import ListviewTable from "~/components/parts/ListviewTable.vue"
import ListviewTableSetting from "~/components/parts/ListviewTableSetting.vue"
import DialogueBox from "~/components/parts/DialogueBox"

export default {
    components: {
        ListviewTable,
        ListviewTableSetting,
        DialogueBox
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
            TAT:{},
            titleCommon:[],//组件间传递数据
            box:false,
            title:[
                
                {key:"name",title:"名称",width:"150"},
                {key:"price",title:"价格",width:"150"},
                {key:"type",title:"规格",width:"150"},
                {key:"taste",title:"口味",width:"150"},
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