<template>
  <div class="category">
    <div class="tags-selected">{{ currentTags }}</div>
    <div class="tags">
      <span>热门标签：</span>
      <div
        v-for="(item, index) in tags"
        :key="index"
        @click="refreshList(item)"
      >{{ item.playlistTag.name }}</div>
    </div>
    <scroll
      ref="wrapper"
      class="category-scroll"
      :pull-up-load="true"
      @pullingUp="pullingUp()"
      :data="playLists"
    >
      <music-list :personList="playLists" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import MusicList from 'components/app/musicList/MusicList'

import { _getHighquality, _getMusicListHot } from 'network/discover'
export default {
  name: 'Category',
  data() {
    return {
      currentTags: '华语',
      tags: [],
      limit: 25,
      playLists: [],
      page: 1
    }
  },
  components: {
    Scroll,
    MusicList
  },
  created: function() {
    _getMusicListHot().then(res => {
      this.tags = res.data.tags
      this.getHighquality()
    })
  },
  methods: {
    getHighquality: function() {
      _getHighquality(this.currentTags, this.limit * this.page).then(res => {
        this.playLists = res.data.playlists
      })
    },
    refreshList: function(item) {
      this.currentTags = item.playlistTag.name
      this.$refs.wrapper.refresh()
      this.playLists = []
      this.getHighquality()
    },
    pullingUp: function() {
      this.page++
      this.getHighquality()
    }
  }
}
</script>

<style scoped>
.category {
  width: 100%;
  height: 100%;
}

.tags {
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 20px;
}

.tags div,
.tags-selected {
  padding: 0 10px;
  color: #828385;
  cursor: pointer;
}

.category-scroll {
  height: calc(100% - 30px);
  overflow: hidden;
}
</style>
