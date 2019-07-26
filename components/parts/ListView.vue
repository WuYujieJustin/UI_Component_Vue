<template>
    <div>
        <header>
            <div>这里从理论上来讲是查询控件</div>
            <div>
                <button  @click="tableEditShow">表格设置</button>
            </div>
        </header>
        <ListviewTable
        :data="value.data"
        :title="value.head"/>


        <DialogueBox ref="DialogueBox" v-model="tableEditDisplay">
            我滴个妈呀
            <ListviewOperator 
            :data="value.head"
            />
        </DialogueBox>
        <section class=""></section>
        

    </div>
</template>
<script>
import ListviewTable from "~/components/parts/ListviewTable"
import ListviewOperator from "~/components/parts/ListviewOperator"
import DialogueBox from "~/components/parts/DialogueBox"

export default {
    components:{
        ListviewTable,
        ListviewOperator,
        DialogueBox
    },
    data(){
        return{
            tableEditDisplay:false,
        }
    },
    props:{
        value:Object,
    },
    methods:{
        tableEditShow(){
            this.tableEditDisplay=true;
        }
    }
}
</script>
<style>

</style>

