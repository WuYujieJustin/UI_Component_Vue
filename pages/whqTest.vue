<template>
    <div>
        <h1>可编辑文本</h1>
        <editableLable :value="'aaasssss'" />
        <h1>可编辑文本,带按钮的</h1>
        <editableLableWithButton v-model="text" @submit="test"/>
        <h1>表格组件</h1>
        <tableList :data="foods" :title="title" v-slot:default="row">
            <a href="#" 
            @click="test(row)"
            title="不给v-solt数据显示不出，我还没搞明白是怎么回事儿">{{row.row.id}}QAQ</a>
        </tableList>
        <h1>树组件</h1>
        <tree :treeNode="tree" :rowName="'name'"
      v-slot:default="treeNode">{{treeNode.treeNode.name}}</tree>
    </div>
</template>
<script>
import editableLable from "~/components/parts/editableLable"
import editableLableWithButton from "~/components/parts/editableLableWithButton"
import tableList from "~/components/parts/tableList"
import tree from "~/components/parts/tree"
export default {
    components: {
        editableLable,
        editableLableWithButton,
        tableList,
        tree
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
            text:"王贺青长得又帅又可爱",
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
            tree:{
                name:"中华人民共和国",
                children:[
                    {
                        name:"上海市",
                        children:[
                            {
                                name:"宝山区",
                                children:[
                                    {
                                        name:"月浦镇"
                                    },
                                    {
                                        name:"罗店镇"
                                    },
                                    {
                                        name:"杨行镇"
                                    },
                                    {
                                        name:"吴淞街道"
                                    }
                                ]
                            },
                            {
                                name:"奉贤区",
                                children:[
                                    {
                                        name:"南桥镇"
                                    },
                                    {
                                        name:"奉城镇"
                                    },
                                    {
                                        name:"海湾镇"
                                    }
                                ]
                            },
                            {
                                name:"松江区",
                                children:[
                                    {
                                        name:"佘山镇"
                                    },
                                    {
                                        name:"九亭镇"
                                    },
                                    {
                                        name:"泗泾镇"
                                    }
                                ]
                            },
                            {
                                name:"崇明区",
                                children:[
                                    {
                                        name:"城桥镇"
                                    },
                                    {
                                        name:"长兴镇"
                                    },
                                    {
                                        name:"横沙镇"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name:"江苏省",
                        children:[
                            {
                                name:"南京市"
                            },
                            {
                                name:"苏州市"
                            },
                            {
                                name:"南通市"
                            },
                            {
                                name:"徐州市"
                            }
                        ]
                    },
                    {
                        name:"浙江省",
                        children:[
                            {
                                name:"杭州市"
                            },
                            {
                                name:"宁波市"
                            },
                            {
                                name:"温州市"
                            },
                            {
                                name:"嘉兴市"
                            }
                        ]
                    },
                    {
                        name:"台湾特别行政区",
                        children:[
                            {
                                name:"台北市"
                            },
                            {
                                name:"高雄市"
                            },
                            {
                                name:"南投县"
                            },
                            {
                                name:"屏东县"
                            }
                        ]
                    }
                ]
            }
        }
    },
}
</script>