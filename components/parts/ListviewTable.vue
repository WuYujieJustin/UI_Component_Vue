<template>
    <table :key="titleKey">
        <thead v-if="title ||data" >
            <tr v-if="title">
                <td v-for="(item,O_O) in titleList" 
                @mousedown="drop(O_O)" 
                @mousemove="willBeDropToHere(O_O)"
                @mouseup="dropEnd(O_O)"
                :style="getStyle(O_O)"
                :width="item.width"
                :key="O_O">{{item.name}}</td>
            </tr>
            <tr v-else>
                <td v-for="(item,O_O) in columns" 
                @mousedown="drop(O_O)" 
                @mousemove="willBeDropToHere(O_O)"
                @mouseup="dropEnd(O_O)"
                :style="getStyle(O_O)"
                :key="O_O">{{item}}</td>
            </tr>
        </thead>
        <tbody v-if="data&&title">
            <tr v-for="(row,QAQ) in displayData" :key="QAQ" :class="row.checked?'select':''" @click="choose(row)">
                <td v-for="(dOAOb,TAT) in titleList" :key="TAT">
                    <span v-if="dOAOb.id=='listViewPrivateCheckBox'">
                        <input v-if="multiSelect" type="checkbox" name="orz" :value="QAQ+1" :checked="row.checked" >
                        <input v-else type="radio" name="orz" :value="QAQ+1"  :checked="row.checked?'checked':''" >
                    </span>
                    <span v-else-if="dOAOb.id=='listViewPrivateId'">
                        {{QAQ+1}}
                    </span>
                    <span v-else-if="row[dOAOb.id]">
                        {{row[dOAOb.id]}}
                    </span>
                    
                </td>
            </tr>
        </tbody>
        <tbody v-else-if="data">
            <tr>
                <td :colspan="getColspanWhenNotitle">警告：缺少参数title。大部分功能无法使用。</td>
            </tr>
            <tr v-for="(row,QAQ) in displayData" :key="QAQ">
                <td v-for="(key,TAT) in columns" :key="TAT">
                    {{row[key]}}
                </td>
            </tr>
            <tr></tr>
        </tbody>
        <tbody v-else>
            <tr v-if="title">
                <td :colspan="title.length">暂无数据</td>
            </tr>
            <tr v-else>
                <td>暂无数据</td>
            </tr>
        </tbody>
        <tfoot v-if="limit">
            <tr v-if="title">
                <td :colspan="titleList.length">
                    <a href="#" @click="lastPage">上一页</a>
                    <span>第{{page}}页（共{{total}}页）</span>
                    <a href="#" @click="nextPage">下一页</a>

                    <span v-if="excel">导出excel</span>
                    <span v-if="refresh">刷新</span>
                </td>
            </tr>
            <tr v-else>
                <td :colspan="columns.length">
                    <td :colspan="titleList.length">
                    <a href="#" @click="lastPage">上一页</a>
                    <span>第{{page}}页（共{{total}}页）</span>
                    <a href="#" @click="nextPage">下一页</a>

                    <span v-if="excel">导出excel</span>
                    <span v-if="refresh">刷新</span>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import editableLableWithButton from "~/components/parts/editableLableWithButton"
