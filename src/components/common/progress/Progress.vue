<template>
  <div class="progress" @click="setProClick($event)">
    <div class="pro-line" :style="{width: proLine+'px'}"></div>
    <div class="pro-load" :style="{transform: 'translateX('+proLoad+'px'}" ref="load"></div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  data() {
    return {
      proLine: 0,
      proLoad: 0,
      width: 0,
      offsetLeft: 0,
      scale: 0
    }
  },
  methods: {
    setProClick(e) {
      this.setPro(e.clientX - this.$el.offsetLeft)
      //toFixed:把数字转换为字符串，结果的小数点后有指定位数的数字
      this.scale = (this.proLine / this.$el.offsetWidth).toFixed(2)
      this.$emit('childclick', this.scale)
      this.$emit('childClick', this.scale)
    },
    setProgress(scale) {
      this.proLine = scale * this.$el.offsetWidth
      this.proLoad = scale * this.$el.offsetWidth
    },
    setPro(changeX) {
      this.proLine = changeX
      this.proLoad = changeX
    }
  }
}
</script>

<style scoped>
.progress {
  width: 100%;
  height: 3px;
  border-radius: 2px;
  cursor: pointer;
  background: #454546;
  position: relative;
}

.pro-line {
  width: 50px;
  height: 100%;
  background: #b82525;
}

.pro-load {
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: #fff;
  position: absolute;
  transform: translateX(50px);
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>