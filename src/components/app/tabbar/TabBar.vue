<template>
  <div class="tabbar">
    <div class="logo">
      <img src="~assets/img/app/logo.svg" alt @click="backHome()" />
      <div class="title" @click="backHome()">小天音乐</div>
      <div class="back" @click="back()">
        <img src="~assets/img/app/back.svg" alt />
      </div>
    </div>

    <music-search />
    <div class="content">
      <div class="login" @click="showLogin()">
        <div class="profile">
          <img v-if="this.$store.state.user === null" src="~assets/img/app/profile-o.svg" alt />
          <img :src="getImage" alt />
        </div>
        <div>{{getUserName}}</div>
      </div>

      <div class="right">
        <div>
          <a href="#" title="最小化">
            <img src="~assets/img/app/min.svg" alt />
          </a>
        </div>
        <div>
          <a href="#" title="还原">
            <img src="~assets/img/app/reset.svg" alt />
          </a>
        </div>
        <div>
          <a href="#" title="退出">
            <img src="~assets/img/app/x.svg" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicSearch from '../search/MusicSearch'
export default {
  name: 'TabBar',
  components: {
    MusicSearch
  },
  data() {
    return {
      image: '~assets/img/app/profile-o.svg',
      state: '未登录'
    }
  },
  computed: {
    getImage() {
      if (this.$store.state.user === null) return this.image

      return (this.image =
        this.$store.state.user && this.$store.state.user.profile.avatarUrl)
    },
    getUserName() {
      if (this.$store.state.user === null) return this.state
      return (this.state =
        this.$store.state.user && this.$store.state.user.profile.nickname)
    }
  },
  methods: {
    showLogin() {
      this.$store.commit('showLogin')
    },
    backHome() {
      if (this.$router.path == '/discover') return
      this.$router.push('/discover')
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.tabbar {
  width: 100%;
  height: 54px;
  background-color: #202023;
}

.logo {
  cursor: pointer;
  height: 100%;
  width: 15%;
  line-height: 100%;
  display: flex;
  float: left;
  align-items: center;
  position: relative;
}

.logo img {
  margin: 0px 10px;
  height: 60%;
}

.back {
  display: inline-block;
  height: 26px;
  position: absolute;
  right: 5px;
  opacity: 0.6;
}

.back:hover {
  opacity: 1;
}

.back img {
  height: 100% !important;
}

.content {
  float: right;
  height: 100%;
}

.login {
  cursor: pointer;
  height: 100%;
  float: left;
  margin-right: 50px;
  display: flex;
  align-items: center;
}

.profile {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  /* background-color: #fff; */
  margin-right: 10px;
}

.profile img {
  width: 100%;
  border-radius: 50%;
}

.right {
  height: 100%;
  display: flex;
  align-items: center;
}

.right div {
  flex: 1;
  margin-right: 15px;
  opacity: 0.6;
}

.right div:hover {
  opacity: 1;
}

.right div img {
  width: 22px;
}
</style>
