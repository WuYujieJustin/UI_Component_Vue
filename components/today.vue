<template>
    <div>
        <button @click="chooseToday">today</button>
    </div>
</template>

<script>
export default {
    methods:{
        chooseToday(){
            this.$emit("chooseToday")
        }
    }
}
</script>

<style lang="less" scoped>
button{
    width:100%;
    cursor: pointer;
}

</style>

