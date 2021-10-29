import { defineComponent, inject, onBeforeUnmount, PropType, watchEffect } from 'vue'
// import { useStore } from 'vuex'
// import { THREE } from '@three/lib'
import { ThreeJsEnvironment } from '@/assets/threejs/types'
// import { loadModelByPath } from '@three/utils'
import { DevicePoint } from '@/assets/types'
import { Position } from '@three/types'
import PointDom from './index'

type DeviceHandle = (device: DevicePoint) => void

export default defineComponent({
  name: 'index',
  props: {
    device: {
      type: Object as PropType<DevicePoint>,
      required: true,
    },
    onClick: {
      type: Function as PropType<DeviceHandle>,
    },
    onDragStart: {
      type: Function as PropType<DeviceHandle>,
    },
    active: {
      type: Boolean,
      defalut: false,
    },
  },
  setup(props) {
    // const store = useStore()
    const env = inject('ENV') as ThreeJsEnvironment
    let object: PointDom

    const clickHandle = () => {
      // console.log('device click', props.device)
      // ctx.emit('click', { device, event })
      typeof props.onClick === 'function' && props.onClick(props.device)
    }

    const dragStart = () => {
      typeof props.onDragStart === 'function' && props.onDragStart(props.device)
    }

    const destroy = () => {
      if (object) {
        object.destroy()
      }
    }

    const create = () => {
      destroy()
      const device = props.device

      const position: Position = [device.x, device.y, device.z]

      object = new PointDom({
        position,
        env,
        isTop: true,
        id: device.id,
        type: device.name,
        size: device.size,
        click: clickHandle,
        show: device.visible,
        drag: dragStart,
      })

      if (props.active) {
        object.setActive(true)
      }
    }

    watchEffect(() => {
      const active = props.active
      if (object) object.setActive(active)
      // console.log(active)
    })

    watchEffect(() => {
      const p: Position = [props.device.x, props.device.y, props.device.z]

      if (object) object.setPosition(p)
    })

    watchEffect(() => {
      const size: number = props.device.size || 1
      if (object) object.setSize(size)
    })

    watchEffect(() => {
      const visible = props.device.visible

      if (object) {
        if (visible) {
          object.show()
        } else {
          object.hide()
        }
      }
    })

    // watch()

    onBeforeUnmount(() => {
      destroy()
    })

    create()

    return () => {
      return null
    }
  },
})
