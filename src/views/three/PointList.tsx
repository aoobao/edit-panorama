import { computed, defineComponent, watch, inject } from 'vue'
import { THREE } from '@three/lib'
import { ThreeJsEnvironment } from '@/assets/threejs/types'
// import { loadModelByPath } from '@three/utils'
import PointDom from './PointDom/PointDom'
import { DevicePoint } from '@/assets/types'
import { useStore } from 'vuex'
// import { getAngle } from '@/assets/utils'
export default defineComponent({
  name: 'PointList',
  props: {},
  setup() {
    const store = useStore()
    const env = inject('ENV') as ThreeJsEnvironment
    // onBeforeUnmount(() => {})

    const points = computed(() => store.getters.points)

    const currentPointId = computed(() => store.getters.currentPointId)

    const currentPoint = computed(() => store.getters.currentPoint)

    const clickHandle = (device: DevicePoint) => {
      // console.log('device', device)
      store.commit('setActivePointId', device.id)
    }

    const dragStart = (device: DevicePoint) => {
      store.commit('setDragId', device.id)
    }

    watch(currentPoint, (val, oldval) => {
      if (!val) return
      if (oldval) {
        if (val.id === oldval.id) return
      }

      const point = val as DevicePoint
      // console.log(point)

      if (!point.visible) return
      if (point.x !== 0 || point.y !== 0 || point.z !== 0) {
        // const cameraPosition = env.camera!.position
        const control = env.control!

        const t = Math.sqrt(Math.pow(point.z, 2) + Math.pow(point.x, 2))

        const polarVec = new THREE.Vector2(-point.y, t)
        const polarRadian = polarVec.angle()
        const azimuthVec = new THREE.Vector2(point.z, point.x)
        let azimuthRadian = azimuthVec.angle() + Math.PI

        const num = Math.round((control.azimuthAngle - azimuthRadian) / (2 * Math.PI))
        azimuthRadian = num * 2 * Math.PI + azimuthRadian

        control.rotateTo(azimuthRadian, polarRadian, true)
  
      }
    })

    return () => {
      const pointList = points.value as DevicePoint[]

      const plist = pointList
        .filter(p => {
          return p.x !== 0 || p.y !== 0 || p.z !== 0
        })
        .map(p => {
          const isActive = currentPointId.value === p.id
          return <PointDom onDragStart={dragStart} active={isActive} key={p.id} device={p} onClick={clickHandle}></PointDom>
        })

      return plist
    }
  },
})
