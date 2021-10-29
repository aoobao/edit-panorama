<template>
  <div class="right-view">
    <SplitLine option="left" />
    <div class="view-body">
      <PointView v-if="currentMenu.code === 'point'" />
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import SplitLine from '@/components/SplitLine/SplitLine'
import { computed } from 'vue'
import PointView from './PointView.vue'
export default {
  components: { SplitLine, PointView },
  setup() {
    const store = useStore()
    const currentMenu = computed(() => store.getters.currentMenu)

    return {
      currentMenu,
    }
  },
}
</script>
<style lang="scss" scoped>
.right-view {
  width: 220px;
  height: 100%;
  display: flex;

  .view-body {
    width: 1px;
    flex-grow: 1;
    height: 100%;
  }
}
</style>
