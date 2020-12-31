<template>
  <div class="play-music" v-if="playList!==null">
    <player v-show="isPlayerShow" ref="player" :music="playList[currentIndex]" :lyric="lyric" />
    <div class="top">
      <div
        class="music-top-icon"
        v-if="playList[currentIndex]!==null"
        @mouseenter="isShade=true"
        @mouseleave="isShade=false"
        @click="isPlayerShow = !isPlayerShow"
      >
        <img :src="playList[currentIndex].pic" alt />
        <div class="music-max" v-show="isShade">
          <img src="~assets/img/playmusic/max.svg" alt />
        </div>
      </div>
      <div class="music-top-center">
        <div class="music-title">{{playList[currentIndex].title}}</div>
        <div class="music-artist">{{playList[currentIndex].artist}}</div>
      </div>
    </div>

    <play-music-list
      ref="playmusiclist"
      class="play-music-list st"
      v-show="isMusicList"
      :musicList="musicList"
    />
    <lyric v-show="isLyric" class="play-music-lyric" ref="lyric" :lyric="lyric" />

    <div class="play-music-left">
      <div class="pre" @click="preMusic">
        <img src="~assets/img/playmusic/pre.png" alt />
      </div>
      <div class="play" @click="toggleMusic">
        <img src="~assets/img/playmusic/play.png" v-if="!isPlay" alt />
        <img src="~assets/img/playmusic/play2.png" v-if="isPlay" alt />
      </div>
      <div class="next" @click="nextMusic">
        <img src="~assets/img/playmusic/next.png" alt />
      </div>
    </div>

    <div class="play-music-right">
      <audio
        :src="playList[currentIndex].src"
        autoplay="false"
        ref="audio"
        @timeupdate="audioTimeUpdate()"
        @pause="musicPause()"
        @ended="musicEnded"
        @play="playLoad()"
        @playing="musicPlaying()"
      ></audio>

      <div class="music-pro">
        <div class="currentTime"></div>
        <music-progress ref="music_pro" @childclick="setMusicProgress" />
        <div class="totalTime"></div>
      </div>
      <div class="volumn">
        <div class="volumn-icon" @click="setVolumeMuted">
          <img src="~assets/img/playmusic/volumn.svg" v-if="!isVolumn" alt />
          <img src="~assets/img/playmusic/novolumn.svg" v-if="isVolumn" alt />
        </div>
        <volumn-progress ref="volumn_pro" @childclick="setVolume" />
      </div>
      <div class="icon">
        <div class="schema" @click="toggleSchema()">
          <a href="#" title="顺序播放" v-show="schemaIndex==0">
            <img src="~assets/img/playmusic/sunxubofang.svg" alt />
          </a>
          <a href="#" title="随机播放" v-show="schemaIndex==1">
            <img src="~assets/img/playmusic/suijibofang.svg" alt />
          </a>
          <a href="#" title="单曲循环" v-show="schemaIndex==2">
            <img src="~assets/img/playmusic/danquxunhuan.svg" alt />
          </a>
        </div>
        <div class="music-lyric" @click="isLyric = !isLyric">
          <a href="#" title="歌词" v-show="!isLyric">
            <img src="~assets/img/playmusic/lyric.svg" alt />
          </a>
          <a href="#" title="歌词" v-show="isLyric">
            <img src="~assets/img/playmusic/lyric-click.svg" alt />
          </a>
        </div>
        <div class="music-list" @click="isMusicList =!isMusicList">
          <a href="#" title="歌单">
            <img src="~assets/img/playmusic/list.svg" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicProgress from 'components/common/progress/Progress'
