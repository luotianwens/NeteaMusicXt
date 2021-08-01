<template>
  <div class="individuation">
    <scroll ref="wrapper" class="indici-scroll" :data="personalized">
      <swiper :banner="banner" />
      <div class="recommend-title" @click="$router.push('/discover/category')">
        <p>推荐歌单</p>
        <img class="more" src="~assets/img/app/next.svg" alt />
      </div>
      <music-list :personList="personalized" />
      <!-- <private-content :pri="privateContent" /> -->
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import MusicList from 'components/app/musicList/MusicList'
import PrivateContent from 'views/discover/childComps/PrivateContent'
import Swiper from 'components/common/swiper/Swiper'

import { _getBanner, _getPersonallized } from 'network/discover'
export default {
  name: 'Individuation',
  components: {
    Swiper,
    Scroll,
    MusicList,
    PrivateContent
  },
  data() {
    return {
      banner: null,
      limit: 10,
      personalized: null
    }
  },
  created() {
    _getBanner().then(res => (this.banner = res.data.banners.slice(0, 6)))
    _getPersonallized(this.limit).then(
      res => (this.personalized = res.data.result)
    )
  }
}
</script>

<style scoped>
.individuation {
  width: 100%;
  height: 100%;
}

.indici-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.recommend-title {
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
}

.more {
  width: 18px;
}
</style>
