<template>
  <div class="music-mv">
    <scroll ref="wrapper" class="mv-wrapper"></scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import MvList from '../childComps/MvList'
import MvPernson from '../childComps/MvList'
import MvRank from '../childComps/MvRank'
import { _getNewMV, _getPersonalMV, _getTopMv } from 'network/mv'
export default {
  name: 'Musicmv',
  components: {
    MvList,
    MvRank,
    MvPernson,
    Scroll
  }
}
</script>

<style scoped>
.music-mv {
  padding: 20px 15px 0;
  height: 100%;
}

.mv-wrapper {
  height: 100%;
  overflow: hidden;
}
</style>