<template>
    <div class="numberInput">
        <form>
        <label for="numberInput" :class="color">{{label}}</label>
        <input @change="handlechange" type="numberInput" v-model="num" placeholder="type" @keyup="handlekeyup">
        <p>{{numformate}}</p>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            num:''
        }
    },
    props:{
        //label 内容
        label:{
            type:String,
            value:'文本控件'
        },
        // label 颜色
        color:{
            type: String,
        },
        //小数位
        precision:{
            type:Number
        },
        //是否有千分位
        format:{
            type:Boolean
        }
    },
    watch:{
        num:function(e){
            console.log(e)
            this.num = this.num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        }
    },
    methods:{
        handlechange(e){
            console.log(this.label)
        },
        handlekeyup(e){
            return this.num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        }
    },
    computed:{
        numformate:function(){
            // return this.num++
            return this.num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        }
    }
}
</script>

<style scoped>
.red{
    color: red
}
</style>

