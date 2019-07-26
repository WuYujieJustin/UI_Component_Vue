<template>
    <span>
        <span  v-if="edit">
            <input v-model="privateValue" 
            @blur="edit=!edit"
            @input="$emit('input', $event.target.value)">
            <button @mousedown="$emit('submit')">{{button}}</button>
        </span>
        <span v-else 
        @dblclick="edit=!edit" 
        title="双击修改(*＾-＾*)">{{privateValue}}</span>
        
    </span>
</template>

<script>
import editableLable from "~/components/parts/editableLable"
export default {
    data(){
        return{
            edit:false,
            privateValue:this.value,
            log:console
        }
    },
    props:{
        value:{
            default:"",
        },
        button:{
            type: String,
            default:"提交"
        },
    },
    methods:{
        //
    },
    computed: {
        inputListeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                // 这里确保组件配合 `v-model` 的工作
                    input: function (event) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    watch:{
        value(val){
            this.privateValue=val
        },
        privateValue(val){
            this.$emit("edit",val)
        }
    }
}
</script>