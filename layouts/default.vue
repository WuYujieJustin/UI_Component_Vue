<template>
  <div class="container1">
    <nav class="topbar">
      <div class="topbar_content">
        <i
          :style="!expend?'margin-left:4%':'margin-left:16%'"
          class="fa fa-bars fa-2x"
          @click="isHidehandle"
          aria-hidden="true"
          style="cursor:pointer;padding:8px"
        ></i>
        <div class="topbar-right">
          <!-- 增加清除服务器缓存图标 -->
          <div>
            <i class="fa fa-refresh fa-spin fa-2x fa-fw" aria-hidden="true" @click="flush"></i>
          </div>
          <div>
            <i class="fa fa-commenting-o fa-2x fa-fw" aria-hidden="true"></i>
          </div>
          <div>
            <i class="fa fa-bell fa-2x fa-fw" aria-hidden="true"></i>
          </div>
          <div>
            <i class="fa fa-wrench fa-2x fa-fw" aria-hidden="true"></i>
          </div>
          <div class="user">
            <div>{{version}}</div>
            <div
              style="max-width:150px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
              :value="name"
            >{{name}}</div>
            <i class="fa fa-2x fa-power-off" aria-hidden="true" @click="signout"></i>
          </div>
        </div>
      </div>
    </nav>
    <nav class="leftBar" :class="{active: isActive}">
      <ul v-if="expend">
        <li class="logoBar">
          <nuxt-link to="/">
            <img class="logo" src="../static/imgs/logo.png" alt />
          </nuxt-link>
        </li>
        <li v-for="(item,index) in list" :key="index">
          <div
            class="li-img"
            @click="showItem(item,index)"
            :ref="'leftBar'+index"
            v-if="item.children && item.children.length>0"
          >
            <div style="margin: 10px 23px">
              <i :class="'fa fa-fw '+item.icon" aria-hidden="true"></i>
              {{item.name}}
            </div>
            <i
              class="fa fa-caret-right"
              v-if="item.children && !item.show"
              style="margin-right: 20px"
              aria-hidden="true"
            ></i>
            <i
              v-else-if="item.children && item.show"
              class="fa fa-caret-down"
              style="margin-right:20px"
              aria-hidden="true"
            ></i>
          </div>
          <div
            class="li-img"
            v-else-if="item.url"
            style="width:100%"
            :ref="'leftBar'+index"
            @click="showItem(item,index)"
          >
            <nuxt-link :to="item.url?item.url:''">
              <div style="padding-left:23px;height:46px;text-align:left;line-height:46px">
                <i :class="'fa fa-fw '+item.icon" aria-hidden="true"></i>
                {{item.name}}
              </div>
            </nuxt-link>
          </div>
          <div v-else :ref="'leftBar'+index" @click="showItem(item,index)" class="li-img">
            <div style="margin: 10px 23px">
              <i :class="'fa fa-fw '+item.icon" aria-hidden="true"></i>
              {{item.name}}
            </div>
          </div>

          <transition name="page">
            <div style="width:100%" v-if="item.children && item.show">
              <div v-for="(name,i) in item.children" :key="i">
                <div v-if="name.moreMsg && name.moreMsg.length>0">
                  <div class="thirdItem" @click.stop="showThirdItem(name)">
                    <div
                      style="margin-left:40px;height:40px;text-align:left;line-height:40px;"
                    >{{name.name}}</div>
                    <i
                      style="margin-right:20px"
                      class="fa fa-caret-right"
                      v-if="name.moreMsg && !name.moreMsg[0].showThirdItem"
                      aria-hidden="true"
                    ></i>
                    <i
                      style="margin-right:20px"
                      v-else-if="name.moreMsg && name.moreMsg[0].showThirdItem"
                      class="fa fa-caret-down"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div v-else-if="name.url">
                  <nuxt-link :to="name.url" class="thirdItem">
                    <div
                      style="margin-left:40px;height:40px;text-align:left;line-height:40px;"
                    >{{name.name}}</div>
                    <i
                      style="margin-right:20px"
                      class="fa fa-caret-right"
                      v-if="name.moreMsg && !name.moreMsg[0].showThirdItem"
                      aria-hidden="true"
                    ></i>
                    <i
                      style="margin-right:20px"
                      v-else-if="name.moreMsg && name.moreMsg[0].showThirdItem"
                      class="fa fa-caret-down"
                      aria-hidden="true"
                    ></i>
                  </nuxt-link>
                </div>
                <div v-else class="second">
                  <div
                    style="margin-left:40px;height:40px;text-align:left;line-height:40px;"
                  >{{name.name}}</div>
                  <i
                    style="margin-right:20px"
                    class="fa fa-caret-right"
                    v-if="name.moreMsg && !name.moreMsg[0].showThirdItem"
                    aria-hidden="true"
                  ></i>
                  <i
                    style="margin-right:20px"
                    v-else-if="name.moreMsg && name.moreMsg[0].showThirdItem"
                    class="fa fa-caret-down"
                    aria-hidden="true"
                  ></i>
                </div>

                <div style="width:100%" v-if="name.moreMsg && name.moreMsg[0].showThirdItem">
                  <div v-for="(names,i) in name.moreMsg" :key="i">
                    <nuxt-link :to="names.url?names.url:''">
                      <div class="thirdItem">
                        <div
                          style="margin-left:50px;height:35px;text-align:left;line-height:35px"
                        >{{names.name}}</div>
                      </div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </li>
      </ul>

      <ul v-else class="unexpend">
        <li>
          <nuxt-link to="/">狂</nuxt-link>
        </li>

        <li
          v-for="(item,index) in list"
          :key="index"
          @mouseenter="showItem(item,index)"
          style="position:relative"
          @mouseleave="hiddenSecchild(item)"
        >
          <nuxt-link :to="item.url?item.url:''">
            <i :class="'fa fa-fw '+item.icon" aria-hidden="true"></i>
          </nuxt-link>

          <div class="secChild" v-if="item.show">
            <div v-for="(name,i) in item.children" :key="i" style="background:rgb(30, 40, 44)">
              <div v-if="name.moreMsg">
                <div class="thirdItem" @click.stop="showThirdItem(name)">
                  <div>{{name.name}}</div>
                  <i
                    style="margin-right:20px"
                    class="fa fa-caret-right"
                    v-if="name.moreMsg && name.moreMsg[0].showThirdItem"
                    aria-hidden="true"
                  ></i>
                  <i
                    style="margin-right:20px"
                    v-else-if="name.moreMsg && !name.moreMsg[0].showThirdItem"
                    class="fa fa-caret-down"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div v-else-if="name.url">
                <nuxt-link :to="name.url" class="thirdItem">
                  <div>{{name.name}}</div>
                  <i
                    style="margin-right:20px"
                    class="fa fa-caret-right"
                    v-if="name.moreMsg && !name.moreMsg[0].showThirdItem"
                    aria-hidden="true"
                  ></i>
                  <i
                    style="margin-right:20px"
                    v-else-if="name.moreMsg && name.moreMsg[0].showThirdItem"
                    class="fa fa-caret-down"
                    aria-hidden="true"
                  ></i>
                </nuxt-link>
              </div>
              <div v-else>
                <div class="thirdItem" @click.stop="showThirdItem(name)">
                  <div>{{name.name}}</div>
                  <i
                    style="margin-right:20px"
                    class="fa fa-caret-right"
                    v-if="name.moreMsg && name.moreMsg[0].showThirdItem"
                    aria-hidden="true"
                  ></i>
                  <i
                    style="margin-right:20px"
                    v-else-if="name.moreMsg && !name.moreMsg[0].showThirdItem"
                    class="fa fa-caret-down"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div v-if="name.moreMsg && name.moreMsg[0].showThirdItem">
                <div v-for="(names,i) in name.moreMsg" :key="i">
                  <nuxt-link :to="names.url?names.url:''">
                    <div class="thirdItem">
                      <div style="margin-left:50px">{{names.name}}</div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <keep-alive>
      <nuxt
        @login="test"
        :style="!expend?'padding-left:4%':'padding-left:16%'"
        style="min-height:520px"
      />
    </keep-alive>
  </div>
