<template>
  <div class="login">
    <div class="back">
      <div class="x">
        <img src="~assets/img/user/x.svg" @click="hiddenLogin()" alt />
      </div>
      <div class="son">
        <img src="~assets/img/user/phone.svg" alt />
      </div>
    </div>
    <div class="main">
      <div>
        <div class="from-item">
          <input type="text" name="phone" id="phone" placeholder="请输入手机号" />
          <p>{{phoneMessage}}</p>
        </div>
        <div class="from-item">
          <input type="password" name="password" id="password" placeholder="请输入账号密码" />
          <p>{{pwdMessage}}</p>
        </div>
        <div class="from-item">
          <input type="submit" value="登陆" class="log" placeholder="请输入账号密码" />
        </div>
        <div class="from-item">
          <div class="register">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      phoneMessage: '',
      password: '',
      pwdMessage: ''
    }
  },
  methods: {
    //隐藏登陆截面
    hiddenLogin() {
      this.$store.commit('hiddenLogin')
    },
    // 登陆
    login() {}
  }
}
</script>

<style scoped>
.login {
  width: 400px;
  height: 540px;
  position: relative;
  z-index: 999;
  top: 0px;
  background: #fafafa;
}

.back {
  width: 100%;
  height: 30%;
  position: relative;
}

.x {
  width: 26px;
  height: 26px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
}

.x img {
  width: 100%;
}

.back .son {
  width: 58px;
  height: 102px;
  position: absolute;
  left: 0;
  right: 20px;
  top: 80px;
  bottom: 0;
  margin: auto;
}

.son img {
  width: 100%;
}

.from-item {
  width: 60%;
  margin: 0px auto;
  padding: 10px 0px 10px 10px;
  color: red;
}

input {
  width: 200px;
  height: 2em;
  padding-left: 5px;
}

p {
  font-size: 13px;
}

.log {
  outline-style: none;
  background: red;
  color: #fff;
  border: 0;
  height: 40px;
  border-radius: 10px;
}

.register {
  color: #333;
  text-align: center;
  margin-right: 25px;
}
</style>