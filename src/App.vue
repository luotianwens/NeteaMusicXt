<template>
  <div id="app">
    <tab-bar></tab-bar>
    <left-menu></left-menu>
    <Main></Main>
    <play-music></play-music>
  </div>
</template>

<script>
import TabBar from 'components/app/tabbar/TabBar'
import LeftMenu from 'components/app/LeftMenu'
import Main from 'components/app/Main'
import PlayMusic from 'components/app/playmusic/PlayMusic'
export default {
  name: 'App',
  components: {
    TabBar,
    LeftMenu,
    Main,
    PlayMusic
  }
}
</script>
<style>
/* @import url('./assets/css/base.css');
@import url('./assets/css/play.css'); */
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  background: #16181c;
  color: #fff;
}
</style>
