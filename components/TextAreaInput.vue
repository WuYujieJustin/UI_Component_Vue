<template>
    <div>
        <!-- <label>{{ label || "这是默认文本标签"}}</label> -->
        <textarea class="form-control" cols="50" rows="5" style="resize:none" v-bind:value="value" v-on:input="transData" :placeholder="placeholder" :readonly="readonly" :required="required"></textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props:{
        value:String,
        placeholder:String,
        readonly:Boolean,
        required:Boolean,
    },
    methods: {
            transData:function(event){
            // this.value=event.target.value
            this.$emit('input', event.target.value)
        }
    },

}
</script>
<style>
</style>
