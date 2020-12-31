<template>
  <div class="detailBar">
    <span
      :class="{action: currentIndex === index}"
      v-for="(item,index) in list"
      :key="index"
      @click="currentClick(index)"
    >{{item}}</span>
  </div>
</template>

<script>
export default {
  name: 'DetailBar',
  props: ['list'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    currentClick: function(index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.$emit('detailBarClick', 'music')
          break
        case 1:
          this.$emit('detailBarClick', 'recommend')
          break
        case 2:
          this.$emit('detailBarClick', 'collect')
          break
      }
    }
  }
}
</script>

<style scoped>
.detailBar {
  padding: 10px 0;
  height: 49px;
}

.detailBar span {
  display: inline-block;
  padding: 5px 20px;
}

.action {
  border-bottom: 3px solid #b82525;
}
</style>