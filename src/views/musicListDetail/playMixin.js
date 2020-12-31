export const playMixin = {
  data() {
    return {
      playIndex: null,
    };
  },
  created() {
    this.$bus.$on('Playing', (index, path) => {
      if (this.$route.path == path) {
        this.playIndex = index;
      }
    });
  },
};
