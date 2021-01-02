<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ScrollBar from '@better-scroll/scroll-bar'
import mouseWheel from '@better-scroll/mouse-wheel'

// BScroll.use(Pullup, ScrollBar, mouseWheel);
BScroll.use(Pullup)
BScroll.use(ScrollBar)
BScroll.use(mouseWheel)
export default {
  name: 'Scroll',
  props: {
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    },
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    scrollbar: {
      type: Object,
      default() {
        return {}
      }
    },
    listenScroll: {
      type: Boolean,
      default() {
        return false
      }
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this._initScroll()
    })
  },
  watch: {
    data() {
      // setTimeout(() => {
      //   this.refresh()
      // }, 2000)
      this.$wait(2000).then(() => this.refresh())
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        scrollY: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad, //上拉加载
        scrollbar: this.scrollbar,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      })

      this.scroll.on('scrollEnd', () => {
        this.$emit('scroll')
      })

      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    scrollTo(x, y, timer = 500) {
      this.scroll.scrollTo(x, y, timer)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
      this.refresh()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    }
  }
}
</script>
