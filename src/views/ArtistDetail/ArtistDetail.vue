<template>
  <div class="artist-detail">
    <scroll ref="wrapper" class="artist-wrapper" @scroll="refresh()" :pull-up-load="true">
      <artist-base-info :desc="artistDesc" :base-info="getArtistBaseInfo" />
      <artist-bar ref="artistBar" />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import ArtistBaseInfo from './childComps/ArtistBaseInfo'
import ArtistBar from './childComps/ArtistBar'
import ArtistAlbumn from './childRouter/ArtistAlbumn'
import { _getArtistDesc } from 'network/artist'

export default {
  name: 'ArtistListDetail',
  data() {
    return {
      artist: [],
      artistDesc: []
    }
  },
  async mounted() {
    this.artist = this.$store.state.artist
    // console.log(this.artist) //albumSize、musicSize
    // _getArtistDesc(this.artist.id).then(res => {
    //   this.artistDesc = res.data.briefDesc
    // })
    let data = await _getArtistDesc(this.artist.id)
    this.artistDesc = data.data.briefDesc
    // this.artistDesc = await _getArtistDesc(this.artist.id).data.briefDesc
    this.$wait(1500).then(() => this.$refs.wrapper.refresh())
  },
  components: {
    Scroll,
    ArtistBaseInfo,
    ArtistBar,
    ArtistAlbumn
  },
  computed: {
    getArtistBaseInfo() {
      return this.artist
    }
  },
  methods: {
    refresh() {
      this.$refs.wrapper.refresh()
    }
  }
}
</script>
 
<style scoped>
.artist-detail {
  padding: 20px 15px 0;
  height: 100%;
}

.artist-wrapper {
  height: 100%;
  overflow: hidden;
}
</style>