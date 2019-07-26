<template>
    <li>
        <a href="#" @click="open=!open">[{{open?"-":"+"}}]</a>
        <slot v-bind:treeNode="unstall(treeNode)"></slot>
        <ul v-if="treeNode.children!=null" v-show="open">
            <tree v-for="child in treeNode.children" 
            :key="child.id" 
            :treeNode="child"
            :rowName="rowName"
            v-slot:default="treeNode"
            > <slot v-bind:treeNode="unstall(treeNode)"></slot> </tree>
            
        </ul>
        
    </li>
</template>

<script>
export default {
    name:"tree",
    props:["treeNode","rowName"],
    data(){
        return{
            open:false
        }
    },
    methods:{
        unstall(data){
            if(data.treeNode){
                return data.treeNode
            }else{
                return data
            }
        }
    }
}
</script>

<style>
li{
    padding-left: 40px;
}
</style>
