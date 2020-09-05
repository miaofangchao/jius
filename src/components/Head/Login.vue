<template>
  <div class="login">
    <form action="http://www.jius.net/Login.asp?Action=Log" ref="login" method="post" name="thisForm">
      <div class="lgtitle">
        <div class="Tback" v-tap="{methods:closeLogin}" />登录
      </div>
      <div class="icenter">
        <div class="us_reg">
          <ul>
            <li>
              <input
                id="UserName"
                class="tipInput"
                type="text"
                placeholder="请输入用户名"
                name="UserName"
                ref="loginInput">
            </li>
            <li style="border-bottom: none;">
              <input id="upwd" class="tipInput" type="Password" placeholder="请输入密码" name="PassWord" >
            </li>
            <select name="Cookie" style="display:none">
              <option value="0">不记录</option>
              <option value="1" selected>一周</option>
              <option value="2">一月</option>
              <option value="3">一年</option>
            </select>
          </ul>
        </div>
        <div id="9928mainlogin" class="zcmenu" v-tap="{methods:login}">立即登录</div>
        <div
          style="text-align: center;font-size:90%;line-height: 24px;color: black;"
        >（注：如已注册有酒商网账号，可直接登录）</div>
        <div class="zctzbtn" v-tap="{methods:jumpRegister}">免费注册</div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      let fromData = new FormData(this.$refs.login)
      console.log(fromData.get("UserName"))
      fromData.set("UserName",escape(fromData.get("UserName")))
      console.log(fromData.get("UserName"))
      console.log(fromData.get("PassWord"))
      this.$refs.login.submit();
    },
    jumpRegister() {
      this.$emit("jumpRegister");
    },
    closeLogin() {
      this.$emit("closeLogin");
    },
  },
};
</script>

<style>
.login {
  width: 90%;
  position: fixed;
  left: 5%;
  top: 10%;
  z-index: 999;
  background: white;
  border-radius: 5px;
  padding-bottom: 15px;
  font-size: 120%;
}

.lgtitle {
  background: #e5383b;
  line-height: 42px;
  width: 100%;
  font-size: 130%;
  color: #fff;
  text-align: center;
  margin: 0 auto;
  border-radius: 5px;
}

.us_reg {
  width: 94%;
  border: #e8e5e5 1px solid;
  border-radius: 6px;
  background: #fff;
  margin: 20px auto 0 auto;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.us_reg li {
  line-height: 48px;
  border-bottom: #e8e5e5 1px solid;
  padding-left: 10px;
}

.tipInput {
  width: 95%;
  border: none;
  outline: none;
  height: 40px;
  font-size: 100%;
}

.zcmenu {
  width: 94%;
  margin: 20px auto 0 auto;
  border-radius: 4px;
  background: #e54042;
  line-height: 40px;
  text-align: center;
  color: #fff;
}

.zctzbtn {
  width: 94%;
  margin: 10px auto 0 auto;
  border-radius: 4px;
  border: #e4e2e2 1px solid;
  line-height: 38px;
  text-align: center;
  color: black;
}
</style>
