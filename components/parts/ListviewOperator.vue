<template>
    <div class="ListviewOperator" :key="titleKey">
        <div class="row" v-for="(row,OHO) in data" :key="OHO"
            
                :style="getStyle(OHO)">
            <div class="checkbox">
                <input type="checkbox" name="orz" :value="OHO+1" @click="choose(row)" :checked="isSelected(row)?'checked':''"> 
            </div>
            <div class="right" >
                <div class="drop"
                @mousedown="drop(OHO);" 
                @mousemove="willBeDropToHere(OHO)"
                @mouseup="dropEnd(OHO);">
                    <span>{{row.name}}</span>
                </div>
                <div class="edit">
                    <span>宽度：</span><input type="text" v-model="row.width"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import editableLable from "~/components/parts/editableLable"
export default {
    components:{
        editableLable,
    },
    model: {
        prop: 'value',
        event: 'select'
    },
    props:{
        data:Array,
        value:Array,
    },
    data(){
        return {
            /*data:[
                {key:"name",title:"名称",display:"true" ,width:"90"},
                {key:"price",title:"价格",display:"true",width:"120"},
                {key:"type",title:"规格",display:"true" ,width:"110"},
                {key:"taste",title:"口味",display:"true",width:"170"},
            ],*/
            selected:[],

            droping:false,
            dropingMouseNow:0,
            whatAreYouDroping:0,
            titleKey:0,
        }
    },
    methods:{
        choose(item){
            //console.log("选择了")
            //console.log("选择了吗"+this.isSelected(item))
            //if(this.whatAreYouDroping==)
            if(this.isSelected(item)){
                for(let QAQ in this.selected){
                    if(item==this.selected[QAQ]){
                        this.selected.splice(QAQ, 1);
                    }
                }
            }else{
                //this.selected.push(item)
                let rel=new Array();
                for(let GAG in this.data){
                    if(this.isSelected(this.data[GAG])){
                        rel.push(this.data[GAG])
                    }else if(this.data[GAG]==item){
                        rel.push(item)
                    }
                }
                this.selected=rel;
            }
        },
        isSelected(item){
            //console.log("选择了吗")
            for(let OAO in this.selected){
                if(this.selected[OAO]==item){
                    return true;
                }
            }
            return false;
        },
        selectedUpdate(){
            let rel=new Array();
            for(let GAG in this.data){
                if(this.isSelected(this.data[GAG])){
                    rel.push(this.data[GAG])
                }
            }
            this.selected=rel;
        },
        drop(id){
            this.droping=true;
            this.whatAreYouDroping=id;
        },
        willBeDropToHere(toId){
            if(this.droping){
                this.dropingMouseNow=toId;
            }
        },
        dropEnd(toId){
            if(this.droping){
                //console.log("开始拖，从"+this.whatAreYouDroping+"到"+toId)
                //往上拖
                if(toId<this.whatAreYouDroping){
                    for(let QAQ=this.whatAreYouDroping;QAQ>=0;QAQ--){
                        if(QAQ==toId){
                            this.whatAreYouDroping=toId;
                            this.droping=false;
                            this.selectedUpdate();
                            this.titleKey++;
                            return;
                        }
                        let center=this.data[QAQ];
                        this.data[QAQ]=this.data[QAQ-1]
                        this.data[QAQ-1]=center;
                    }
                }else{
                    //向下拖
                    for(let QAQ=this.whatAreYouDroping;QAQ<this.data.length; QAQ++){
                        if(QAQ==toId){
                            this.whatAreYouDroping=toId;
                            this.droping=false;
                            this.selectedUpdate()
                            this.titleKey++;
                            return;
                        }
                        let center=this.data[QAQ];
                        this.data[QAQ]=this.data[QAQ+1]
                        this.data[QAQ+1]=center;
                    }
                }
            }
        },
        getStyle(id){
            if(this.droping){
                if(id==this.whatAreYouDroping){
                    return {
                        backgroundColor:"#CCC",
                    }
                }
                else if(id<this.whatAreYouDroping&&this.dropingMouseNow==id){
                    return{
                        borderTop: "3px solid grey"
                    }
                }
                else if(id>this.whatAreYouDroping&&this.dropingMouseNow==id){
                    return{
                        borderBottom: "3px solid grey"
                    }
                }
            }else{
                return {
                    backgroundColor:"transparent",
                    borderLeft:"1px solid darkgray",
                    borderRight:"1px solid darkgray",
                };
            }
        },
    },
    watch:{
        value(val){
            this.select=val
        },
        selected(val){
            let rel=new Array();
            for(let GAG in this.data){
                if(this.isSelected(this.data[GAG])){
                    rel.push(this.data[GAG])
                }
            }
            this.$emit("select",rel)
        },

    }
}
</script>
<style>
*{
    box-sizing: border-box;
}
.ListviewOperator{
    display:flex;
    flex-direction: column;
}
.ListviewOperator .row{
    height: 36px;
    font-size: 16px;
    display: flex;
    /*user-select:none;*/
    cursor: move;
    margin: 0;
}
.ListviewOperator,.row{
    border:1px solid darkgray;
}
input{
    width:36px;
}
.right{
    display: flex;
    height: 100%;
    width: 100%;
}
.right span{
    padding: 9px;
    display: inline-block;
}
.right div{
    display: flex;
}
.drop{
    width:80%;
}
.edit{
    width:20%;
}
</style>
