<template>
  <div class="container">
    <div class="box">
      <div id="tittle">
        <div class="language">
          <a href="#" :class="{active:currentLang=='CN'}" @click="changeLang" data-lang="CN">中&nbsp;|</a>
          <a href="#" :class="{active:currentLang=='EN'}" @click="changeLang" data-lang="EN">EN</a>
        </div>
        <h2 align="center">
          <span v-if="currentLang=='CN'">注  册</span>
          <span v-else-if="currentLang=='EN'">Register</span> 
        </h2>
      </div>
      <label>
        <p class="input_box">
          <span v-if="currentLang=='CN'">
            邮 箱:
          </span>
          <span v-else-if="currentLang=='EN'">
            Email:
          </span>
          <input
            ref="uname"
            @blur="checkEmail"
            @focus="setEmail"
            v-model="useremail"
            type="text"
            :placeholder="currentLang=='CN'?'请输入邮箱':'Please enter email'"
          />
        </p>
      </label>
      <div style="height:40px">
        <p style="display:none;color:red;padding-left:140px" ref="emailErr">
          <span v-if="currentLang=='CN'">
            邮箱格式不正确
          </span>
          <span v-else-if="currentLang=='EN'" style="margin-right:60px">
            Incorrect mailbox format
          </span>
        </p>
      </div>
      <label>
        <p class="input_box">
          <span v-if="currentLang=='CN'">
            密 码:
          </span>
          <span v-else-if="currentLang=='EN'">
            Password:
          </span>
          <input
            v-model="userpassword"
            ref="upass"
            @blur="checkPassword"
            @focus="setPassword"
            type="password"
            :placeholder="currentLang=='CN'?'请输入密码':'Please enter password'"
          />
        </p>
      </label>
      <div style="height:40px">
        <p style="display:none;color:red;padding-left:140px;padding-right:90px" ref="passwordTip">
          <span v-if="currentLang=='CN'">
            密码必须6-18位，包含字符，数字和符号
          </span>
          <span v-else-if="currentLang=='EN'">
            Passwords must be 6-18 bits long and contain characters, Numbers, and symbols
          </span>
        </p>
      </div>
      <label>
        <p class="input_box">
          <span v-if="currentLang=='CN'">
            确认密码:
          </span>
          <span v-else-if="currentLang=='EN'">
            Confirm   password:
          </span>
          <input ref="repass" style="height:22px" @change="confirmPassword" type="password" :placeholder="currentLang=='CN'?'请输入密码':'Please enter password'" />
        </p>
      </label>
      <div class="error_box" style="height:20px">
        <p style="display:none;color:red" ref="error_box">
          <span v-if="currentLang=='CN'">
            两次密码不一致，请重新输入
          </span>
          <span v-else-if="currentLang=='EN'">
            The password is not consistent. Please re-enter it
          </span>
        </p>
      </div>
      <div class="button">
        <button class="button_login" @click="register">
          <span v-if="currentLang=='CN'">
            立即注册
          </span>
          <span v-else-if="currentLang=='EN'">
            Register now
          </span>
        </button>
      </div>
      <div style="height:30px">
        <h4 v-if="success" class="successBox">
          <span
            style="color:green;margin-right:10px"
            class="glyphicon glyphicon-ok"
            aria-hidden="true"
          ></span>
          <p>
            <span v-if="currentLang=='CN'">
              注册成功,即将跳转到登录界面...
            </span>
            <span v-if="currentLang=='EN'">
              Registration successful, jump to the login screen...
            </span>
          </p>
        </h4>
        <h4 v-if="failed" class="successBox">
          <span
            style="color:red;margin-right:10px"
            class="glyphicon glyphicon-remove"
            aria-hidden="true"
          ></span>
          <p>{{msg}}</p>
        </h4>
      </div>
      <p class="bottom_link">
        <nuxt-link to="/login">
        <span v-if="currentLang=='CN'">
            已有账号点击登录
        </span>
        <span v-else-if="currentLang=='EN'">
          Existing account click login
        </span>
       
        </nuxt-link>
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "../common/api";
export default {
  layout: 'empty',
  data() {
    return {
      currentLang:'CN',
      useremail: "",
      userpassword: "",
      emailValue: false,
      passwordValue: false,
      success: false,
      failed: false,
      msg: ""
    };
  },
  methods: {
    changeLang(e) {
      console.log("lang", e.target.dataset.lang);
      // console.log(this.$refs)
      // this.$refs.CN.classList.remove("active");
      // this.$refs.EN.classList.remove("active");
      e.target.classList = "active";

      let lang = e.target.dataset.lang;
      this.currentLang = lang

    },
    checkEmail: function() {
      console.log("changeevn");
      var emailValues = this.$refs.uname.value;
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(emailValues)) {
        this.emailValue = true;
      } else {
        this.$refs.emailErr.style.display = "block";
      }
    },

    checkPassword() {
      var passwordValues = this.$refs.upass.value;
      var reg = /^[a-zA-Z0-9]{6,18}$/;
      if (reg.test(passwordValues)) {
        this.passwordValue = true;
      } else {
        this.$refs.passwordTip.style.display = "block";
      }
    },
    setEmail() {
      this.$refs.emailErr.style.display = "none";
    },
    setPassword() {
      this.$refs.passwordTip.style.display = "none";
    },
    confirmPassword() {
      var passwordValues = this.$refs.upass.value;
      var getpasswordValue = this.$refs.repass.value;
      if (passwordValues !== getpasswordValue) {
        this.$refs.error_box.style.display = "block";
      }
    },
    register() {
      if (this.passwordValue && this.emailValue) {
        axios({
          method: "post",
          url: "http://" + config.host + "/Cargoorbs/API/Reg",
          data: {
            email: this.useremail,
            password: this.userpassword
          },
          headers: { Authorization: "cb401ee5-2b5a-4c44-996d-71679e77cfdd" }
        }).then(res => {
          console.log("res", res);
          if (res.data.status === 1) {
            this.success = true;
            setTimeout(() => {
              window.location = "/login";
            }, 2000);
            console.log("this.success", this.success);
          } else {
            this.failed = true;
            this.msg = res.data.msg;
          }
        });
      } else if (!this.emailValue) {
        this.$refs.emailErr.style.display = "block";
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
  margin-bottom: 0;
}

</style>
