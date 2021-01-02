<template>
  <div class="artist-albumn">
    <artist-albumn-top50 :musiclist="musiclist" />
    <artist-list-item v-for="(item, index) in albumslist" :key="index" :musiclist="item" />
  </div>
</template>

<script>
import ArtistAlbumnTop50 from '../childComps/ArtistAlbumnItem'
import ArtistListItem from '../childComps/ArtistAlbumnItem'
import { _getArtistAlbum, _getArtistHot50, _getAlbum } from 'network/artist'
import { _getSongsDetail, SongDetail } from 'network/detail'
// import { album } from '../../../../NeteaseCloudMusicApi/interface'
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
    ArtistAlbumnTop50,
    ArtistListItem
  },
  async mounted() {
    try {
      this.artist = this.$store.state.artist
      // let songs = await _getArtistHot50(this.artist.id)
      // this.musiclist['head'] = '热门50首'
      // let musiclist = songs.data.songs.map(async item => {
      //   let song = await _getSongsDetail(item.id)
      //   return new SongDetail(songs.data.songs)
      // })
      // for (let item of musiclist) {
      //   // console.log(item)
      //   await item.then(res => this.musiclist.push(res))
      // }
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

      // let list = await _getArtistAlbum(this.artist.id)
      // let albumsCopy = list.data.hotAlbums.map(async item => {
      //   let songs = await _getAlbum(item.id)
      //   let albums = []
      //   albums['head'] = item.name
      //   let albumsCopy = songs.data.songs.map(async item => {
      //     let song = await _getSongsDetail(item.id)
      //     return new SongDetail(song.data.songs)
      //   })

      //   for (let album of albumsCopy) {
      //     await album.then(res => albums.push(res))
      //   }
      //   return albums
      // })
      // for (let albums of albumsCopy) {
      //   await albums.then(res => this.albumslist.push(res))
      // }
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
    } catch (errror) {
      // console.log(error)
    }
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