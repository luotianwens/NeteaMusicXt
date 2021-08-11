<template>
  <div class="music-mv">
    <div class="tags">
      <div class="tag-list">
        地区:
        <span
          v-for="(item, index) in area"
          :key="index"
          :class="{action: areaIndex == index}"
          @click="enterIndex(index, 'area')"
        >{{item}}</span>
      </div>
      <div class="tag-list">
        类型：
        <span
          v-for="(item, index) in type"
          :key="index"
          :class="{action: typeIndex == index}"
          @click="enterIndex(index, 'type')"
        >{{item}}</span>
      </div>
      <div class="tag-list">
        排序:
        <span
          v-for="(item, index) in order"
          :key="index"
          :class="{action: orderIndex == index}"
          @click="enterIndex(index, 'order')"
        >{{item}}</span>
      </div>
    </div>
    <scroll
      ref="wrapper"
      class="mv-wrapper"
      :data="mvList"
      :pull-up-load="true"
      @pullingUp="pullingUp()"
      @scroll="lazyImgload()"
    >
      <mv-list :mv-list="mvList" ref="mvlist" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import MvList from '../childComps/MvList'
import { _AllMv } from 'network/mv'
import { imgloadMixin } from 'components/common/imgloadMixin'

export default {
  name: 'Musicmv',
  components: {
    MvList,
    Scroll
  },
  mixins: [imgloadMixin],
  data() {
    return {
      area: ['全部', '内地', '港台', '欧美', '韩国', '日本'],
      type: ['全部', '官方版', '原声', '现场版', '网易出品'],
      order: ['上升最快', '最热', '最新'],
      areaIndex: 0,
      typeIndex: 0,
      orderIndex: 0,
      page: 1,
      mvList: [],
      imgData: {} //图片懒加载数据
    }
  },
  created() {
    this.getMv()
    this.imgData = this.$refs.mvlist
  },
  methods: {
    getMv() {
      _AllMv(
        this.area[this.areaIndex],
        this.type[this.type],
        this.order[this.orderIndex],
        this.page * 30
      ).then(res => {
        this.mvList = res.data.data
        this.$refs.wrapper.finishPullUp() //结束下拉刷新
      })
    },
    enterIndex(index, str) {
      switch (str) {
        case 'area':
          this.areaIndex = index
          break
        case 'type':
          this.typeIndex = index
          break
        case 'order':
          this.orderIndex = index
          break
        default:
          break
      }
      this.getMv()
    },
    pullingUp() {
      this.page++
      this.getMv()
    }
  }
}
</script>

<style scoped>
.music-mv {
  margin-bottom: 20px;
  padding: 20px 15px 0;
  height: 100%;
}

.mv-wrapper {
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
}

.tags {
  height: 60px;
  margin-bottom: 20px;
}

.tag-list {
  font-size: 10px;
  color: #e2e2e2;
}

.tag-list span {
  font-size: 14px;
  padding-left: 15px;
  padding-right: 15px;
  border-left: 1px rgba(255, 255, 255, 0.1) solid;
}

.tag-list span:first-child {
  border-left: none;
}

.action {
  color: #a80b0c;
}
</style>