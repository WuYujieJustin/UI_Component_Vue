<template>
  <div class="container1">
    <nav class="topbar">
      <i
        :style="!expend?'margin-left:4%':'margin-left:16%'"
        class="fa fa-bars fa-2x"
        @click="isHidehandle"
        aria-hidden="true"
        style="cursor:pointer;padding:8px"
      ></i>
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
          <div style="display:flex;align-items: center;">
            <span style="margin-right:5px">这里是name</span>
            <i class="fa fa-caret-down" aria-hidden="true"></i>
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
              <img :src="item.src" alt />
              {{item.text}}
            </div>
            <i
              class="fa fa-caret-right"
              v-if="item.children && !item.isShow"
              style="margin-right: 20px"
              aria-hidden="true"
            ></i>
            <i
              v-else-if="item.children && item.isShow"
              class="fa fa-caret-down"
              style="margin-right:20px"
              aria-hidden="true"
            ></i>
          </div>
          <div v-else-if="item.url" style="width:100%">
            <nuxt-link :to="item.url?item.url:''">
              <div style="padding-left:23px;height:46px;text-align:left;line-height:46px">
                <img :src="item.src" alt />
                {{item.text}}
              </div>
            </nuxt-link>
          </div>
          <div v-else>
            <div style="margin: 10px 23px">
              <img :src="item.src" alt />
              {{item.text}}
            </div>
          </div>

          <transition name="page">
            <div style="width:100%" v-if="item.children && item.isShow">
              <div v-for="(name,i) in item.children" :key="i">
                <div v-if="name.moreMsg && name.moreMsg.length>0">
                  <div class="thirdItem" @click.stop="showThirdItem(name)">
                    <div
                      style="margin-left:40px;height:40px;text-align:left;line-height:40px;"
                    >{{name.text}}</div>
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
                    >{{name.text}}</div>
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
                  >{{name.text}}</div>
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
                        >{{names.text}}</div>
                      </div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </li>
      </ul>

      <ul v-else>
        <li>
          <nuxt-link to="/">狂</nuxt-link>
        </li>

        <li
          v-for="(item,index) in list"
          :key="index"
          @click.stop="showItem(item,index)"
          style="position:relative"
          @mouseleave="hiddenSecchild(item)"
        >
          <img :src="item.src" alt />

          <transition name="page">
            <div v-if="item.children && item.isShow" class="secChild">
              <div v-for="(name,i) in item.children" :key="i" style="background:rgb(30, 40, 44)">
                <!-- <a href="#">{{name.text}}</a> -->
                <div v-if="!name.moreMsg">
                  <nuxt-link to="/listviewPage" class="thirdItem">
                    <div style="margin-left:40px">{{name.text}}</div>
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
                    <div style="margin-left:40px;">{{name.text}}</div>
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
                    <!-- <a href="#">{{name.text}}</a> -->
                    <div class="thirdItem" @click.stop="showThirdItem(name)">
                      <div style="margin-left:50px">{{names.text}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </nav>
    <nuxt :style="!expend?'padding-left:4%':'padding-left:16%'" style="min-height:520px" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tabList: [],
      list: [
        {     
          src: require("@/static/imgs/subway.png"),
          text: "listviewPage",
          children: [],
          url: "/listviewPage",
          isShow: false
        },
        {   
          src: require("@/static/imgs/subway.png"),
          text: "这里有二级目录",
          children: [
            {
              text: "还有三级目录",
              moreMsg: [
                {
                  name: "thirdItem",
                  text: "三级listviewPage",
                  url: "/listviewPage",
                  showThirdItem: false
                }
              ]
            },
            { name: "sonItem", text: "listviewPage", url: "/listviewPage" },
            { name: "sonItem", text: "listviewPage", url: "/listviewPage" }
          ],
          isShow: false
        },
        {
          src: require("../static/imgs/subway.png"),
          text: "这里有二级目录",
          children: [
            {
              name: "sonItem",
              text: "langCode",
              moreMsg: [
                {
                  name: "thirdItem",
                  text: "三级listviewPage",
                  url: "/listviewPage",
                  showThirdItem: false
                }
              ]
            },
            { name: "sonItem", text: "langCode", url: "/langCode" },
            { name: "sonItem", text: "langCode", url: "/langCode" }
          ],
          isShow: false
        },
        {
          src: require("../static/imgs/subway.png"),
          text: "这里有二级目录",
          children: [
            { name: "sonItem", text: "listviewPage" },
            { name: "sonItem", text: "listviewPage" },
            { name: "sonItem", text: "listviewPage" }
          ],
          isShow: false
        },
        {  
          src: require("../static/imgs/subway.png"),
          text: "city",
          url: "/city",
          isShow: false
        },
        {
          src: require("../static/imgs/subway.png"),
          text: "translate",
          url: "/translate",
          isShow: false
        },
        {
          src: require("../static/imgs/subway.png"),
          text: "这里有二级目录",
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
    showItem(item, index) {
      item.isShow = !item.isShow;
    
      if (this.expend) {
        let obj = this.$refs;
        console.log("obj", obj);
        for (const key in obj) {
          console.log("key", key);
          if (key.indexOf("leftBar") !== -1) {
            if (key.indexOf("leftBar" + index) !== -1) {
              obj[key][0].classList.add("active");
            } else {
              obj[key][0].classList.remove("active");
            }
          }
        }
      } else {
      
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
          this.list[i].isShow = false;
        }
        console.log("this.list", this.list);
      }
      this.expend = !this.expend;
    },
   
    hiddenSecchild(item) {
      item.isShow = false;
      console.log(item.isShow);
    }
  }
};
</script>
<style>
@import "~/assets/index.less";
</style>
