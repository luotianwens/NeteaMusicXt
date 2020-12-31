<template>
  <div class="swiper" ref="swiper" v-if="banner !== null">
    <div class="left">
      <div class="pre">
        <img src="~assets/img/swiper/prev.svg" alt />
      </div>
    </div>
    <div class="right">
      <div class="next">
        <img src="~assets/img/swiper/next.svg" alt />
      </div>
    </div>
    <div class="imgBox">
      <ul>
        <li v-for="(item,index) in banner" :key="index" :class="'list'+(index+1)">
          <img :src="item.imageUrl" alt />
        </li>
      </ul>
    </div>
    <div class="lineBar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
import { _Swiper } from './indexSwiper'
export default {
  name: 'Swiper',
  props: ['banner'],
  data() {
    return {
      classList: ['list1', 'list2', 'list3', 'list4', 'list5', 'list6']
    }
  },
  updated() {
    if (this.$refs.swiper !== null) {
      _Swiper(this.$refs.swiper)
    }
  }
}
</script>

<style scoped>
.swiper {
  cursor: pointer;
  width: 850px;
  height: 214px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.imgBox {
  width: 810px;
}

.imgBox ul {
  position: relaive;
  list-style-type: none;
}

.imgBox li {
  position: absolute;
  width: 450px;
}

.imgBox li img {
  width: 100%;
}

.lineBar {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 5px;
  margin: auto;
}

.lineBar span {
  margin: 0 5px;
  width: 20px;
  height: 3px;
  display: inline-block;
  border-radius: 2px;
  background: #fff;
  cursor: pointer;
}

.list1 {
  transform: scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list2 {
  transform: translateX(180px);
  z-index: 2;
  opacity: 1;
}

.list3 {
  transform: translateX(405px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list4 {
  transform: translateX(405px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
  display: none;
}

.list5 {
  transform: translateX(405px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 3;
  opacity: 0.5;
  display: none;
}

.list6 {
  transform: translateX(405px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
  display: none;
}

[class*='list'] {
  transition: transform 0.8s;
}

.lineBar .action {
  background: green;
}

.pre {
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 999;
  left: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}

.next {
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 999;
  right: 48px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}

.pre img,
.next img {
  width: 100%;
}

.left {
  width: 250px;
  height: 100%;
  float: left;
  position: relative;
  z-index: 1;
}

.right {
  width: 250px;
  height: 100%;
  float: right;
  position: relative;
  z-index: 1;
}
</style>