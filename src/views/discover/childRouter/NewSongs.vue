<template>
  <div class="songs-list">
    <scroll
      ref="wrapper"
      class="list-wrapper"
      :data="musiclist"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="getTopSongs()"
      @scroll="lazyImgload()"
    >
      <div class="category">
        <span
          v-for="(item, index) in area"
          :key="index"
          :class="{action: currentIndex==index }"
          @click="enterIndex(index)"
        >{{item.name}}</span>
      </div>
      <div class="content">
        <table cellspacing="0">
          <tr v-for="(item, index) in musiclist" :key="index">
            <td>{{setSerial(index)}}</td>
            <td @dblclick="enterPlay(index)" :class="{play: playIndex== index}">
              <img ref="item" :data-src="item.pic" src="~assets/img/app/loading.svg" alt />
              <div class="play-button">
                <img
                  @click="playIndex = null"
                  v-if="playIndex == index"
                  src="~assets/img/playmusic/currentplay.svg"
                  alt
                />
              </div>
            </td>
            <td>{{item.name}}</td>
            <td>{{item.song}}</td>
            <td>{{item.album}}</td>
            <td>{{item.time}}</td>
          </tr>
        </table>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { _getTopSongs } from 'network/discover'
import { _getSongsDetail, SongDetail } from 'network/detail'
import { tableMixin } from 'views/musicListDetail/childComps/tableMixin'
import { imgloadMixin } from 'components/common/imgloadMixin'
import { indexMixin } from 'views/musicListDetail/indexMixin'
export default {
  name: 'NewSongs',
  data() {
    return {
      area: [
        { value: 0, name: '全部' },
        { value: 7, name: '华语' },
        { value: 96, name: '欧美' },
        { value: 8, name: '日本' },
        { value: 16, name: '韩国' }
      ],
      currentIndex: 0,
      playIndex: null,
      musiclist: [],
      page: 1,
      list: []
    }
  },
  components: {
    Scroll
  },
  mixins: [tableMixin, imgloadMixin, indexMixin],
  created() {
    this.$wait(2000).then(() => this.getTopSongs())
  },
  mounted() {
    // setTimeout(() => {
    //   this.$refs.wrapper.scrollTo(0, -1, 2000)
    // }, 1000)
    this.$wait(1000).then(() => {
      this.$refs.wrapper.scrollTo(0, -1, 2000)
    })
  },
  methods: {
    getTopSongs() {
      _getTopSongs(this.area[this.currentIndex].value).then(res => {
        let musiclist = []
        this.list = res.data.data.slice(0, this.page * 30)
        for (let i of this.list) {
          _getSongsDetail(i.id).then(res => {
            let song = new SongDetail(res.data.songs)
            musiclist.push(song)
          })
        }

        this.musiclist = musiclist
        this.list = []
        this.page++
        this.$refs.wrapper.finishPullUp()
      })
    },
    enterIndex(index) {
      this.currentIndex = index
      this.page = 1
      this.getTopSongs()
    },
    enterPlay(index) {
      this.playIndex = index
      this.PlayMusic(index)
    }
  }
}
</script>

<style scoped>
.songs-list {
  width: 100%;
  height: 100%;
}

.list-wrapper {
  height: 100%;
  overflow: hidden;
}

.category {
  height: 30px;
  margin-bottom: 5px;
  font-size: 13px;
  color: #878787;
}

.category span {
  margin-left: 5px;
}

.action {
  color: #d0d0d0;
  font-size: 14px;
}

.content {
  width: 100%;
  height: calc(100% - 30px);
  color: #d0d0d0;
  font-size: 13px;
}

.content tr {
  display: inline-grid;
  grid-template-columns: 5% 7% 40% 13% 30% 5%;
  align-items: center;
  width: 100%;
  height: 50px;
}

.content tr td:nth-child(1) {
  padding-left: 10px;
}

.content tr td:nth-child(2) {
  justify-self: center;
  position: relative;
  z-index: 9;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}

.play::before {
  content: '';
  width: 43px;
  height: 43px;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
}

.content tr:nth-child(odd) {
  background-color: #1a1c20;
}

.content tr:hover {
  background-color: #1a1c20;
}

.content table img {
  display: block;
  width: 43px;
  height: 43px;
  margin: auto 0;
  border-radius: 5px;
}

.content .play-button img {
  width: 28px;
  opacity: 0.9;
}
</style>