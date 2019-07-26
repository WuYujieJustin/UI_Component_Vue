<template>
    <div class="dialogue" v-if="display" :key="keyToReload">
        <div class="dialogue_bg"></div>
        <div class="dialogue_container">
            <div class="dialogue_event" @click="close">666</div>
            <div class="dialogue_body">
                <header>
                    <div>{{title}}</div>
                    <div><a href="#" @click="close">关闭 </a></div>
                </header>
                <section><slot></slot></section>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    //
    data(){
        return{
            display:false,//是否显示
            keyToReload:0,//键，用来重新加载
        }
    },
    model:{
        prop:"show",
        event:"statusChange",
    },
    props:{
        show:Boolean,
        title:{
            type: String,
            default:"我是一个萌萌哒对话框"
        }
    },
    methods:{
        close(){
            this.display=false;
            this.reload();
        },
        reload(){
            this.keyToReload++;
        }
    },
    watch: {
        show(val){
            this.display=val
        },
        display(val){
            this.$emit("statusChange",val)
        }
    },
    /*beforeUpdate(){
        this.display=this.show;
    }*/
}
</script>

<style>
.dialogue_bg{
    background-color: black;
    opacity: 0.5;
    z-index: 10086;
}
.dialogue_bg,.dialogue_container,.dialogue_event{
    position:fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
.dialogue_container{
    z-index: 12306;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.dialogue_body{
    background-color: #f0f0f0;
    width: 80%;
    z-index: 12377;
    border: 1px solid #ccc;
    border-radius:5px;
}
.dialogue_body header{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #bbb;
    padding: 15px;
}
.dialogue_body section{
    padding: 15px;
}
</style>
