<template>
    <div class="example">
        <label>{{ label || "这是默认文本标签"}}</label>
        <textarea cols="20" rows="5" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :placeholder="placeholder" :readonly="readonly"></textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props:{
        label:String,
        value:String,
        placeholder:String,
        readonly:String
    },
    methods: {
        
    },

}
</script>
<style>
</style>
