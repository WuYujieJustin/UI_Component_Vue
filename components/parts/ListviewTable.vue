<template>
  <div class='well'>
    <table :key="titleKey" class="table"  :style="{'width':totalWidth}">
      <thead>
        <tr v-if="title">
          <td
            v-for="(item,k) in titleList"
            v-show="item.display!==false"
            @mousedown="drop(k)"
            @mousemove="willBeDropToHere(k)"
            @mouseup="dropEnd(k)"
            :style="getStyle(k)"
            :width="item.width"
            :key="k"
          >{{item.name}}</td>
        </tr>
        <tr v-else>
          <th
            v-for="(item,k) in columns"
            @mousedown="drop(k)"
            @mousemove="willBeDropToHere(k)"
            @mouseup="dropEnd(k)"
            :style="getStyle(k)"
            :key="k"
          >{{item}}</th>
        </tr>
      </thead>
      <tbody v-if="data&&title">
        <tr
          v-for="(row,i) in displayData"
          :key="i"
          :class="row.checked?'select':''"
          @click="choose(row)"
        >
          <td
            v-for="(dtb,j) in titleList"
            v-show="dtb.display!==false"
            :key="j"
            :width="dtb.width"
            :style="getAlign(dtb)"
          >
            <span v-if="dtb.id=='listViewPrivateCheckBox'">
              <input
                v-if="multiSelect"
                type="checkbox"
                name="orz"
                :value="i+1"
                :checked="row.checked"
              />
              <input
                v-else
                type="radio"
                name="orz"
                :value="i+1"
                :checked="row.checked?'checked':''"
              />
            </span>
            <span v-else-if="dtb.id=='listViewPrivateId' && dtb.display!==false">{{i+1}}</span>

            <span v-else-if="row[dtb.id]">{{row[dtb.id]}}</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="data && !title">
        <tr>
          <td :colspan="getColspanWhenNotitle">警告：缺少参数title。大部分功能无法使用。</td>
        </tr>
        <tr v-for="(row,i) in displayData" :key="i">
          <td v-for="(key,j) in columns" :key="j">{{row[key]}}</td>
        </tr>
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
        <!-- <tr> -->
        <!-- <td v-for="(row,p) in titleList" :key="p"> -->
        <!-- <span v-if="!row.isSelTotal">&nbsp;</span> -->
        <!-- 选中数量 -->
        <!-- <span v-else>{{selTotal(row.id)}}</span> -->
        <!-- </td> -->
        <!-- </tr> -->
        <tr>
          <td v-for="(row,q) in titleList" :key="q" :width="row.width">
            <span v-if="!row.isTotal">&nbsp;</span>
            <!-- 合计数量 -->
            <span v-else>{{listTotal(row.id)}}</span>
          </td>
        </tr>
        <tr v-if="title" class="foot">
          <td :colspan="titleList.length">
            <a href="#" @click="lastPage">上一页</a>
            <span>第{{page}}页（共{{total}}页）</span>
            <a href="#" @click="nextPage">下一页</a>
            <span v-if="pagelist">
              每页显示条数：
              <span v-for="(item,index) in pagelist" :key="index">
                &nbsp;
                <span v-if="item==limit">{{item}}</span>
                <a v-else href="#" @click="limit=item;titleKey++">{{item}}</a>
                &nbsp;
              </span>
            </span>
          </td>
        </tr>
        <tr v-else>
          <td :colspan="columns.length">
            <a href="#" @click="lastPage">上一页</a>
            <span>第{{page}}页（共{{total}}页）</span>
            <a href="#" @click="nextPage">下一页</a>
            <span v-if="pagelist">
              每页显示条数：
              <span v-for="(item,index) in pagelist" :key="index">
                &nbsp;
                <span v-if="item==limit">{{item}}</span>
                <a v-else href="#" @click="limit=item;titleKey++">{{item}}</a>
                &nbsp;
              </span>
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  components: {},
  model: {
    prop: "value",
    event: "select"
  },
  data() {
    return {
      columns: [], //没有规定字段时的东西
      titleList: this.title,
      titleKey: 0, //修改一次刷新一次
      droping: false,
      whatAreYouDroping: 0,
      dropingMouseNow: 0,

      //分页
      page: this.pagenumber ? this.pagenumber : 1, //当前页数
      limit: this.limitSetting,
      selected: [], //当前选中项
      displayData: []
    };
  },
  props: {
    data: {
      type: Array
    },
    title: {
      type: Array
    },
    value: {
      type: Array //对外传出数据
    },
    multiSelect: {
      type: Boolean //是否多选 true 为多选 false单选
    },
    checkBox: {
      type: Boolean //是否显示框
    },
    displayId: {
      type: Boolean //是否显示序号
    },
    limitSetting: {
      type: Number //每页的条目数，0为显示全部
    },
    pagenumber: {
      type: Number
    },
    pagelist: {
      type: Array
    }
  },

  methods: {
    listTotal(id) {
      let rel = 0;
      for (let pkq in this.data) {
        rel =
          typeof this.data[pkq][id] == "number"
            ? rel + this.data[pkq][id]
            : rel;
      }
      return rel;
    },
    selTotal(id) {
      let rel = 0;
      for (let pkq in this.data) {
        if (this.data[pkq].checked) {
          rel =
            typeof this.data[pkq][id] == "number"
              ? rel + this.data[pkq][id]
              : rel;
        }
      }
      return rel;
    },
    lastPage() {
      if (this.page > 1) {
        this.page--;
        this.displayData = this.data.slice(
          (this.page - 1) * this.limit,
          this.page * this.limit
        );
        this.titleKey++;
      }
    },
    nextPage() {
      if (this.page < this.total) {
        this.page++;
        this.displayData = this.data.slice(
          (this.page - 1) * this.limit,
          this.page * this.limit
        );
        this.titleKey--;
      }
    },
    choose(item) {
      if (this.multiSelect) {
        if (!item.checked) {
          this.selected.push(item);
        } else {
          for (let t in this.selected) {
            if (this.selected[t] == item) {
              this.selected.splice(t, 1);
            }
          }
        }
        item.checked = !item.checked;

        this.titleKey++;
      } else {
        if (this.selected.length != 0) {
          this.selected[0].checked = false;
          this.selected.splice(0, this.selected.length);
        }
        item.checked = true;
        this.selected.push(item);

        this.titleKey++;
      }
    },
    checkTitleKey(Keyname) {
      for (let i in this.titleList) {
        if (this.titleList[i].id == Keyname) {
          return true;
        }
      }
      return false;
    },
    drop(id) {
      this.droping = true;
      this.whatAreYouDroping = id;
      this.dropingMouseNow = id;
    },
    willBeDropToHere(toId) {
      if (this.droping) {
        this.dropingMouseNow = toId;
      }
    },
    dropEnd(toId) {
      if (this.droping) {
        console.log("开始拖，从" + this.whatAreYouDroping + "到" + toId);
        //往左拖
        if (toId < this.whatAreYouDroping) {
          for (let i = this.whatAreYouDroping; i >= 0; i--) {
            if (i == toId) {
              this.whatAreYouDroping = toId;
              this.droping = false;
              this.titleKey++;
              return;
            }
            let center = this.columns[i];
            this.columns[i] = this.columns[i - 1];
            this.columns[i - 1] = center;
            //title参数存在的情况
            if (this.titleList) {
              let tcenter = this.titleList[i];
              this.titleList[i] = this.titleList[i - 1];
              this.titleList[i - 1] = tcenter;
            }
          }
        } else {
          //向右拖
          for (let i = this.whatAreYouDroping; i < this.columns.length; i++) {
            if (i == toId) {
              this.whatAreYouDroping = toId;
              this.droping = false;
              this.titleKey++;
              return;
            }
            let center = this.columns[i];
            this.columns[i] = this.columns[i + 1];
            this.columns[i + 1] = center;
            //title参数存在的情况
            if (this.titleList) {
              let tcenter = this.titleList[i];
              this.titleList[i] = this.titleList[i + 1];
              this.titleList[i + 1] = tcenter;
            }
          }
        }
        //console.log(this.columns)
      }
      //this.droping=false;
      //this.titleKey++;
    },
    getStyle(id) {
      if (this.droping) {
        if (id == this.whatAreYouDroping) {
          return {
            backgroundColor: "red"
          };
        } else if (id < this.whatAreYouDroping && this.dropingMouseNow == id) {
          return {
            borderLeft: "3px solid red"
          };
        } else if (id > this.whatAreYouDroping && this.dropingMouseNow == id) {
          return {
            borderRight: "3px solid red"
          };
        }
      } else {
        return {
          backgroundColor: "transparent"
        };
      }
    },
    getAlign(title) {
      if (title.align) {
        return {
          textAlign: title.align
        };
      }
    },
    init() {
      if (!this.titleList) {
        this.titleList = this.title;
      }

      if (!this.limit) {
        this.displayData = this.data;
      } else {
        this.displayData = this.data.slice(
          (this.page - 1) * this.limit,
          this.page * this.limit
        );
      }
    }
  },
  beforeMount() {
    //当没有head的时候，用第一行数据的键做
    // console.log("this.columns",this.columns,this.columns?this.columns.length:"没有lenght")
    // this.columns =
    //   this.columns.length == 0 ? Object.keys(this.data[0]) : this.columns;
    this.init();
  },
  mounted() {
    if (this.displayId && !this.checkTitleKey("listViewPrivateId")) {
      this.titleList.unshift({
        id: "listViewPrivateId",
        name: "序号",
        width: "50",
        display: true,
      });
    }
    if (this.checkBox && !this.checkTitleKey("listViewPrivateCheckBox")) {
      this.titleList.push({
        id: "listViewPrivateCheckBox",
        name: "选择",
        width: "50",
        display: true,
      });
    }
  },
  computed: {
    totalWidth() {
      var width = 0;
      for (var i = 0; i < this.titleList.length; i++) {
        // width ----"60px" slice "px"
        if(this.titleList[i].display!==false){
          if(this.titleList[i].width.toString().indexOf("px") > 0){
            width += Number(this.titleList[i].width.toString().slice(0, -2));
          }else{
            width += Number(this.titleList[i].width);
          }  
        }  
      }
      return width + "px";
    },
    total: function() {
      return Math.ceil(this.data.length / this.limit);
    },
    getColspanWhenNotitle() {
      return Object.keys(this.data[0]).length;
    }
  },
  watch: {
    value(val) {
      this.select = val;
    },
    selected(val) {
      this.$emit("select", val);
    },
    title(val) {
      this.titleList = this.title;
      this.titleKey++;
    },
    data(val) {
      this.init();
      this.titleKey++;
    }
  }
};
</script>
<style lang="less" scoped>
table {
  display: block;
  border: 1px solid #ccc;
  background-color: #FFF 
}
.select {
  // color: rgb(0, 110, 106);
  background-color: #fce6a2;
}
// 声明宽度
// tbody::-webkit-scrollbar{
//   position:fixed;
//   bottom:0;
//   color:blue
// }
// tbody::-ms-scrollbar{
//   position:fixed;
//   top:0
// }
tbody {
  display: block;
  height: 300px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
// tr {
//   border-right: 1px solid #cccccc;
//   border-left: 1px solid #cccccc;
// }
// .foot {
//   border: 1px solid #cccccc;
// }
// thead {
//   border: 1px solid #cccccc;
// }
</style>

