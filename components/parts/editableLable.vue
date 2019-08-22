<template>
    <div>
        <input :size="width" v-if="edit" v-model="value"
        @blur="edit=!edit">
        <span v-else 
        @dblclick="edit=!edit" 
        @mouseup="edit=!edit">{{value}}</span>
    </div>
</template>
<script>
export default {
    data(){
        return{
            edit:false,
            log:console,
        }
    },
    props:{
        value:String,
        width:{
            default:2,
        },
    },
}
</script>
<style>

</style>
