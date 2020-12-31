<template>
  <div class="base-info">
    <div class="avatar">
      <img :src="baseInfo.img1v1Url" alt />
    </div>
    <div class="content">
      <div class="top">
        <div>
          <span>歌手</span>
          {{baseInfo.name}}
        </div>
      </div>
      <div class="center">
        <div>
          <img src="~assets/img/leftmenu/music.svg" alt />
          单曲数：
          <span>{{baseInfo.musicSize}}</span>
        </div>
        <div>
          <img src="~assets/img/artist/album.svg" alt />
          专辑数：
          <span>{{baseInfo.albumSize}}</span>
        </div>
        <div>
          <img src="~assets/img/detail/add.svg" alt />
          收藏
        </div>
      </div>
      <div class="intro">
        个人介绍：
        <span>{{desc}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistBaseInfo',
  props: ['desc', 'baseInfo']
}
</script>

<style scoped>
.base-info {
  display: flex;
  width: 100%;
}

.avatar {
  width: 170px;
  margin-right: 20px;
}

.avatar img {
  width: 170px;
  height: 170px;
  object-fit: cover;
}

.content .top {
  font-size: 20px;
  font-weight: 1000;
  height: 80px;
}

.content .top span {
  font-size: 13px;
  font-weight: normal;
  color: #a62a2e;
  padding: 2px 3px;
  border: 1px solid #a62a2e;
  border-radius: 4px;
}

.content .center {
  display: flex;
  height: 30px;
}

.center img {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.center div {
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 5px 5px;
  margin-right: 5px;
  height: 30px;
  background: #26262a;
  border-radius: 5px;
}

.intro {
  font-size: 13px;
  height: 15px;
  margin-top: 35px;
  overflow: hidden;
}

.intro span {
  color: #355f94;
}
</style>>
