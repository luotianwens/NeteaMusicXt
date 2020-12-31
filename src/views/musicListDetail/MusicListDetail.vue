<template>
  <div class="detail">
    <scroll class="detail-scroll" ref="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
      <detail-base-info :baseInfo="baseInfo" />
      <detail-bar :list="list" @detailBarClick="detailBarClick" />
      <music-item v-show="isShow=='music'" :musiclist="musiclist" @musicItemClick="PlayMusic" />
      <recommends v-show="isShow=='recommend'" :comments="recommends" :totalCom="totalCount" />
      <music-collect v-show="isShow=='collect'" :subers="subers" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailBar from './childComps/DetailBar'
import MusicItem from './childComps/MusicItem'
import Recommends from './childComps/Recommend'
import MusicCollect from './childComps/MusicCollect'

import {
  _getMusicListDetail,
  BaseInfo,
  _getSongsDetail,
  SongDetail,
  _getRecommends,
  _getSub
} from 'network/detail'

import { indexMixin } from './indexMixin'
export default {
  name: 'MusicListDeatil',
  mixins: [indexMixin],
  data() {
    return {
      id: null,
      baseInfo: null,
      musicListDetail: null,
      list: [],
      musiclist: [],
      isShow: 'music',
      recommends: [],
      limit: 50,
      page: 1,
      totalCount: 0,
      subers: []
    }
  },
  components: {
    Scroll,
    DetailBaseInfo,
    DetailBar,
    MusicItem,
    Recommends,
    MusicCollect
  },
  created() {
    this.id = this.$route.params.id
    _getMusicListDetail(this.id).then(res => {
      this.musicListDetail = res.data
      this.baseInfo = new BaseInfo(this.musicListDetail.playlist)
      this.list = [
        '歌曲列表',
        `评论(${this.musicListDetail.playlist.commentCount})`,
        '收藏者'
      ]
      for (let i of this.musicListDetail.playlist.trackIds) {
        _getSongsDetail(i.id).then(res => {
          let song = new SongDetail(res.data.songs)
          this.musiclist.push(song)
        })
      }
    })

    _getRecommends(this.id, this.limit).then(res => {
      this.recommends = res.data.comments
      this.totalCount = res.data.total
    })

    _getSub(this.id, this.limit).then(res => {
      this.subers = res.data.subscribers
    })
  },
  methods: {
    detailBarClick: function(str) {
      this.isShow = str
    },
    pullingUp: function() {
      _getRecommends(this.id, this.limit * this.page).then(res => {
        this.recommends = res.data.comments
        this.page++
        this.$refs.scroll.finishPullUp()
      })
      _getSub(this.id, this.limit * this.page).then(res => {
        this.subers = res.data.subscribers
        this.page++
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 35px 35px 0 35px;
  background: #16181c;
  color: #dcdde4;
  overflow: hidden;
}

.detail-scroll {
  height: 100%;
}
</style>