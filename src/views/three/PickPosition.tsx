import { defineComponent, inject, onBeforeUnmount } from 'vue'
import { THREE } from '@three/lib'
import { ThreeJsEnvironment } from '@/assets/threejs/types'
// import { loadModelByPath } from '@three/utils'
import { bus, ACTION } from '@/assets/mitt'
import { Pixel } from '@three/types'
import { DevicePoint } from '@/assets/types'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'PickPosition',
  props: {},
  setup() {
    const store = useStore()
    const env = inject('ENV') as ThreeJsEnvironment

    // const dom = env.renderer.domElement
    const mouse = new THREE.Vector2()

    const tranformPixelToPosition = (pixel: Pixel) => {
      // updateMousePosition
      const x = pixel[0]
      const y = pixel[1]
      const dx = (x / env.width) * 2 - 1
      const dy = 1 - (y / env.height) * 2
      mouse.set(dx, dy)

      env.raycaster.setFromCamera(mouse, env.camera!)

      const intersects = env.raycaster.intersectObjects([env.panorama!], true)

      if (intersects.length) {
        const intersect = intersects[intersects.length - 1]
        const point = intersect.point

        return point
      } else {
        return null
      }

      // console.log('test', x, y, dom, mouse)
    }

    const addNew = (p: any) => {
      const point = p as DevicePoint
      const w = env.width / 2
      const h = env.height / 2

      const position = tranformPixelToPosition([w, h])

      if (position !== null) {
        point.x = position.x
        point.y = position.y
        point.z = position.z
      }

      // console.log(point)

      store.commit('addNewPoint', point)
    }

    bus.on(ACTION.ADD_NEW, addNew)

    onBeforeUnmount(() => {
      bus.on(ACTION.ADD_NEW, addNew)
    })

    return {
      tranformPixelToPosition,
    }
  },
  render() {
    return null
  },
})
