<template>
  <div class="artist-albumn">
    <artist-albumn-top50 :musiclist="musiclist" />
    <artist-albumn-top50 v-for="(item, index) in albumslist" :key="index" :musiclist="item" />
  </div>
</template>

<script>
import ArtistAlbumnTop50 from '../childComps/ArtistAlbumnItem'
import { _getArtistAlbum, _getArtistHot50, _getAlbum } from 'network/artist'
import { _getSongsDetail, SongDetail } from 'network/detail'
export default {
  name: 'ArtistAlbumn',
  data() {
    return {
      artist: [],
      musiclist: [],
      albumslist: []
    }
  },
  components: {
    ArtistAlbumnTop50
  },
  mounted() {
    this.artist = this.$store.state.artist
    _getArtistHot50(this.artist.id).then(res => {
      let songs = res.data.songs
      this.musiclist['head'] = '热门50首'
      for (let i in songs) {
        _getSongsDetail(songs[i].id).then(res => {
          let song = new SongDetail(res.data.songs)
          this.musiclist.push(song)
        })
      }
    })
    _getArtistAlbum(this.artist.id).then(res => {
      let list = res.data.hotAlbums
      for (let i in list) {
        _getAlbum(list[i].id).then(res => {
          let songs = res.data.songs
          let albums = []
          albums['head'] = list[i].name
          for (let j in songs) {
            _getSongsDetail(songs[j].id).then(res => {
              let song = new SongDetail(res.data.songs)
              albums.push(song)
            })
          }
          this.albumslist.push(albums)
        })
      }
    })
  },
  methods: {}
}
</script> 

<style scoped>
.artist-albumn {
  width: 100%;
  height: 100%;
}
</style>