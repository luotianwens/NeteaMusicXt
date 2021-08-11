<template>
  <div class="artist-list">
    <div class="category">
      <div class="area">
        语种:
        <span
          v-for="(item, index) in area"
          :key="index"
          :class="{action: areaIndex == index}"
          @click="getArea(index)"
        >{{item.name}}</span>
      </div>
      <div class="type">
        分类:
        <span
          v-for="(item, index) in songs"
          :key="index"
          :class="{action: typeIndex == index}"
          @click="getType(index)"
        >{{item.name}}</span>
      </div>
    </div>
    <scroll
      ref="wrapper"
      class="artist-scroll"
      :data="artists"
      :pull-up-load="true"
      @pullingUp="pullingUp()"
      @scroll="lazyImgload()"
    >
      <artist-list ref="artistlist" :artists="artists" />
    </scroll>
  </div>
</template>
 
<script>
import { imgloadMixin } from 'components/common/imgloadMixin'
import Scroll from 'components/common/scroll/Scroll'
import ArtistList from '../childComps/ArtistList'
import { _getArtist } from 'network/discover'
export default {
  name: 'Artist',
  data() {
    return {
      area: [
        { value: -1, name: '全部' },
        { value: 7, name: '华语' },
        { value: 96, name: '欧美' },
        { value: 8, name: '日本' },
        { value: 16, name: '韩国' },
        { value: 0, name: '其他' }
      ],
      songs: [
        { value: -1, name: '全部' },
        { value: 1, name: '男歌手' },
        { value: 2, name: '女歌手' },
        { value: 3, name: '乐队' }
      ],
      limit: 16,
      areaIndex: 0,
      typeIndex: 0,
      page: 1,
      artists: [],
      imgData: {}
    }
  },
  components: {
    Scroll,
    ArtistList
  },
  mixins: [imgloadMixin],
  mounted() {
    this.getArtist()
    this.imgData = this.$refs.artistlist
  },
  methods: {
    getArtist() {
      _getArtist(
        this.area[this.areaIndex].value,
        this.songs[this.typeIndex].value,
        this.limit
      ).then(res => {
        this.artists = res.data.artists
      })
    },
    getType(index) {
      this.typeIndex = index
      this.getArtist()
    },
    getArea(index) {
      this.areaIndex = index
      this.getArtist()
    },
    pullingUp() {
      this.getArtistPullup()
    },
    getArtistPullup() {
      _getArtist(
        this.area[this.areaIndex].value,
        this.songs[this.typeIndex].value,
        this.limit * this.page
      ).then(res => {
        this.artists = res.data.artists
        this.page++
      })
      this.$refs.wrapper.refresh()
      this.$refs.wrapper.finishPullUp()
    }
  }
}
</script>

<style scoped>
.artist-list {
  width: 650px;
  height: 100%;
}

.category {
  height: 40px;
  margin-bottom: 10px;
}

.area,
.type {
  font-size: 15px;
  color: #e2e2e2;
}

.area span,
.type span {
  font-size: 14px;
  margin-left: 5px;
}

.action {
  color: #a80b0c;
}

.artist-scroll {
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
}
</style>