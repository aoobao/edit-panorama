<template>
  <div ref="view" class="home-view" @dragend="dragEnd" @dragover="allowDrop" @drag="drag">
    <ThreeWrap>
      <PanoramaView />
      <PointList />
      <PickPosition ref="pick" />
    </ThreeWrap>
  </div>
</template>
<script lang="ts">
import ThreeWrap from './ThreeWrap'
import PanoramaView from './PanoramaView'
import PickPosition from '@/views/three/PickPosition'
import PointList from '@/views/three/PointList'
import store from '@/store/index'
import { Pixel } from '@three/types'
import { ICON_WIDTH } from '@/views/three/PointDom/type'
export default {
  components: { ThreeWrap, PanoramaView, PickPosition, PointList },

  methods: {
    allowDrop(e: MouseEvent) {
      e.preventDefault()
    },
    drag(e: MouseEvent) {
      e.preventDefault()
    },
    dragEnd(e: MouseEvent) {
      e.preventDefault()
      const width = ICON_WIDTH / 2

      const offsetX = e.offsetX
      const offsetY = e.offsetY

      const dragId = store.getters.dragId

      const img = e.target as any

      const body = img.parentElement.parentElement as HTMLElement

      const bodyWidth = (this as any).$refs.view.offsetWidth
      const bodyHeight = (this as any).$refs.view.offsetHeight

      const left = parseFloat(body.style.left)
      const top = parseFloat(body.style.top)

      // console.log(dragId, left, top, offsetX, offsetY)

      const x = left + offsetX - width
      const y = top + offsetY - width

      // console.log(x, y)

      if (x < 0 || y < 0 || x > bodyWidth || y > bodyHeight) {
        // 超出范围
        return
      }

      const pixel: Pixel = [x, y]

      const position = (this as any).$refs.pick.tranformPixelToPosition(pixel)

      // console.log(position)
      if (position) {
        const point = {
          id: dragId,
          x: position.x,
          y: position.y,
          z: position.z,
        }

        store.commit('changePositionById', point)
      }

      // const body = img.parent

      // console.log(dragId, e)
    },
  },
}
</script>
<style lang="scss" scoped>
.home-view {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}
</style>
