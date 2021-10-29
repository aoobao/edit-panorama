<template>
  <div class="tools">
    <div class="menu-body">
      <div class="menu-item" @click="menuClick(index)" :class="{ active: index === currentMenuIndex }" v-for="(menu, index) in menus" :key="menu.name">
        <i :class="menu.icon"></i>
        <span class="name">{{ menu.name }}</span>
      </div>
    </div>
    <SplitLine option="right" />
  </div>
</template>
<script lang="ts">
import SplitLine from '@/components/SplitLine/SplitLine'
import { mapGetters } from 'vuex'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  components: { SplitLine },
  computed: {
    ...mapGetters(['currentMenuIndex']),
  },
  setup() {
    const store = useStore()
    const menus = computed(() => store.getters.menus)

    const menuClick = (index: number) => {
      store.commit('setCurrentMenuIndex', index)
    }
    return {
      menus,
      menuClick,
    }
  },
}
</script>
<style lang="scss" scoped>
.tools {
  width: 52px;
  height: 100%;
  display: flex;

  .menu-body {
    width: 1px;
    flex-grow: 1;
    height: 100%;

    .menu-item {
      cursor: pointer;
      &:first-child {
        margin-top: 20px;
      }
      &.active {
        background-color: #427afb;
      }
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        font-size: 20px;
      }
      .name {
        margin-top: 5px;
      }
    }
  }
}
</style>
