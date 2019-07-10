<template>
  <div class="box">
    <div id="tittle">
      <h2 align="center">注册</h2>
    </div>
    <p class="input_box">
      账户：
      <input id="uname" type="text" placeholder="请输入您的昵称" />
    </p>
    <p class="input_box">
      密码：
      <input id="upass" type="password" placeholder="请设置您的密码" />
    </p>
    <p class="input_box">
      验证：
      <input id="upass1" type="password" placeholder="请再次输入密码" />
    </p>
    <p class="input_box">
      邮箱：
      <input id="youxiang" type="password" placeholder="请输入您的邮箱" />
    </p>

    <div class="error_box">
      <br />
    </div>
    <div class="button">
      <button class="button_login">立即注册</button>
    </div>
    <p align="center">
        <nuxt-link to="/login">已有账号请登录</nuxt-link>
    </p>
  </div>
</template>
<script>
export default {
  layout: "login",
  data() {
      return {}
  },
  methods: {
    // foLogin() {
    //   var oUname = document.getElementById("uname");
    //   var oError = document.getElementById("error_box");
    //   var oUpass = document.getElementById("upass");
    //   var oUpass1 = document.getElementById("upass1");
    //   var isError = true;
    //   oError.innerHTML = "<br>";

    //   if (oUname.value.length < 6 || oUname.value.length > 12) {
    //     oError.innerHTML = "用户名要6-12位";
    //     isError = false;
    //     return;
    //   } else if (
    //     oUname.value.charCodeAt(0) >= 48 &&
    //     oUname.value.charCodeAt(0) <= 57
    //   ) {
    //     oError.innerHTML = "首位不能为数字";
    //     return;
    //   } else
    //     for (var i = 0; i < oUname.value.length; i++) {
    //       if (
    //         oUname.value.charCodeAt(i) < 48 ||
    //         (oUname.value.charCodeAt(i) > 57 &&
    //           oUname.value.charCodeAt(i) < 58 &&
    //           oUname.value.charCodeAt(i) > 97)
    //       ) {
    //         oError.innerHTML = "只能为数字和字母";
    //         return;
    //       }
    //     }
    //   if (oUpass.value.length < 6 || oUpass.value.length > 12) {
    //     oError.innerHTML = "密码要6-12位";
    //     isError = false;
    //     return;
    //   } else if (oUname.value != oUpass1.value) {
    //     oError.innerHTML = "设置密码和验证密码不一致";
    //     return;
    //   }
    // }
  }
};
</script>
<style lang="less" scoped>
button {
  outline: none;
  border: none;
}
</style>
