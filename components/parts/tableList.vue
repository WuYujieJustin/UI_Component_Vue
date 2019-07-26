<template>
    <table :key="titleKey">
        <thead v-if="title ||data" >
            <tr v-if="title">
                <td v-for="(item,O_O) in titleList" 
                @mousedown="drop(O_O)" 
                @mousemove="willBeDropToHere(O_O)"
                @mouseup="dropEnd(O_O)"
                :style="getStyle(O_O)"
                 :key="O_O">{{item.title}}</td>
                 <td>操作</td>
            </tr>
            <tr v-else>
                <td v-for="(item,O_O) in columns" 
                @mousedown="drop(O_O)" 
                @mousemove="willBeDropToHere(O_O)"
                @mouseup="dropEnd(O_O)"
                :style="getStyle(O_O)"
                :key="O_O">{{item}}</td>
                <td>操作 </td>
            </tr>
        </thead>
        <tbody v-if="data&&title">
            <tr v-for="(row,QAQ) in data" :key="QAQ">
                <td v-for="(dOAOb,TAT) in titleList" :key="TAT">
                    <editableLableWithButton v-model="row[dOAOb.key]" @submit="$emit('submit', row)"/>
                </td>
                <td><slot v-bind:row="row"></slot></td>
            </tr>
            <tr></tr>
        </tbody>
        <tbody v-else-if="data">
            <tr v-for="(row,QAQ) in data" :key="QAQ">
                <td v-for="(key,TAT) in columns" :key="TAT">
                    <editableLableWithButton v-model="row[key]" @submit="$emit('submit', row)"/>
                </td>
                <td><slot v-bind:row="row"></slot></td>
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
    </table>
</template>

<script>
import editableLableWithButton from "~/components/parts/editableLableWithButton"
export default {
    components:{
        editableLableWithButton,
    },
    data() {
        return {
            columns:[],
            titleList:this.title,
            newcolums:[],
            titleKey:0,
            droping:false,
            whatAreYouDroping:0,
            dropingMouseNow:0
        }
    },
    props:{
        data:{
            type:Array,
        },
        title:{
            type:Array,
        },
    },
    methods:{
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
        this.columns=this.columns.length==0?Object.keys(this.data[0]):this.columns
        //this.titleKey++;
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
}
</style>
