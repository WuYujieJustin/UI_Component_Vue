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
    <nav class="leftBar" :display="isHide?'block':'none'">
      <ul>
        <li class="bar-title">
          系统菜单
          <span @click="isHide=!isHide">&lt;&lt;</span>
        </li>
        <li v-for="(item,index) in list" :key="index">
          <div class="li-img" @click="showItem(item)">
            <img :src="item.src" alt />
            {{item.text}}
            <img :src="item.toggleSrc" alt />
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
    </nav>
    <nuxt />
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
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
      isHide: true
    };
  },
  methods: {
    showItem(item) {  // 设置节流
      item.isShow = !item.isShow;
      
    }
  },
  computed: {}
  // transition: "page"
};
</script>

<style>
@import "@/assets/index.less";
</style>
