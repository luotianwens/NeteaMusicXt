<template>
  <div class="search-list">
    <scroll ref="wrapper" :data="musiclist" class="search-scroll">
      <div class="title" v-if="this.key !== '' ">
        搜索
        <span>“{{key}}”</span>,找到
        <span>{{musiclist.length}}</span>首单曲
      </div>

      <div class="bar">
        <div
          class="bar-item"
          v-for="(item, index) in list"
          :key="index"
          :class="{action: currentIndex == index}"
          @click="currentIndex = index; isShow = item"
        >{{item}}</div>
      </div>
      <music-item @musicItemClick="musicItemClick" :musiclist="musiclist" v-show="isShow === '单曲'"></music-item>
      <artist-item :artistslist="artistslist" v-show="isShow==='歌手'" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import MusicItem from 'views/musicListDetail/childComps/MusicItem'
import ArtistItem from './childComps/ArtistItem'

import { distinct } from 'assets/common/tool'
import { indexMixin } from 'views/musicListDetail/indexMixin'
import { _getSongsDetail, SongDetail } from 'network/detail'
import { _Search } from 'network/search'

export default {
  name: 'SearchList',
  components: {
    Scroll,
    MusicItem,
    ArtistItem
  },
  mixins: [indexMixin],
  data() {
    return {
      key: '',
      artistslist: [],
      mlist: [],
      list: ['单曲', '歌手'],
      currentIndex: 0,
      isShow: '单曲',
      musiclist: [],
      exit: null
    }
  },
  watch: {
    $route(to, from) {
      this.loadDate()
    }
  },
  created() {
    this.loadDate()
  },
  methods: {
    loadDate: function() {
      this.key = this.$route.params.key
      this.musiclist = []
      if (this.key != null && this.key != '') {
        _Search(this.key).then(res => {
          let list = res.data.result.songs
          for (let i in list) {
            this.artistslist.push(list[i].artists[0])
            this.mlist.push(list[i].id)
            if (i == list.length - 1) {
              for (let i of this.mlist) {
                _getSongsDetail(i).then(res => {
                  let song = new SongDetail(res.data.songs)
                  this.musiclist.push(song)
                })
              }
              this.mlist = []
              this.artistslist = distinct(this.artistslist)
            }
          }
        })
      }
    },
    musicItemClick: function(index) {
      this.PlayMusic(index)
    }
  }
}
</script>

<style scoped>
.search-list {
  width: 100%;
  height: 100%;
  padding: 10px 40px;
}

.search-scroll {
  height: 100%;
  overflow: hidden;
}

.title {
  font-size: 14px;
  padding: 20px 0;
}

.title span {
  color: #2e6bb0;
}

.bar {
  width: 100%;
  height: 49px;
  line-height: 49px;
  display: flex;
  border-bottom: 1px solid #1c1e23;
  margin-top: 15px;
}

.bar-item {
  padding: 0 20px;
  color: white;
}

.action {
  color: #b82525;
  border-bottom: 3px solid #b82525;
}
</style>