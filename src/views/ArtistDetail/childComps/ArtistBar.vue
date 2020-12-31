<template>
  <div class="artist-bar">
    <div
      v-for="(item, index) in buttonMess"
      :key="index"
      @click="enterDetail(index)"
      :class="{action: currentId == index}"
    >{{item.label}}</div>
  </div>
</template>

<script>
export default {
  name: 'ArtistBar',
  data() {
    return {
      buttonMess: [
        { id: 0, label: '专辑' },
        { id: 1, label: '歌手详情' },
        { id: 2, label: '相似歌手' }
      ],
      currentId: 0
    }
  },
  methods: {
    enterDetail(index) {
      switch (index) {
        case 0:
          this.$router.push('/artist/albumn')
          break
        case 1:
          this.$router.push('/artist/desc')
          break
        case 2:
          this.$router.push('/artist/simi')
      }
      this.currentId = index
    }
  }
}
</script>

<style scoped>
.artist-bar {
  width: 100%;
  display: flex;
}

.artist-bar div {
  box-sizing: content-box;
  font-size: 13px;
  text-align: center;
  width: 60px;
  height: 25px;
  padding: 3px 5px;
}

.action {
  border-bottom: 3px solid #a62a2e;
}
</style>