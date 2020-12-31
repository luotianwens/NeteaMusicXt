<template>
  <div class="main">
    <loading v-show="isLoading"></loading>
    <keep-alive include="AllMV">
      <router-view />
    </keep-alive>
    <Login class="login" v-show="isLogin" />
  </div>
</template>

<script>
import Login from './user/Login'
import Loading from 'components/common/Loading'
import DiscoverMusic from '@/views/discover/DiscoverMusic'
export default {
  name: 'Main',
  components: {
    Login,
    Loading,
    DiscoverMusic
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    isLogin() {
      return this.$store.getters.getShowLogin
    }
  }
}
</script>

<style scoped>
.main {
  width: 85%;
  height: calc(100% - 54px - 59px);
  margin-left: 15%;
  position: relative;
}

.login {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: atuo;
}
</style>