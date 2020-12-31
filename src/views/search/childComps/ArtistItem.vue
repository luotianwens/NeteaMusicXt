<template>
  <div class="artist-list">
    <div class="artist-item" v-for="(item, index) in artistslist" :key="index">
      <img :src="item.img1v1Url" alt />
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistItem',
  props: {
    artistslist: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.artist-list {
  width: 100%;
  height: 100%;
}

.artist-item {
  display: flex;
  margin-top: 15px;
  align-items: center;
}

.artist-item:nth-child(even) {
  background-color: #191b1f;
}

.artist-item:hover {
  background: #191b1f;
}

.artist-item img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.artist-item span {
  font-size: 13px;
  margin-left: 5px;
}
</style>