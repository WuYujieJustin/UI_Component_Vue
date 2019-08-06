<template>
<div>

  <table :key="titleKey">
    <thead v-if="title ||data">
      <tr style="'height':'20px'" v-if="title">
        <th
          v-for="(item,k) in titleList"
          v-if="item.display!==false"
          @mousedown="drop(k)"
          @mousemove="willBeDropToHere(k)"
          @mouseup="dropEnd(k)"
          :style="getStyle(k)"
          :width="item.width"
          :key="k"
        >{{item.name}}</th>
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
        <td v-for="(dtb,j) in titleList" v-if="dtb.display!==false"  :key="j">
          <span v-if="dtb.id=='listViewPrivateCheckBox'">
            <input
              v-if="multiSelect"
              type="checkbox"
              name="orz"
              :value="i+1"
              :checked="row.checked"
            />
            <input v-else type="radio" name="orz" :value="i+1" :checked="row.checked?'checked':''" />
          </span>
          <span v-else-if="dtb.id=='listViewPrivateId'">{{i+1}}</span>
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
      <tr v-if="title">
        <td :colspan="titleList.length">
          <a href="#" @click="lastPage">上一页</a>
          <span>第{{page}}页（共{{total}}页）</span>
          <a href="#" @click="nextPage">下一页</a>
          <span v-if="pagelist">每页显示条数：
            <span v-for="(item,index) in pagelist" :key="index">
              &nbsp;
              <span v-if="item==limit">{{item}}</span>
              <a v-else href="#" @click="limit=item;titleKey++" >{{item}}</a>
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
          <span v-if="pagelist">每页显示条数：
            <span v-for="(item,index) in pagelist" :key="index">
              &nbsp;
              <span v-if="item==limit">{{item}}</span>
              <a v-else href="#" @click="limit=item;titleKey++" >{{item}}</a>
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
  components: {

  },
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
      page: this.pagenumber?this.pagenumber:1, //当前页数
      limit:this.limitSetting,
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
    pagenumber:{
        type:Number
    },
    pagelist:{
        type:Array
    }
  },

  methods: {
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
          this.selected.splice(0, 1);
        }
        item.checked = true;
        this.selected[0] = item;

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
      console.log(this.droping);
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
          backgroundColor: "transparent",
          borderLeft: "1px solid #CCC",
          borderRight: "1px solid #CCC"
        };
      }
    },
  },
  beforeMount() {
    //我都忘记这行代码是做什么的了。。。想起来了记得写一下吖~~
    this.columns =
      this.columns.length == 0 ? Object.keys(this.data[0]) : this.columns;
    if (!this.titleList) {
      this.titleList = this.title;
    }
    if (this.displayId && !this.checkTitleKey("listViewPrivateId")) {
      this.titleList.unshift({ id: "listViewPrivateId", name: "序号" });
    }
    if (this.checkBox && !this.checkTitleKey("listViewPrivateCheckBox")) {
      this.titleList.push({ id: "listViewPrivateCheckBox", name: "选择" });
    }
    if (!this.limit) {
      this.displayData = this.data;
    } else {
      this.displayData = this.data.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    }
  },
  computed: {
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
    }
  }
};
</script>
<style lang="less" scoped>
table{
  height:200px
}
</style>

