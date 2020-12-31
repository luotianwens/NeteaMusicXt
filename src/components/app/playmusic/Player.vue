<template>
  <transition class="slide">
    <div class="player">
      <scroll class="player-scroll" ref="wrapper" :pull-up-load="true" @pullingUp="pullingUp()">
        <div class="player-content">
          <div class="left">
            <div class="play-bar-support">
              <img src="~assets/img/playmusic/play-bar-support.png" alt />
            </div>
            <div class="play-bar" :class="{bar: !isPlay}">
              <img src="~assets/img/playmusic/play-bar.png" alt />
            </div>
            <div class="music-pic" :class="{rotate: isPlay}">
              <div class="img-wrap">
                <img :src="music.pic" alt />
              </div>
            </div>
          </div>

          <div class="right">
            <div class="top">
              <h2>
                <span>{{music.title}}</span>
              </h2>
            </div>
            <div class="lyric">
              <lyric :lyric="lyric" ref="playerLyric" />
            </div>
          </div>

          <div class="clear"></div>
        </div>
        <div class="play-bottom">
          <recommends :comments="recommends" :totalCom="totalCom" />
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Lyric from './Lyric'
import Scroll from 'components/common/scroll/Scroll'
import Recommends from 'views/musicListDetail/childComps/Recommend'

import { _musicRecommend } from 'network/detail'
export default {
  name: 'Player',
  components: {
    Lyric,
    Scroll,
    Recommends
  },
  data() {
    return {
      isPlay: false,
      limit: 20,
      recommends: [],
      page: 1,
      totalCom: 0
    }
  },
  mounted() {
    this.$refs.wrapper.refresh()
  },
  watch: {
    lyric() {
      if (this.$refs.playerLyric.$refs.wrapper != null) {
        this.$refs.playerLyric.$refs.wrapper.scrollTo(0, 0, 0)
      }
      _musicRecommend(this.music.id, this.limit).then(res => {
        this.recommends = res.data.comments
        this.totalCom = res.data.total
      })
    }
  },
  props: {
    music: {
      type: Object,
      default() {
        return {}
      }
    },
    lyric: {
      type: String,
      default() {
        return ''
      }
    }
  },
  methods: {
    pullingUp: function() {
      _musicRecommend(this.music.id, this.limit * this.page).then(res => {
        this.recommends = res.data.comments
        this.page++
        this.$refs.wrapper.finishPullUp()
        this.refresh()
        console.log('-')
      })
    },
    refresh() {
      this.$refs.wrapper.refresh()
    }
  }
}
</script>

<style scoped>
.player {
  width: 100%;
  height: calc(100vh - 59px - 54px);
  position: absolute;
  top: calc(59px + 54px - 100vh);
  padding: 20px 15%;
  background: linear-gradient(-45deg, #333540, #070708, #333540);
  overflow: hidden;
}

.player-scroll {
  width: 100%;
  height: 405px;
  position: relative;
}

.play-content {
  width: 100%;
  height: 405px;
  position: relative;
}

.play-bottom {
  width: 100%;
  height: 35%;
  margin-top: -10px;
  padding: 0 5%;
}

.left {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}

.play-bar-support {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 3px white;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 30px;
  top: -8px;
  margin: auto;
}

.play-bar-support img {
  width: 100%;
}

.play-bar {
  width: 80px;
  height: 127px;
  position: absolute;
  left: calc(50% - 22px);
  top: -5px;
  z-index: 1;
}

.play-bar img {
  width: 100%;
}

.bar {
  top: 10px;
  transform-origin: 0 0;
  transform: rotate(-25deg);
  transition: all 0.3s;
}

.music-pic {
  width: 270px;
  height: 270px;
  border: 40px solid #0e0e11;
  border-radius: 50%;
  box-shadow: 0 0 10px white;
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  margin: auto;
}

.rotate {
  animation: rotate 20s linear infinite;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  border: 5px solid white;
  border-radius: 50%;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

.right {
  width: 50%;
  height: 100%;
  float: right;
  overflow: hidden;
}

.clear {
  clear: both;
}

.top h2 {
  text-align: center;
}

.lyric {
  padding: 5px 0;
  height: 400px;
  color: #5e6062;
}
</style>