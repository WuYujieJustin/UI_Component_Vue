<template>
    <div class="textInput">
        <label for="textInput">{{textContent}}</label>
        <input type="textInput">
    </div>
</template>

<script>
export default {
    data(){
        return{
            textContent:''
        }
    },
    props:{
        textContent:{
            type:String,
        }
    }
}
</script>

<style>

</style>
