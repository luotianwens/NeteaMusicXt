<template>
  <div class="ranklist">
    <scroll ref="wrapper" class="rank-scroll" v-if="ranklist.length != 0" :probe-type="3">
      <div class="ranktop">
        <rank-list-item
          v-for="(item, index) in rankText"
          :key="index"
          :list-id="ranklist[index].id"
          :bg-color="item.bgCor"
          :title="item.title"
        />
      </div>
      <h2>全球榜</h2>
      <music-list :personList="ranklist" />
    </scroll>
  </div>
</template>

<script>
import RankListItem from '../childComps/RankListItem'
import MusicList from 'components/app/musicList/MusicList'
import Scroll from 'components/common/scroll/Scroll'
import { _getRankList } from 'network/discover'
export default {
  name: 'RankList',
  data() {
    return {
      ranklist: [],
      rankText: [
        { title: '飙升榜', bgCor: ['#56a1e3', '#5a8beb'] },
        { title: '新歌榜', bgCor: ['#34aabe', '#56c2cd'] },
        { title: '原创榜', bgCor: ['#d53d6a', '#eb638d'] },
        { title: '热歌榜', bgCor: ['#c7523c', '#cc7455'] },
        { title: '歌手榜', bgCor: ['#9455ce', '#9946c9'] }
      ]
    }
  },
  components: {
    RankListItem,
    Scroll,
    MusicList
  },
  created() {
    _getRankList().then(res => {
      this.ranklist = res.data.list
      setTimeout(() => {
        this.$refs.wrapper.refresh()
      }, 1000)
    })
  }
}
</script>

<style scoped>
.ranklist {
  width: 650px;
  height: 100%;
}

.ranktop {
  display: grid;
  grid-template-columns: repeat(2, calc((100% - 15px) / 2));
  gap: 15px;
}

.rank-scroll {
  height: 100%;
  overflow: hidden;
}

h2 {
  font-size: 20px;
  margin-left: 5px;
}
</style>
