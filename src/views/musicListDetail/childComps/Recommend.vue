<template>
  <div class="recommends">
    <div class="desc">
      <div class="language">
        <textarea name id cols="30" rows="10"></textarea>
      </div>
      <div class="sub">评论</div>
    </div>

    <div class="content">
      <p>精彩评论({{totalCom}})</p>
      <div class="item" v-for="(item, index) in comments" :key="index">
        <div class="icon">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="mess">
          <div class="top">
            <span>{{item.nickname}}:</span>
            {{item.content}}
          </div>
          <div class="bottom">{{formatData(item.time)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatData } from 'assets/common/tool'
export default {
  name: 'Recommends',
  props: {
    comments: {
      type: Array,
      default() {
        return []
      }
    },
    totalCom: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  methods: {
    formatData: function(data) {
      return formatData(new Date(data), 'yyyy年MM月dd日 hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.recommends {
  width: 100%;
  padding: 20px 0 10px 0;
}

.recommends .desc {
  padding: 10px;
  height: 105px;
  background: #1c1e23;
}

.recommends .desc .language {
  height: 60px;
}

.desc .language textarea {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  outline-style: none;
  background: #2b2c31;
  color: white;
  border: none;
}

.sub {
  float: right;
  margin-top: 5px;
  cursor: pointer;
}

.recommends .content {
  width: 100%;
  font-size: 13px;
  color: white;
}

.recommends .content p {
  padding-top: 30px;
  border: 1px solid #23262c;
}

.item {
  padding: 10px 0 10px 30px;
  border: 1px solid #23262c;
  display: flex;
  position: relative;
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}

.icon img {
  width: 100%;
  border-radius: 50%;
}

.mess {
  flex: 1;
}

.top {
  margin-bottom: 10px;
}

.top span {
  color: #2e6bb0;
}

.bottom {
  position: absolute;
  bottom: 0;
}
</style>