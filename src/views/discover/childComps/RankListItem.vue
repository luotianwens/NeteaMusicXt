<template>
  <div class="rank-list-item">
    <div
      class="rank-header"
      :style="{background:'linear-gradient(to right,'+bgColor[0]+','+bgColor[1]+')'}"
    >
      <div class="left">
        <p>{{title[0]}}</p>
        <p>{{title.slice(1, 3)}}</p>
        <p class="data">12月06日</p>
      </div>
      <div class="right" @click="enterDetail">
        <img src="~assets/img/playmusic/xibofang.svg" alt />
      </div>
    </div>
    <div class="rank-content">
      <table cellspacing="0">
        <tr v-for="(item, index) in musiclist" :key="index" @dblclick="enterIndex(index)">
          <td :style="{color: index<=2?'red':null}">
            <span v-if="currentId !== index">0{{index+1}}</span>
            <img src="~assets/img/playmusic/currentplay.svg" v-if="currentId == index" alt />
          </td>
          <td>{{item.name}}</td>
          <td>{{item.song}}</td>
          <td>{{item.time}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {
  _getMusicListDetail,
  SongDetail,
  _getSongsDetail
} from 'network/detail'
import { formatData } from 'assets/common/tool'
import { indexMixin } from 'views/musicListDetail/indexMixin'
export default {
  name: 'RankListItem',
  data() {
    return {
      musiclist: [],
      currentId: null
    }
  },
  mixins: [indexMixin],
  props: {
    listId: {
      type: Number,
      default() {
        return null
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    },
    bgColor: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted: function() {
    if (this.listId !== null) {
      _getMusicListDetail(this.listId).then(res => {
        this.musicListDetail = res.data
        /**遍历查询歌单所有歌曲详情 */
        for (let i of this.musicListDetail.playlist.trackIds.slice(0, 8)) {
          _getSongsDetail(i.id).then(res => {
            let song = new SongDetail(res.data.songs)
            this.musiclist.push(song)
          })
        }
      })
    }
  },
  methods: {
    enterDetail: function() {
      this.$router.push(
        '/musiclistdetail/' + this.listId + '/' + new Date().getTime()
      )
    },
    enterIndex: function(index) {
      this.PlayMusic(index)
      this.currentId = index
    }
  }
}
</script>

<style scoped>
.rank-list-item {
  height: 100%;
}

.rank-header {
  /* display: flex;
  width: 100%;
  height: 100px;
  position: relative; */
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 100%;
  height: 100px;
}

.left {
  margin-left: 100px;
  margin-top: auto;
  margin-bottom: auto;
  position: relative;
}

.left p:nth-child(1) {
  font-size: 50px;
  font-weight: 500;
  font-style: italic;
  position: absolute;
  left: -60px;
  top: -15px;
}

.left p:nth-child(2) {
  font-size: 20px;
  font-style: italic;
}

.left p:nth-child(3) {
  font-size: 8px;
  margin-top: -3px;
}

.right {
  /* position: absolute;
  right: 20px;
  transform: translateY(-50%);
  top: 50%;
  width: 50px;
  height: 50px; */
  width: 50px;
  height: 50px;
  justify-self: end;
  margin-right: 20px;
}

.right img {
  width: 100%;
}

.rank-content {
  width: 100%;
  font-size: 13px;
  color: #575757;
}

.rank-content tr {
  width: 100%;
  height: 30px;
  text-align: left;
}

.rank-content tr:hover {
  background-color: #2c2e32;
  color: #fff;
}

.rank-content tr:nth-child(even) {
  background: #1a1c20;
}

.rank-content td:nth-child(1) {
  width: 10%;
}

.rank-content td:nth-child(2) {
  width: 40%;
  color: white;
}

.rank-content td:nth-child(3) {
  width: 40%;
}

.rank-content td:nth-child(4) {
  width: 10%;
}
</style>>