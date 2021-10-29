import { defineComponent, inject, onBeforeUnmount, onMounted } from 'vue'
import { THREE } from '@three/lib'
import { ThreeJsEnvironment } from '@/assets/threejs/types'
// import { loadModelByPath } from '@three/utils'
export default defineComponent({
  name: 'PanoramaView',
  props: {},
  setup() {
    const env = inject('ENV') as ThreeJsEnvironment

    let mesh: THREE.Mesh
    let geometry: THREE.SphereBufferGeometry
    let material: THREE.MeshBasicMaterial

    const path = process.env.BASE_URL + 'panorama/default.jpg'
    const texture = new THREE.TextureLoader().load(path)

    const init = () => {
      geometry = new THREE.SphereBufferGeometry(1, 36, 36)
      geometry.scale(-1, 1, 1)

      material = new THREE.MeshBasicMaterial({ map: texture })

      mesh = new THREE.Mesh(geometry, material)

      env.scene.add(mesh)

      env.panorama = mesh
    }

    init()

    onMounted(() => {
      if (!env.panorama) {
        init()
      }
    })

    onBeforeUnmount(() => {
      env.scene.remove(mesh)
      env.panorama = undefined
      geometry.dispose()
      material.dispose()
    })

    return () => {
      return null
    }
  },
})
