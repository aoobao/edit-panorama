<template>
  <div class="drawer" :class="{ active: drawer }">
    <!-- <SplitLine option="left" /> -->
    <div class="header">
      <span class="h1">点位详情</span>
      <div class="close" @click="closeWindow"></div>
    </div>
    <SplitLine option="bottom" />

    <div class="body">
      <template v-if="currentPoint">
        <div class="item">
          <span class="name">ID:</span>
          <span class="value">{{ currentPoint.id }}</span>
        </div>
        <div class="item">
          <span class="name">类型:</span>
          <span class="value">{{ currentPoint.name }}</span>
        </div>
        <div class="item">
          <span class="name">x:</span>
          <span class="value">{{ toFixed(currentPoint.x) }}</span>
        </div>
        <div class="item">
          <span class="name">y:</span>
          <span class="value">{{ toFixed(currentPoint.y) }}</span>
        </div>
        <div class="item">
          <span class="name">z:</span>
          <span class="value">{{ toFixed(currentPoint.z) }}</span>
        </div>

        <div class="item">
          <span class="name">显示</span>
          <span class="value">
            <el-switch @change="changeVisible" :value="currentPoint.visible" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </span>
        </div>

        <div class="item">
          <span class="name">尺寸</span>

          <div class="slider">
            <el-slider :step="0.05" :min="0.5" :max="1.5" v-model="size"></el-slider>
          </div>
        </div>
      </template>
    </div>

    <SplitLine option="bottom" />
    <div class="footer">
      <el-button @click="closeWindow" class="btn" type="warning">关闭</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref, watch } from 'vue'
import { DevicePoint } from '@/assets/types'
import store from '@/store/index'

import SplitLine from '@/components/SplitLine/SplitLine'
export default {
  components: { SplitLine },
  setup() {
    const drawer = ref(false)
    const currentPoint = computed(() => {
      return store.getters.currentPoint
    })

    const size = ref<number>(1)

    const closeWindow = () => {
      drawer.value = false
    }

    const toFixed = (val: number) => {
      return val.toFixed(8)
    }

    const changeVisible = (visible: boolean) => {
      // console.log(visible)
      store.commit('changePointVisible', {
        ...currentPoint.value,
        visible: visible,
      })
    }

    watch(currentPoint, (point: DevicePoint) => {
      if (point) {
        drawer.value = true
        size.value = point.size || 1
      } else {
        closeWindow()
      }
    })

    watch(size, val => {
      // console.log(val)
      store.commit('setPointSize', {
        ...currentPoint.value,
        size: val,
      })
    })

    watch(drawer, val => {
      if (!val) {
        // 关闭
        store.commit('setActivePointId', undefined)
      }
    })

    return {
      drawer,
      closeWindow,
      currentPoint,
      toFixed,
      changeVisible,
      size,
    }
  },
}
</script>
<style lang="scss" scoped>
.drawer {
  width: 230px;
  height: 100%;
  background-color: #333333;

  position: fixed;
  right: -220px;
  top: 0;

  transition: right 0.5s;

  display: flex;
  flex-direction: column;

  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);

  &.active {
    right: 0;
  }

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .h1 {
      margin-left: 10px;
      font-size: 16px;
    }

    .close {
      width: 20px;
      height: 20px;
      background-image: url('./popup-close.png');
      background-size: 100% 100%;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .body {
    width: 100%;
    height: 1px;
    flex-grow: 1;

    .item {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 14px;
      .name {
        width: 50px;
        padding-right: 20px;
        text-align: right;
      }

      .slider {
        width: 100px;
      }
    }
  }

  .footer {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: calc(100% - 40px);
    }
  }
}
</style>
