<template>
    <div>
        <h1>这是一个废弃页面，保留仅是为了参考部分代码</h1>
        <h1>QAQ</h1>
        &lt;Listview
        :data="foods"
        :title="titleCommon"
        :displayId="true"
        :checkBox="true"
        :multiSelect="false"
        :limit="5"
        :excel="true"
        v-model="TAT"
        @select="test"
        /


        <h1>这里是表格的设置</h1>
        《ListviewOperator :data="title" v-model="titleCommon"/》
    </div>
</template>
<script>
/*import Listview from "~/components/parts/Listview.vue"
import ListviewOperator from "~/components/parts/ListviewOperator.vue"*/

export default {
    /*components: {
        Listview,
        ListviewOperator
    },*/
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
            titleCommon:[],//组件间传递数据
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