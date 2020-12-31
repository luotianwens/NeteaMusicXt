<template>
  <div class="artist-list">
    <div class="list-item" v-for="(item, index) in artists" :key="index" @click="enterDetail(item)">
      <!-- <img :src="item.picUrl || item.coverImgUrl" alt /> -->
      <!-- <img :src="imgLoad(item)" alt /> -->
      <img ref="item" :data-src="imgLoad(item)" src="~assets/img/app/loading.svg" alt />
      <div class="singer">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistList',
  props: {
    artists: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    enterDetail(artist) {
      this.$store.commit('addArtist', artist)
      this.$router.push({
        path: '/artist'
      })
    },
    imgLoad(item) {
      return item.picUrl || item.coverImgUrl
    }
  }
}
</script>

<style scoped>
.artist-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 150px);
  column-gap: 10px;
  margin-top: 15px;
}

.list-item {
  width: 150px;
  height: 190px;
}

.list-item img {
  width: 150px;
  height: 150px;
  border-radius: 5%;
  object-fit: cover;
}

.singer {
  font-size: 13px;
}
</style>