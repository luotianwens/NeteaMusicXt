//图片懒加载

export const imgloadMixin = {
  data() {
    return {};
  },
  methods: {
    lazyImgload() {
      // let imgs = this.$refs.item || this.$refs.artistlist.$refs.item;
      let imgs = this.imgData.$refs.item;
      let s = -this.$refs.wrapper.scroll.y - 15;
      let h = window.innerHeight - 205;
      for (let i in imgs) {
        let offsetT = imgs[i].offsetTop;
        if (h + s > offsetT) {
          (function(item) {
            setTimeout(function() {
              var temp = new Image();
              temp.src = item.getAttribute('data-src');
              temp.onload = function() {
                imgs[i].src = temp.src;
              };
            }, 1000);
          })(imgs[i]);
        }
      }
    },
  },
};
