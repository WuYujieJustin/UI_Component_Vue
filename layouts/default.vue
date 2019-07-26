<template>
  <div class="container1">
    <nav class="topbar">
      <div class="topbar-left">
        <img class="logo" src="../static/imgs/logo.png" alt />
        <div class="nav-item">
          <img src="../static/imgs/item.png" alt />
          <p>订单管理</p>
        </div>
        <div class="nav-item active">
          <img src="../static/imgs/item.png" alt />
          <p>运价管理</p>
        </div>
        <div class="nav-item">
          <img src="../static/imgs/item.png" alt />
          <p>国际货运</p>
        </div>
        <div class="nav-item">
          <img src="../static/imgs/item.png" alt />
          <p>销售模块</p>
        </div>
        <div class="nav-item">
          <img src="../static/imgs/item.png" alt />
          <p>财务管理</p>
        </div>
        <div class="nav-item">
          <img src="../static/imgs/item.png" alt />
          <p>统计报表</p>
        </div>
        <div class="nav-item">
          <img src="../static/imgs/item.png" alt />
          <p>数据维护</p>
        </div>
        <div class="nav-item">
          <img src="../static/imgs/item.png" alt />
          <p>系统设置</p>
        </div>
      </div>
      <div class="topbar-right">
        <div>
          <img src="../static/imgs/msg.png" alt />
        </div>
        <div>
          <img src="../static/imgs/msg.png" alt />
        </div>
        <div>
          <img src="../static/imgs/msg.png" alt />
        </div>
        <div class="user">
          <div class="user-avatar">
            <img src="../static/imgs/userAvatar.png" alt />
          </div>
          <span>刘磊</span>
        </div>
      </div>
    </nav>
    <nav class="leftBar" :class="{active: isActive}">
      <ul v-if="expend">
        <li class="bar-title">
          系统菜单
          <i
            class="fa fa-angle-double-left fa-2x"
            @click="isHidehandle"
            aria-hidden="true"
            style="width:50px"
          ></i>
          <!-- <span >&lt;&lt;</span> -->
        </li>
        <li v-for="(item,index) in list" :key="index">
          <div class="li-img" @click="showItem(item)">
            <div>
              <img :src="item.src" alt />
              {{item.text}}
            </div>
            <i
              class="fa fa-angle-double-down fa-2x"
              v-if="item.children"
              style="margin-left:30%"
              aria-hidden="true"
            ></i>
          </div>

          <transition name="page">
            <ul class="item-list" v-if="item.children && item.isShow">
              <li v-for="(name,i) in item.children" :key="i">
                <a href="#">{{name.text}}</a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
      <ul v-else>
        <li @click="isHidehandle">
          <i class="fa fa-angle-double-right fa-2x" aria-hidden="true"></i>
        </li>
        <li
          v-for="(item,index) in list"
          :key="index"
          @click="secHandle(index)"
          style="position:relative"
        >
          <img :src="item.src" alt />
          <ul
            class="secChild"
            :ref="'secChild'+index"
            v-if="item.children"
            @mouseleave="mouseleave(index)"
          >
            <li v-for="(items,index) in item.children" :key="index">
              <a href="#">{{items.text}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <nuxt :style="!expend?'padding-left:4%':'padding-left:16%'" style="min-height:520px"/>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      tabList: [],
      list: [
        {
          name: "nav-item",
          src: require("@/static/imgs/subway.png"),
          toggleSrc: require("@/static/imgs/bottom.png"),
          text: "铁路模块",
          children: [
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" }
          ],
          isShow: false
        },
        {
          name: "nav-item",
          src: require("../static/imgs/subway.png"),
          toggleSrc: require("../static/imgs/bottom.png"),
          text: "海运出口",
          children: [
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" }
          ],
          isShow: false
        },
        {
          name: "nav-item",
          src: require("../static/imgs/subway.png"),
          toggleSrc: require("../static/imgs/bottom.png"),
          text: "海运出口",
          children: [
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" }
          ],
          isShow: false
        },
        {
          name: "nav-item",
          src: require("../static/imgs/subway.png"),
          toggleSrc: require("../static/imgs/bottom.png"),
          text: "空运出口",
          isShow: false
        },
        {
          name: "nav-item",
          src: require("../static/imgs/subway.png"),
          toggleSrc: require("../static/imgs/bottom.png"),
          text: "空运出口",
          isShow: false
        },
        {
          name: "nav-item",
          src: require("../static/imgs/subway.png"),
          toggleSrc: require("../static/imgs/bottom.png"),
          text: "个人设置",
          children: [
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" },
            { name: "sonItem", text: "这是二级菜单" }
          ],
          isShow: false
        }
      ],
      isActive: false,
      expend: true,
      secShow: false,
      value: ""
    };
  },

  methods: {
    showItem(item) {
      // 设置节流
      item.isShow = !item.isShow;
    },
    isHidehandle(event) {
      this.isActive = !this.isActive;
      this.expend = !this.expend;
    },
    secHandle(index) {
      console.log(index);

      var _this = this;
      console.log("_this.$refs['secChild'+index]", _this.$refs);
      // 遍历对象 用 for in
      for (const key in _this.$refs) {
        _this.$refs[key][0].style.display = "none";
      }
      console.log(
        '_this.$refs["secChild" + index]2222',
        _this.$refs["secChild" + index]
      );
      if (!_this.$refs["secChild" + index]) return;
      _this.$refs["secChild" + index][0].style.display = "block";
    },
   mouseleave(index) {
      this.$refs["secChild" + index][0].style.display = "none";
    }
  }
};
</script>
<style>
@import "~/assets/index.less";
</style>
