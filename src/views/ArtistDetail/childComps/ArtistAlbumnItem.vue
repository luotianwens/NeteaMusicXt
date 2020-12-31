<template>
  <div class="music" ref="music" v-if="musiclist!==null">
    <div class="avatar">
      <img data-src="musiclist[0].pic" alt />
    </div>
    <table cellspacing="0">
      <div class="header">{{musiclist['head']}}</div>
      <tbody>
        <tr
          v-for="(item, index) in musiclist.slice(0, 10)"
          :key="index"
          @dblclick="musicItemClick(index)"
        >
          <td>
            <p v-if="playIndex!=index">{{setSerial(index)}}</p>
            <div class="curPlay" v-if="playIndex==index">
              <img src="~assets/img/playmusic/currentplay.svg" alt />
            </div>
          </td>
          <td>
            <img src="~assets/img/leftmenu/live.svg" alt class="live" />
            <img src="~assets/img/leftmenu/xiazai.svg" alt class="download" />
          </td>
          <td>{{item.name.length>15?(item.name.slice(0, 15)+'..'):item.name}}</td>
          <td>{{item.song}}</td>
          <td>{{item.album.length>5?(item.album.slice(0, 5)+'...'):item.album}}</td>
          <td>{{item.time}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { tableMixin } from 'views/musicListDetail/childComps/tableMixin'
import { playMixin } from 'views/musicListDetail/playMixin'
export default {
  name: 'ArtistAlbumnItem',
  mixins: [tableMixin, playMixin],
  props: ['musiclist', 'header']
}
</script>

<style scoped>
.music {
  display: flex;
  width: 100%;
  margin-top: 10px;
}

.music .avatar {
  width: 25%;
  height: 100%;
}

.avatar img {
  width: 100px;
  height: 100px;
}

.music table {
  width: 75%;
  border: 1px solid #333;
  position: relative;
  margin-top: 10px;
  margin-bottom: 30px;
}

.music tbody {
  width: 100%;
}

.music thead {
  color: #828385;
}

.music tr {
  width: 100%;
  height: 30px;
  text-align: left;
}

.music tr:first-child {
  width: 100%;
}
.music tbody tr:nth-child(odd) {
  background: #191b1f;
}

.music tr:hover {
  background-color: #2c2e32;
  color: #fff;
}

.music tr td {
  border: 1px solid #23262c;
  position: relative;
}

.music tbody {
  font-size: 13px;
  color: #575757;
}

.music tr td:nth-child(1) {
  width: 50px;
  text-align: center;
}

.music tr td:nth-child(2) img {
  width: 20px;
  opacity: 0.6;
}

.music tr td:nth-child(2) {
  width: 80px;
}

.music tr td:nth-child(3) {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #dcddd4;
  margin-right: 20px;
}

.music tr td .live {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.music tr td .download {
  margin-left: 26px;
}

.music tr td:nth-child(4) {
  width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.music tr td:nth-child(5) {
  width: 180px;
}

.music tr td:nth-child(6) {
  width: 80px;
}

.music tbody tr td {
  border: none;
}

.music thead tr td {
  padding-left: 5px;
}

table::after {
  content: '查看全部>';
  width: 100px;
  color: #828385;
  font-size: 13px;
  display: block;
  position: absolute;
  bottom: -20px;
}

table .header {
  font-size: 13px;
  color: #828385;
  width: 100px;
  height: 20px;
  position: absolute;
  top: -20px;
}

.backColor {
  background: #1a1c20;
}
</style>