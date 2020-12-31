export const tableMixin = {
  methods: {
    setSerial(index) {
      index++;
      return index > 9 ? index : '0' + index;
    },
    musicItemClick(index) {
      if (this.$parent.$parent.$el.className.includes('play-music-list')) {
        this.$bus.$emit('PlayMusicListItem', index);
        return;
      }
      this.$emit('musicItemClick', index); //父级musicItemClick
    },
  },
};
