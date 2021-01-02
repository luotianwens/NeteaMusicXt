<template>
  <div class="search" @mouseleave="leave()">
    <div class="search-item">
      <input
        type="text"
        class="mess"
        v-model="keywords"
        @focus="focus()"
        @keydown="keyEnter($event)"
      />
      <div class="search-icon">
        <img src="~assets/img/app/search.svg" alt />
      </div>
    </div>
    <hot-search ref="hotsearch" :searchlist="searchlist" v-show="isShow" @del="del" />
    <div class="suggest" v-show="isSuggest">
      <div class="top">
        搜索
        <span>"{{keywords}}"</span>相关的结果>
      </div>
      <dl>
        <dt>
          <div class="icon">
            <img src="~assets/img/app/profile-o.svg" alt />
          </div>
          <div class="tit">歌手</div>
        </dt>
        <dd v-for="(item, index) in sugArtist" :key="index">{{item.name}}</dd>
        <dt>
          <div class="icon">
            <img src="~assets/img/leftmenu/music-line.svg" alt />
          </div>
          <div class="tit">单曲</div>
        </dt>
        <dd
          v-for="(item, index) in sugSongs"
          :key="index"
          @click="enterDetail(item.name)"
        >{{item.name}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import HotSearch from './HotSearch'
import { _searchSuggest } from 'network/search'
export default {
  name: 'MusicSearch',
  data() {
    return {
      searchlist: ['海底', '世间美好与你环环相扣', '演员'],
      isShow: false,
      isSuggest: false,
      keywords: '',
      sugSongs: [],
      sugArtist: []
    }
  },
  components: {
    HotSearch
  },
  watch: {
    keywords(newvalue, oldvalue) {
      this.isSuggest = true
      // this.isSuggest = true
      // console.log(newvalue)
      if (newvalue === '') return
      this.getSugMess(newvalue)
    },
    isShow() {
      this.$wait(200).then(() => this.$refs.hotsearch.refresh())
    }
  },
  methods: {
    focus() {
      this.isShow = true
    },
    leave() {
      this.isShow = false
      this.isSuggest = false
    },
    del() {
      this.searchlist = []
    },
    keyEnter(event) {
      if (this.keywords == '' || this.keywords == null) return
      if (event.key == 'Enter') {
        this.$router.push('/search/' + this.keywords)
        this.isShow = false
        this.searchlist.push(this.keywords)
      }
    },
    getSugMess(key) {
      _searchSuggest(key).then(res => {
        this.sugSongs = res.data.result.songs
        this.sugArtist = res.data.result.artists
      })
    },
    enterDetail(key) {
      this.$router.push('/search/' + key)
      this.isSuggest = false
    }
  }
}
</script>
<style scoped>
.search {
  height: 100%;
  width: 230px;
  margin-left: 100px;
  display: inline-block;
  position: relative;
}

.search-item {
  line-height: 54px;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  border-radius: 10px;
}

.mess {
  outline-style: none;
  color: #333;
  line-height: 16px;
  background: transparent;
  position: absolute;
  width: 80%;
  height: 100%;
  padding: 0px 10px;
  border: #f6f6f6;
  border-radius: 10px;
}

.search-icon {
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: -2px;
}

.suggest {
  font-size: 14px;
  width: 400px;
  height: 250px;
  background: #212326;
  color: #828385;
  position: absolute;
  top: 54px;
  z-index: 999;
  padding-bottom: 20px;
}

.suggest .top {
  margin-left: 5px;
}

.suggest .top span {
  color: white;
}

.suggest dt {
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #2d2f33;
  padding-left: 10px;
}

.suggest .icon {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.suggest .icon img {
  width: 100%;
}

.suggest dt .tit {
  margin-left: 5px;
}

.suggest dd {
  font-size: 13px;
  height: 30px;
  margin-left: 15px;
}
</style>

