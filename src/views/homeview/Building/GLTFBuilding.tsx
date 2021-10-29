import { defineComponent, inject, onBeforeUnmount } from 'vue'
import { THREE } from '@three/lib'
import { ThreeJsEnvironment } from '@/assets/threejs/types'
import { loadModelByPath } from '@three/utils'
// import { vertexShader, fragmentShader } from './skybox.glsl'
export default defineComponent({
  name: 'GLTFBuilding',
  props: {},
  setup() {
    let object: THREE.Object3D
    let sky: THREE.Object3D
    let textureCube: THREE.CubeTexture
    const env = inject('ENV') as ThreeJsEnvironment

    // addSkyBox()
    addPanorama()

    const path = process.env.BASE_URL + 'gltf/yuanhua/'
    const fileName = 'yuanhuabuilding.gltf'

    loadModelByPath(path, fileName).then(gltf => {
      // console.log(gltf)
      object = gltf.scene.children[0]

      object.position.setY(-10)

      object.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          const material = obj.material as THREE.MeshStandardMaterial
          material.envMap = textureCube
          // material.envm
        }
      })

      env.scene.add(object)
    })

    function addPanorama() {
      const path = process.env.BASE_URL + 'textures/bridge/'
      const loader = new THREE.CubeTextureLoader()
      loader.setPath(path)
      textureCube = loader.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'])
      textureCube.encoding = THREE.sRGBEncoding

      env.scene.background = textureCube

      // const geometry = new THREE.IcosahedronBufferGeometry(400, 15)
      // const sphereMaterial = new THREE.MeshLambertMaterial({ envMap: textureCube })
      // const sphereMesh = new THREE.Mesh(geometry, sphereMaterial)
      // env.scene.add(sphereMesh)
    }

    // function addSkyBox() {
    //   const uniforms = {
    //     topColor: { value: new THREE.Color(0x0077ff) },
    //     bottomColor: { value: new THREE.Color(0xffffff) },
    //     offset: { value: 400 },
    //     exponent: { value: 0.6 },
    //   }

    //   const skyGeo = new THREE.SphereBufferGeometry(400, 32, 15)
    //   const skyMat = new THREE.ShaderMaterial({
    //     uniforms,
    //     vertexShader,
    //     fragmentShader,
    //     side: THREE.BackSide,
    //   })

    //   sky = new THREE.Mesh(skyGeo, skyMat)
    //   env.scene.add(sky)
    // }

    onBeforeUnmount(() => {
      env.scene.remove(object, sky)
    })

    return () => {
      return null
    }
  },
})
