<template>
  <div class="navbar">
    <div class="content">
      <router-link v-for="(item, index) in list" :key="index" :to="item.link">
        <div
          class="item"
          @click="barClick(index)"
          :class="{action: currentIndex == index}"
        >{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['list'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    barClick(i) {
      this.currentIndex = i
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 49px;
  width: 100%;
}

.content {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
}

.navbar a {
  text-align: center;
  flex: 1;
  height: 100%;
  line-height: 49px;
  color: white;
  opacity: 0.6;
}

.action {
  opacity: 1;
  border-bottom: 2px solid #5c5361;
}
</style>