import VolumnProgress from 'components/common/progress/Progress'
import PlayMusicList from './PlayMusicList'
import Lyric from './Lyric'
import Player from './Player'
import { formatData } from 'assets/common/tool'
import { _getLyric, _getMusicUrl } from 'network/detail'
export default {
  name: 'PlayMusic',
  components: {
    MusicProgress,
    VolumnProgress,
    PlayMusicList,
    Lyric,
    Player
  },
  mixins: [],
  data() {
    return {
      isPlay: false,
      isVolumn: false,
      isLyric: false,
      isMusicList: false,
      isShade: false,
      isPlayerShow: false,
      path: '',
      currentIndex: 0,
      schemaIndex: 0,
      currentTime: '00:00',
      duration: '00:00',
      lyric: '',
      playList: [
        {
          title: '情非得以（童声版）',
          artist: '群星',
          index: '0',
          lrc: '',
          src: '',
          // 'http://m7.music.126.net/20201120093846/65f2cd4da46fa8796dacdcad2102cdfb/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
          pic:
            'https://p2.music.126.net/ZDUo6vF_5ykD6E_08HE1kw==/3385396303317256.jpg'
        }
      ],
      musicList: []
    }
  },
  mounted() {
    this.$bus.$on('playMusic', (list, index, path, musicList) => {
      this.playList = []
      this.path = path
      this.playList = list
      this.musicList = musicList

      this.playList = this.playList.sort((a, b) => {
        return a.index - b.index
      })

      this.setCurrentIndex(index)
    })

    this.$bus.$on('PlayMusicListItem', index => {
      this.setCurrentIndex(index)
    })
  },
  watch: {
    isPlayerShow() {
      setTimeout(() => {
        this.$refs.player.refresh()
      }, 500)
    },
    isMusicList() {
      setTimeout(() => {
        this.$refs.playmusiclist.refresh()
      }, 200)
    }
  },
  methods: {
    setCurrentIndex(index) {
      for (let i in this.playList) {
        if (this.playList[i].index == index) {
          this.currentIndex = i
          break
        }
      }
    },
    setMusicProgress(scale) {
      this.$refs.audio.currentTime = scale * this.$refs.audio.duration
    },
    setVolume(volume) {
      this.$refs.audio.volume = volume
    },
    toggleMusic() {
      this.isPlay = !this.isPlay
      if (this.isPlay && this.$refs.audio.readyState == 4)
        this.$refs.audio.play()
      else this.$refs.audio.pause()
    },
    nextMusic() {
      if (this.currentIndex >= this.playList.length - 1) this.currentIndex = 0
      else this.currentIndex++
      this.$refs.audio.src = this.playList[this.currentIndex].src
    },
    preMusic() {
      if (this.currentIndex < 0) this.currentIndex = this.playList.length - 1
      else this.currentIndex--
      this.$refs.audio.src = this.playList.src
    },
    audioTimeUpdate() {
      if (this.$refs.audio !== null) {
        this.currentTime = formatData(
          new Date(this.$refs.audio.currentTime * 1000),
          'mm:ss'
        )
        this.duration = formatData(
          new Date(this.$refs.audio.duration * 1000),
          'mm:ss'
        )

        let scale = this.$refs.audio.currentTime / this.$refs.audio.duration
        let volume = this.$refs.audio.volume
        this.$refs.music_pro.setProgress(scale)
        this.$refs.volumn_pro.setProgress(volume)

        if (this.$refs.audio.currentTime !== null) {
          this.$refs.lyric.scrollLyric(this.$refs.audio.currentTime)
          this.$refs.player.$refs.playerLyric.maxScroll(
            this.$refs.audio.currentTime
          )
        }
      }
    },
    musicPlaying() {
      this.isPlay = true
      this.$bus.$emit(
        'Playing',
        this.playList[this.currentIndex].index,
        this.path
      )
      if (this.$refs.player !== null) this.$refs.player.isPlay = true
    },
    musicPause() {
      this.isPlay = false
      if (this.$refs.player !== null) this.$refs.player.isPlay = false
    },
    musicEnded() {
      switch (this.schemaIndex) {
        case 0:
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++
          break
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length)
          break
        case 2:
          this.$refs.audio.play()
          break
      }
    },
    playLoad() {
      _getLyric(this.playList[this.currentIndex].id).then(res => {
        this.lyric = res.data.lrc.lyric
      })
    },
    toggleSchema() {
      this.schemaIndex >= 2 ? (this.schemaIndex = 0) : this.schemaIndex++
    },
    setVolumeMuted() {
      this.isVolumn = !this.isVolumn
      if (this.isVolumn) {
        this.$refs.audio.muted = true
        this.setVolume(0)
      } else {
        this.$refs.audio.muted = false
        this.setVolume(1)
      }
    }
  }
}
</script>

<style scoped>
.play-music {
  width: 100%;
  height: 59px;
  background: #212124;
  position: relative;
  z-index: 3;
  bottom: 0;
}

/* top部分 */
.top {
  width: 15%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 59px;
  display: flex;
  background: #191b1f;
}

.play-music-list {
  position: absolute;
  right: 0;
  bottom: 59px;
}

.play-music-lyric {
  width: 460px;
  height: 30px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 999;
  margin: auto;
  background: rgba(0, 0, 0, 0.3);
}

.music-top-icon {
  height: 100%;
}

.music-top-icon img {
  height: 100%;
}

.music-max {
  position: relative;
  bottom: 64px;
  z-index: 4;
  width: 59px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.music-max img {
  opacity: 0.5;
}

.music-top-center {
  width: 100px;
  font-size: 13px;
  position: relative;
  left: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.music-title {
  position: absolute;
  top: 0;
}

.music-artist {
  position: absolute;
  bottom: 0;
}

/* end top */
.play-music-left {
  display: flex;
  float: left;
  width: 15%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}

.play-music-left div {
  cursor: pointer;
}

.play-music-left .play img {
  width: 55px;
  height: 55px;
}

.play-music-right {
  width: 85%;
  height: 100%;
  float: right;
}

.play-music-right .music-pro {
  width: 70%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  text-align: center;
}

.music-pro .currentTime,
.music-pro .totalTime {
  width: 60px;
}

.music-pro .music-pro-progress {
  flex: 1;
}

.play-music-right .volumn {
  width: 10%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}

.volumn-icon img {
  width: 15px;
  margin-right: 10px;
}

.vol-img {
  width: 21px !important;
}

/* 选择播放顺序 */
.play-music-right .icon {
  padding: 0px 20px;
  width: 20%;
  height: 100%;
  margin-top: 3px;
  float: left;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.icon .schema {
  width: 30px;
}

.icon .schema img {
  width: 20px;
  height: 20px;
}

.icon .schema img:nth-child(2) {
  width: 18px;
  height: 18px;
}

.music-lyric {
  width: 20px;
}

.music-lyric img {
  width: 100%;
}

.music-list {
  width: 20px;
}

.music-list img {
  width: 100%;
}
</style>