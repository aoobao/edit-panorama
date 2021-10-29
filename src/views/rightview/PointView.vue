<template>
  <div class="point-wrapper">
    <div class="buttons">
      <el-button class="btn" type="primary" @click="addNew">新增设备</el-button>
      <el-button class="btn" type="success">导入设备</el-button>
    </div>
    <SplitLine option="bottom" />

    <div class="title">
      设备点位
    </div>
    <div class="list">
      <div class="device" v-for="point in points" :key="point.id" @click="pointClick(point)">
        <el-image class="image" :src="publicPath + `icon/${point.name}.png`" fit="cover"></el-image>
        <span class="name">{{ point.name }}</span>

        <el-tag class="tag" effect="plain" size="mini" v-if="!point.visible" type="info">隐藏</el-tag>
      </div>
    </div>

    <PointInfo />
  </div>
</template>
<script lang="ts">
import SplitLine from '@/components/SplitLine/SplitLine'
import { bus, ACTION } from '@/assets/mitt'
import { DevicePoint } from '@/assets/types'
import { mapGetters } from 'vuex'
import PointInfo from './PointInfo/PointInfo.vue'
export default {
  name: 'PointView',
  components: { SplitLine, PointInfo },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  computed: {
    ...mapGetters(['points']),
  },
  // watch: {
  //   currentPoint(point: DevicePoint | undefined) {
  //     if (point) {
  //       // console.log(point)

  //       ;(this as any).$refs.info.show({ ...point })
  //     }
  //   },
  // },
  methods: {
    addNew() {
      const p: DevicePoint = {
        id: new Date().getTime(),
        name: '道闸',
        x: 0,
        y: 0,
        z: 0,
        visible: true,
        size: 1,
      }
      bus.emit(ACTION.ADD_NEW, p)
    },
    pointClick(point: DevicePoint) {
      ;(this as any).$store.commit('setActivePointId', point.id)
    },
  },
  // setup() {
  //   const addNew = () => {
  //     const data = {
  //       type: 'device',
  //     }
  //     bus.emit(ACTION.ADD_NEW, data)
  //     console.log('导出')
  //   }
  //   return {
  //     addNew,
  //   }
  // },
}
</script>
<style lang="scss" scoped>
.point-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .buttons {
    width: 100%;
    padding-bottom: 20px;
    .btn {
      width: calc(100% - 40px);
      margin-top: 20px;
      margin-left: 20px;
    }
  }
  .title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 16px;
  }
  .list {
    height: 1px;
    flex-grow: 1;
    width: 100%;

    .device {
      width: 100%;
      height: 40px;
      background-color: #3a3a3a;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      cursor: pointer;

      &:hover {
        background-color: #6b6b6b;
      }

      .image {
        margin-left: 15px;
        margin-right: 15px;
        width: 20px;
        height: 20px;
      }

      .tag {
        margin-left: 10px;
      }
    }
  }
}
</style>
