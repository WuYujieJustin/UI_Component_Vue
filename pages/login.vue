<template>
  <div class="container">
    <form class="box" autocomplete="on" @submit="login">
      <div id="tittle">
        <div class="language">
          <!-- <a href="#" ref="CN" class="active" @click="changeLang" data-lang='CN'>中&nbsp;|</a>
          <a href="#" ref="EN" @click="changeLang" data-lang='EN'>EN</a>-->
          <a
            href="#"
            :class="{active:currentLang=='CN'}"
            @click="changeLang"
            data-lang="CN"
          >中&nbsp;|</a>
          <a href="#" :class="{active:currentLang=='EN'}" @click="changeLang" data-lang="EN">EN</a>
        </div>
        <h2 align="center">
          <span v-if="currentLang=='CN'">登 录</span>
          <span v-else-if="currentLang=='EN'">Login</span>
        </h2>
        <!-- <h2 align="center" v-else-if="currentLang=='EN'">Login</h2> -->
      </div>
      <label>
        <p class="input_box">
          <span v-if="currentLang=='CN'">邮 箱:</span>
          <span v-else-if="currentLang=='EN'">Email：</span>
          <input
            ref="uname"
            v-model="useremail"
            @blur="checkEmail"
            @focus="setEmail"
            type="text"
            name="email"
            :placeholder="currentLang=='CN'?'请输入邮箱':'Please enter email'"
          />
        </p>
      </label>
      <div style="height:30px">
        <p style="display:none;color:red;padding-left:140px" ref="emailTip">
          <span v-if="currentLang=='CN'">邮箱格式不正确</span>
          <span v-else-if="currentLang=='EN'" style="margin-right:60px">Incorrect mailbox format</span>
        </p>
      </div>
      <label>
        <p class="input_box">
          <span v-if="currentLang=='CN'">密 码:</span>
          <span v-else-if="currentLang=='EN'">Password：</span>
          <input
            ref="upass"
            v-model="userpassword"
            @blur="checkPassword"
            @focus="setPassword"
            type="password"
            minlength="6"
            :placeholder="currentLang=='CN'?'请输入密码':'Please enter password'"
          />
        </p>
      </label>
      <div style="height:40px">
        <p style="display:none;color:red;padding-left:140px;padding-right:90px" ref="passwordTip">
          <span v-if="currentLang=='CN'">密码必须6-18位，包含字符，数字和符号</span>
          <span
            v-else-if="currentLang=='EN'"
          >Passwords must be 6-18 bits long and contain characters, Numbers, and symbols</span>
        </p>
        <p v-if="failed" class>
          <span
            style="color:red;margin-left:140px;margin-right:10px;line-height:17px"
            class="glyphicon glyphicon-remove"
            aria-hidden="true"
          ></span>
          <span style="color:red">{{msg}}</span>
        </p>
      </div>
      <!-- <label>
    <p class="input_box">
        验证码：
      <input type="text" />
    </p>
      </label>-->
      <label class="selectInput">
        <span style="margin-left:97px">版 本:</span>
        <select ref="truckselect">
          <option v-for="option in options" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
      </label>
      <div class="button">
        <button class="button_login" type="submit">
          <span v-if="currentLang=='CN'">登 录</span>
          <span v-else-if="currentLang=='EN'">Login</span>
        </button>
      </div>
      <p class="bottom_link">
        <nuxt-link to="/register">
          <span v-if="currentLang=='CN'">没有账号？点这里</span>
          <span v-else-if="currentLang=='EN'">No account? Click here</span>
        </nuxt-link>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import config from "../common/api";
export default {
  layout: "empty",
  data() {
    return {
      currentLang: "CN",
      useremail: "",
      userpassword: "",
      emailValue: false,
      passwordValue: false,
      failed: false,
      msg: "",
      options: []
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      axios({
        methods: "get",
        url: "http://" + config.host + "/Cargoorbs/API/version/list",
        headers: { Authorization: "d22f3625-dc91-4688-aa08-dec0c675e8f8" }
      }).then(res => {
        console.log("res", res);
        if (res.data.status === 1) {
          this.options = res.data.data;
          console.log("options", this.options);
        }
      });
    },
    getMenu() {
      axios({
        methods: "get",
        url:
          "http://" +
          config.host +
          "/Cargoorbs/API/menu/list" +
          "?version=" +
          this.$refs.truckselect.value,
        headers: { Authorization: "d22f3625-dc91-4688-aa08-dec0c675e8f8" }
      }).then(res => {
        console.log("res", res);
        if (res.data.status === 1) {
          console.log("this.tabList", this.tabList);
          console.log("this.list", this.list);

          // tabList
          this.list = res.data.data.children;

          console.log("this.list", this.list);
          window.localStorage.setItem("menu", JSON.stringify(this.list));
          window.localStorage.setItem(
            "username",
            JSON.stringify(this.useremail)
          );
          // 取 select 下 option 中选中的值存入 localstorage
          let index = this.$refs.truckselect.selectedIndex;
          let text = this.$refs.truckselect.options[index].text;
          window.localStorage.setItem("version", text);
          this.$router.push({
            path: "/"
          });
        }
      });
    },
    changeLang(e) {
      console.log("lang", e.target.dataset.lang);
      // console.log(this.$refs)
      // this.$refs.CN.classList.remove("active");
      // this.$refs.EN.classList.remove("active");
      e.target.classList = "active";

      let lang = e.target.dataset.lang;
      this.currentLang = lang;
    },
    checkEmail: function() {
      var emailValues = this.$refs.uname.value;
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(emailValues)) {
        this.emailValue = true;
      } else {
        this.$refs.emailTip.style.display = "block";
      }
    },
    setEmail() {
      this.$refs.emailTip.style.display = "none";
    },
    setPassword() {
      this.$refs.passwordTip.style.display = "none";
    },
    checkPassword() {
      var passwordValue = this.$refs.upass.value;
      var reg = /^[a-zA-Z0-9]{6,18}$/;
      console.log(reg.test(passwordValue));
      if (reg.test(passwordValue)) {
        this.passwordValue = true;
      } else {
        this.$refs.passwordTip.style.display = "block";
      }
    },
    login(e) {
      e.preventDefault();
      this.failed = false;
      if (this.emailValue && this.passwordValue) {
        axios({
          method: "post",
          url: "http://" + config.host + "/Cargoorbs/API/Login",
          data: {
            email: this.useremail,
            password: this.userpassword
          },
          headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
        }).then(res => {
          console.log("res2222222222222222222222", res);
          if (res.data.status === 1) {
            console.log("登录成功");
            this.getMenu();
          } else {
            this.failed = true;
            this.msg = res.data.msg;
          }
        });
      } else if (!this.emailValue) {
        this.$refs.emailTip.style.display = "block";
      } else if (!this.passwordValue) {
        this.$refs.passwordTip.style.display = "block";
      }
    }
  }
};
</script>
 <style lang="less" scoped>
button {
  outline: none;
  border: none;
  margin-bottom: 20px;
}
</style>
 