export default {
    components:{
        editableLableWithButton,
    },
    model: {
        prop: 'value',
        event: 'select'
    },
    data() {
        return {
            columns:[], //没有规定字段时的东西
            titleList:this.title,
            newcolums:[],
            titleKey:0,//修改一次刷新一次
            droping:false,
            whatAreYouDroping:0,
            dropingMouseNow:0,

            //分页
            page:1,//当前页数

            selected:[],//当前选中项
            displayData:[],
        }
    },
    props:{
        data:{
            type:Array,
        },
        title:{
            type:Array,
        },
        value:{
            type:Array,//对外传出数据
        },
        multiSelect:{
            type:Boolean,//是否多选 true 为多选 false单选
        },
        checkBox:{
            type:Boolean,//是否显示框
        },
        displayId:{
            type:Boolean,//是否显示序号
        },
        refresh:{
            type:Boolean,//是否显示刷新按钮
        },
        excel:{
            type:Boolean,//是否显示excel按钮
        },
        limit:{
            type:Number,//每页的条目数，0为显示全部
        }
        
    },
    
    methods:{
        lastPage(){
            if(this.page>1){
                this.page--;
                this.titleKey++
            }
        },
        nextPage(){
            if(this.page<this.total){
                this.page++;
                this.titleKey--
            }
        },
        choose(item){
            if(this.multiSelect){
                if(!item.checked){
                    this.selected.push(item)
                }else{
                    for(let OAO in this.selected){
                        if(this.selected[OAO]==item){
                            this.selected.splice(OAO,1);
                        }
                    }
                }
                item.checked=!item.checked;
                
                this.titleKey++
            }else{
                if(this.selected.length!=0){
                    this.selected[0].checked=false;
                    this.selected.splice(0,1);
                }
                item.checked=true;
                this.selected[0]=item;
                
                this.titleKey++
            }
        },
        checkTitleKey(Keyname){
            for(let i in this.titleList){
                if(this.titleList[i].key==Keyname){
                    return true;
                }
            }
            return false;
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
                console.log("开始拖，从"+this.whatAreYouDroping+"到"+toId)
                //往左拖
                if(toId<this.whatAreYouDroping){
                    for(let QAQ=this.whatAreYouDroping;QAQ>=0;QAQ--){
                        if(QAQ==toId){
                            this.whatAreYouDroping=toId;
                            this.droping=false;
                            this.titleKey++;
                            return;
                        }
                        let center=this.columns[QAQ];
                        this.columns[QAQ]=this.columns[QAQ-1]
                        this.columns[QAQ-1]=center;
                        //title参数存在的情况
                        if(this.titleList){
                            let tcenter=this.titleList[QAQ];
                            this.titleList[QAQ]=this.titleList[QAQ-1]
                            this.titleList[QAQ-1]=tcenter;
                        }
                    }
                }else{
                    //向右拖
                    for(let QAQ=this.whatAreYouDroping;QAQ<this.columns.length; QAQ++){
                        if(QAQ==toId){
                            this.whatAreYouDroping=toId;
                            this.droping=false;
                            this.titleKey++;
                            return;
                        }
                        let center=this.columns[QAQ];
                        this.columns[QAQ]=this.columns[QAQ+1]
                        this.columns[QAQ+1]=center;
                        //title参数存在的情况
                        if(this.titleList){
                            let tcenter=this.titleList[QAQ];
                            this.titleList[QAQ]=this.titleList[QAQ+1]
                            this.titleList[QAQ+1]=tcenter;
                        }
                    }
                }
                //console.log(this.columns)
            }
            //this.droping=false;
            console.log(this.droping);
            //this.titleKey++;
        },
        getStyle(id){
            if(this.droping){
                if(id==this.whatAreYouDroping){
                    return {
                        backgroundColor:"red",
                    }
                }
                else if(id<this.whatAreYouDroping&&this.dropingMouseNow==id){
                    return{
                        borderLeft: "3px solid red"
                    }
                }
                else if(id>this.whatAreYouDroping&&this.dropingMouseNow==id){
                    return{
                        borderRight: "3px solid red"
                    }
                }
            }else{
                return {
                    backgroundColor:"transparent",
                    borderLeft:"1px solid chocolate",
                    borderRight:"1px solid chocolate",
                };
            }
        },
        test(data){
            console.log("下面的数据")
            console.log(data);
        }
    },
    beforeUpdate() {
        console.log(this.data);
        //我都忘记这行代码是做什么的了。。。想起来了记得写一下吖~~
        this.columns=this.columns.length==0?Object.keys(this.data[0]):this.columns
        if(!this.titleList){
            this.titleList=this.title
        }
        if(this.displayId&&!this.checkTitleKey("listViewPrivateId")){
            this.titleList.unshift({id:"listViewPrivateId",name:"序号"})
        }
        if(this.checkBox&&!this.checkTitleKey("listViewPrivateCheckBox")){
            this.titleList.push({id:"listViewPrivateCheckBox",name:"选择"})
        }
        if(!this.limit){
            this.displayData=this.data;
        }else{
            this.displayData=this.data.slice((this.page-1)*this.limit,this.page*this.limit);
        }
        console.log(this.displayData)
        //this.titleKey++;
    },
    mounted(){
        this.titleKey++;
    },
    computed: {
        total:function(){
            return Math.ceil(this.data.length/this.limit);
        },
        getColspanWhenNotitle(){
            return Object.keys(this.data[0]).length;
        }
    },
    watch:{
        value(val){
            this.select=val
        },
        selected(val){
            this.$emit("select",val)
        },
        title(val){
            this.titleList=this.title;
            this.titleKey++;
        }

    }
}
</script>
<style>
td{
    text-align: center;
}
table{
    width: 100%;

}
table,td{
    border: 1px solid chocolate;
}
tbody tr{
    cursor: pointer;
}
tbody tr:hover{
    background-color: blanchedalmond
}
thead td{
    cursor: move;
    user-select:none;
}
.select{
    background:red;
    color:#FFF;
}
</style>
