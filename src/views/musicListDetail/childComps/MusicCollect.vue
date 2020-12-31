<template>
  <div class="collectList">
    <div class="collecter" v-for="(item, index) in subers" :key="index">
      <div class="avatar">
        <img :src="item.avatarUrl" alt />
      </div>
      <span>{{item.nickname.length>=5?item.nickname.slice(0, 5):item.nickname}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicCollect',
  props: {
    subers: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.collectList {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 100%;
  padding: 15px 10px 0;
}

.collecter {
  width: 75px;
  height: 100%;
  margin: 10px 15px;
  text-align: center;
}

.avatar {
  width: 75px;
  height: 75px;
}

.avatar img {
  width: 100%;
  border-radius: 50%;
}

.collecter span {
  color: white;
  font-size: 10px;
  margin-top: 5px;
}
</style>