</template>

<script>
import axios from "axios";
import config from "../common/api";
export default {
  data() {
    return {
      name: "name",
      version: "",
      tabList: [],
      list: [
        
        {
          src: require("@/static/imgs/subway.png"),
          name: "listviewPage",
          children: [],
          url: "/listviewPage",
          show: false,
          current: false
        }
      ],
      isActive: false,
      expend: true,
      secShow: false,
      value: ""
    };
  },
  
  beforeMount() {
    if (window && !window.localStorage.menu) {
      this.$router.push({
        path: "/login"
      });
    }
  },
  mounted() {
    if (window.localStorage.menu) {
      this.list = JSON.parse(window.localStorage.menu);
    }
    if (window.localStorage.username) {
      this.name = JSON.parse(window.localStorage.username);
    }
    if (window.localStorage.version) {
      this.version = window.localStorage.version;
    }
  },
  methods: {
    // 临时代码，用于清除redis缓存
    flush() {
      axios({
        method: "get",
        url: "http://" + config.host + "/flush",
        headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
      }).then(res => {
        console.log("res", res);
        if (res.data === "缓存清除成功") {
          alert("清除服务器缓存成功");
          console.log("清除服务器缓存成功");
          location.reload();
        } else {
        }
      });
    },
    signout() {
      window.localStorage.clear();
      this.$router.push({
        path: "/login"
      });
    },
    test() {
      console.log("event from Login");
    },
    showItem(item, index) {
      if (item.children && item.children.length > 0) {
        item.show = !item.show;
      } else {
        item.current = true;
        // console.log("item", item);
        if (this.tabList && this.tabList.length > 0) {
          for (const i in this.tabList) {
            if (this.tabList[i].name === item.name) {
              this.tabList[i].current = true;
            } else {
              this.tabList[i].current = false;
            }
          }
        }
        this.tabList = [...new Set(this.tabList.concat(item))];
      }
      if (this.expend) {
        let obj = this.$refs;
        for (const key in obj) {
          if (key.indexOf("leftBar") !== -1) {
            if (key.indexOf("leftBar" + index) !== -1) {
              obj[key][0].classList.add("active");
            } else {
              obj[key][0].classList.remove("active");
            }
          }
        }
      }
    },
    addActive(name) {
      for (const i in this.tabList) {
        if (this.tabList[i].name === name) {
          this.tabList[i].current = true;
        } else {
          this.tabList[i].current = false;
        }
      }
    },
    showThirdItem(name) {
      if (name.moreMsg) {
        name.moreMsg[0].showThirdItem = !name.moreMsg[0].showThirdItem;
      }
    },
    isHidehandle() {
      this.isActive = !this.isActive;
      if (this.expend) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].show = false;
        }
      }
      this.expend = !this.expend;
    },

    hiddenSecchild(item) {
      item.show = false;
    }
  }
};
</script>
<style>
@import "~/assets/index.less";
</style>
