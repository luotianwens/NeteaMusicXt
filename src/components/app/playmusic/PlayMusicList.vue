<template>
  <div class="play-music-list" v-if="musicList.length !== 0">
    <div class="top">
      <div class="title">
        <span class="active">播放列表</span>
        <span>历史记录</span>
      </div>
      <div class="exist" @click="exist()">
        <img src="~assets/img/app/x.svg" alt />
      </div>
      <div class="clear"></div>
    </div>
    <scroll class="play-music-list-scroll" ref="wrapper">
      <div class="list">
        <music-item :musiclist="musicList" />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import MusicItem from 'views/musicListDetail/childComps/MusicItem'
export default {
  name: 'PlayMusicList',
  props: ['musicList'],
  components: {
    Scroll,
    MusicItem
  },
  created() {},
  methods: {
    exist() {
      this.$parent.isMusicList = false
    },
    refresh() {
      this.$refs.wrapper.refresh()
    }
  }
}
</script>

<style scoped>
.play-music-list {
  width: 720px;
  height: 520px;
  background: #191b1f;
  box-shadow: 0 0 1px #fff;
}

.top {
  width: 100%;
  /* height: 100%; */
  position: relative;
  background: #282a2f;
}

.top .title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  align-content: center;
  color: #c2c2c2;
}

.top .title span {
  display: inline-block;
  font-size: 10px;
  line-height: 25px;
  height: 25px;
  margin-left: 1px;
  padding: 0 8px;
  border: 1px solid #a2a2a2;
  border-radius: 3px;
}

.active {
  background: #666;
  color: white;
}

.top .exist {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 2px 3px 0 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.top .exist img {
  width: 100%;
}

.clear {
  clear: both;
}

.play-music-list-scroll {
  height: calc(100% - 40px);
  overflow: hidden;
}
</style>