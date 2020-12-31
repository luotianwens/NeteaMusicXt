<template>
  <div class="base">
    <div class="avatar">
      <img :src="baseInfo.img" alt />
    </div>
    <div class="content">
      <div class="top-header">
        <span class="icon">歌单</span>
        <span>{{baseInfo.name}}</span>
        <div class="right">
          <table>
            <tr>
              <td>
                歌曲数
                <br />
                {{baseInfo.trackCount}}
              </td>
              <td>
                播放量
                <br />
                {{baseInfo.playCount}}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="center-bar">
        <div class="playButton">
          <img src="~assets/img/playmusic/bofang.svg" alt />
          播放全部
        </div>
        <div class="sub">
          <img src="~assets/img/detail/add.svg" alt />
          收藏{{baseInfo.subscribedCount}}
        </div>
        <div class="share">
          <img src="~assets/img/detail/share.svg" alt />
          分享{{baseInfo.shareCount}}
        </div>
      </div>

      <div class="desc">
        <div class="biaoqian">
          标签：
          <span v-for="(item,index) in baseInfo.tags" :key="index">{{item}}</span>
        </div>
        <div class="desc-content">{{baseInfo.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: ['list'],
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.base {
  width: 100%;
  display: flex;
}

.avatar {
  display: inline-block;
  width: 200px;
}

.avatar img {
  width: 100%;
}

.base .content {
  flex: 1;
  padding: 0 20px;
  position: relative;
}

.top-header span {
  font-size: 20px;
}

.content .icon {
  border: 1px solid red;
  border-radius: 4px;
  color: red;
  padding: 5px;
  font-size: 11px;
  margin-right: 10px;
}

.center-bar {
  padding-top: 40px;
  display: flex;
  align-items: center;
}

.center-bar div {
  padding: 5px 10px;
  background: #25272b;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.center-bar .playButton {
  background: #cd2929;
}

.center-bar img {
  width: 18px;
  height: 18px;
  vertical-align: -4px;
}

.desc {
  position: absolute;
  bottom: 0;
  color: #dcddd4;
}

.desc div {
  padding: 5px 0;
}

.desc span {
  color: #2e6bb0;
  margin-right: 5px;
}

.top-header .right {
  height: 30px;
  float: right;
}

.right td {
  text-align: center;
  font-size: 12px;
  padding: 5px;
  color: #4e4e52;
}

.desc .desc-content {
  line-height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>