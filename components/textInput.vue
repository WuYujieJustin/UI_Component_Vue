<template>
    <div class="textInput">
        <label for="textInput">{{label}}</label>
        <input type="textInput">
    </div>
</template>

<script>
export default {
    data(){
        return{
            // label:''
        }
    },
    props:{
        label:{
            type:String,
            value:''
        }
    }
}
</script>

<style>

</style>
