import { defineComponent, onBeforeUnmount, onMounted, provide, ref, renderSlot } from 'vue'
import { createThreeJsEnvironment } from '@three/utils'
import { THREE, CameraControls } from '@three/lib'
import { updateRender } from '@three/renderManager'
import { useStyles } from './ThreeWrap.scss'
import { ThreeJsEnvironment } from '@/assets/threejs/types'
import { BaseElement } from '@three/BaseElement/index'
// import { useStore } from 'vuex'
// import { cameraJSON } from './camera.json'

export default defineComponent({
  name: 'ThreeWrap',
  props: {},
  setup(props, ctx) {
    const containerRef = ref()
    const isComplete = ref(false)
    // const isControl = ref(false)
    let directionalLight: THREE.DirectionalLight

    let tick = 0
    let env: ThreeJsEnvironment
    // 初始化threejs 环境
    const initCameraAndControls = () => {
      // const loader = new THREE.ObjectLoader()
      // env.camera = loader.parse(cameraJSON) as THREE.PerspectiveCamera
      env.camera = new THREE.PerspectiveCamera(45, env.width / env.height, 0.01, 100)
      env.camera.position.set(0, 0, 0.000001)

      const control = (env.control = new CameraControls(env.camera, env.renderer!.domElement))

      // env.control.minDistance = 10
      // env.control.maxDistance = 400
      // env.control.minPolarAngle = 0
      // env.control.maxPolarAngle = Math.PI / 2
      control.mouseButtons.right = CameraControls.ACTION.NONE
      // control.mouseButtons.wheel = CameraControls.ACTION.NONE

      control.mouseButtons.wheel = CameraControls.ACTION.ZOOM

      control.azimuthRotateSpeed = 1.5
      control.polarRotateSpeed = 1.5

      control.saveState()

      // control.addEventListener('controlstart', () => {
      //   isControl.value = true
      // })

      // control.addEventListener('controlend', () => {
      //   isControl.value = false
      // })

      // control.addEventListener('control', () => {
      //   const angle = THREE.MathUtils.radToDeg(control.azimuthAngle)
      //   console.log(control.azimuthAngle, angle)
      // })
    }

    // 初始化灯光
    // const initLight = () => {
    //   const ambientLight = new THREE.AmbientLight(0xffffff)
    //   const light = new THREE.DirectionalLight(0xaabbff, 0.3)
    //   light.position.set(300, 250, -500)

    //   directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    //   // const pointLight = new THREE.PointLight(0xffffff, 1, 10000)
    //   const { x, y, z } = env.camera!.position
    //   directionalLight.position.set(x, y, z)
    //   // env.camera!.add(directionalLight) // 光源加到照相机对象下面不知道什么原因没效果

    //   env.scene.add(ambientLight, light, directionalLight)
    // }

    // 重置页面大小
    const resetSize = () => {
      const dom = containerRef.value as HTMLElement
      if (!env || !dom) return
      env.width = dom.offsetWidth
      env.height = dom.offsetHeight

      env.renderer!.setSize(env.width, env.height)
    }

    // 初始化
    onMounted(() => {
      env = createThreeJsEnvironment(containerRef.value, {
        antialias: true,
        alpha: true,
      })
      env.renderer.outputEncoding = THREE.sRGBEncoding

      BaseElement.setDefaultAppendElementBody(containerRef.value)

      initCameraAndControls()
      // initLight()

      window.addEventListener('resize', resetSize, false)

      provide('ENV', env)

      isComplete.value = true

      render()
    })

    // 销毁
    onBeforeUnmount(() => {
      cancelAnimationFrame(tick)
      tick = 0
      if (env) {
        env.scene.clear()
        const dom = containerRef.value as HTMLElement
        if (dom && env.renderer) {
          dom.removeChild(env.renderer.domElement)
        }
      }

      window.removeEventListener('resize', resetSize, false)
    })

    function render() {
      const delta = env.clock.getDelta()
      ctx.emit('render', { delta })
      updateRender(delta)
      const camera = env.camera!

      if (env.control) {
        const hasUpdated = env.control.update(delta)
        if (hasUpdated && directionalLight) {
          const { x, y, z } = camera.position
          directionalLight.position.set(x, y, z)
        }
      }

      env.renderer?.render(env.scene, camera)

      tick = requestAnimationFrame(render)
    }

    // function clickHandle(/* e: MouseEvent */) {
    //   // console.log(e)
    //   if (!env.camera) return
    //   const json = env.camera.toJSON()
    //   // console.log(JSON.stringify(json))
    // }

    // const allowDrop = (e: MouseEvent) => {
    //   e.preventDefault()
    //   // console.log('over')
    // }

    // const drop = (e: MouseEvent) => {
    //   e.preventDefault()
    //   // console.log(e)
    // }

    // const dragEnd = (e: MouseEvent) => {
    //   e.preventDefault()
    //   // console.log(e)
    //   const dragId = store.getters.dragId

    //   console.log(dragId, e)
    // }

    const classes = useStyles
    return () => {
      const slot = isComplete.value ? renderSlot(ctx.slots, 'default') : null
      return (
        <div class={classes.container} ref={containerRef}>
          {slot}
        </div>
      )
    }
  },
})
