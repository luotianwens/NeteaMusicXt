<template>
  <div class="musiclist">
    <div class="list-item newday" v-if="isShow">
      <div class="new">
        <p>{{getDate}}</p>
        <div>{{time}}</div>
      </div>
      <div class="title">每日推荐</div>
    </div>
    <div
      class="list-item"
      v-for="(item, index) in personList"
      :key="index"
      @click="enterDetail(index)"
    >
      <img :src="item.picUrl || item.coverImgUrl" alt />
      <div class="title">{{item.name}}</div>
      <div class="count">
        <div>
          <img src="~assets/img/app/erji.svg" alt />
          {{item.playCount}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _getRecommendResource } from 'network/discover'
export default {
  name: 'MusicList',
  props: ['personList'],
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    enterDetail(index) {
      this.$router.push(
        '/musiclistdetail/' +
          this.personList[index].id +
          '/' +
          new Date().getTime()
      )
    }
  }
}
</script>

<style scoped>
.musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.musiclist .list-item {
  position: relative;
  margin: 5px 6px;
  width: 150px;
  padding-bottom: 10px;
  font-size: 13px;
}

.list-item img {
  width: 100%;
}

.count {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  position: absolute;
  top: 0;
  right: 0;
}

.count img {
  display: inline-block;
  height: 10px;
  width: 10px;
}

.newday .new {
  padding: 20px;
  width: 100%;
  height: 150px;
  background: white;
  text-align: center;
}

.new div {
  font-size: 89px;
  color: #b32525;
  margin-top: -30px;
}

.new p {
  font-size: 24px;
  color: #828394;
}
</style>