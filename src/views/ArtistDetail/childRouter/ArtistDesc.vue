<template>
  <div class="artist-desc">
    <div class="desc-item">
      <div class="header">简介</div>
      <div class="content">{{artistDesc}}</div>
    </div>
    <div class="desc-item" v-for="(item, index) in desc" :key="index">
      <div class="header">{{item.ti}}</div>
      <div class="content">
        <p v-for="(item, index) in item.txt" :key="index">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { _getArtistDescDetail, _getArtistDesc } from 'network/artist'
export default {
  name: 'ArtistDesc',
  data() {
    return {
      artist: [],
      desc: [],
      artistDesc: null
    }
  },
  async mounted() {
    this.artist = this.$store.state.artist
    let introduction = await _getArtistDescDetail(this.artist.id)
    this.desc = introduction.data.introduction.map(item => {
      return { ti: item.ti, txt: item.txt.split('\n') }
    })

    let data = await _getArtistDesc(this.artist.id)
    this.artistDesc = data.data.briefDesc
    console.log(this.desc)
  }
}
</script>

<style scoped>
.artist-desc {
  width: 100%;
  height: 100%;
  padding: 10px 30px;
}

.desc-item {
  margin-bottom: 50px;
}

.artist-desc .header {
  font-size: 18px;
  font-weight: 900;
  color: #e2e2dc;
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(240, 240, 240, 0.3);
}

.artist-desc .content {
  font-size: 13px;
  text-indent: 26px;
  line-height: 18px;
  letter-spacing: 2px;
  color: #e2e2dc;
  padding-top: 5px;
}
</style>