<template>
  <div class="mv-list">
    <div class="list-item" v-for="(item, index) in mvList" :key="index" @click="enterDetail(index)">
      <img :src="item.cover" ref="item" />
      <!-- <img ref="item" :data-src="item.cover" src="~assets/img/app/loading.svg" alt /> -->
      <div class="name">{{item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name}}</div>
      <div class="singer">{{item.artistName}}</div>
      <div class="count">
        <img src alt />
        <span>{{item.playCount > 1e5 ? `${(item.playCount / 10000).toFixed(0)}万` : item.playCount}}</span>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvList',
  props: {
    mvList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    enterDetail(index) {
      this.$router.push(
        '/mvlistdetail/' + this.mvList[index].id + '/' + new Date().getTime()
      )
    }
  }
}
</script>

<style scoped>
.mv-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  column-gap: 10px;
  margin-top: 20px;
}

.list-item {
  position: relative;
  width: 200px;
  height: 180px;
}

.list-item img {
  width: 100%;
  border-radius: 4px;
}

.mask {
  position: absolute;
  top: -10px;
  left: 0;
  z-index: 9;
  width: 200px;
  height: 100px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0)
  );
}

.list-item .name {
  font-size: 12px;
}

.list-item .singer {
  font-size: 8px;
  color: #909193;
}

.count {
  z-index: 99;
  font-size: 8px;
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>