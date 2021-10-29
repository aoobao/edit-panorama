import { THREE, CameraControls } from '@three/lib'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
export interface ThreeJsEnvironment {
  width: number
  height: number
  scene: THREE.Scene
  // renderer: THREE.Renderer
  renderer: THREE.WebGLRenderer
  raycaster: THREE.Raycaster
  clock: THREE.Clock
  // camera: THREE.Camera | undefined
  // 一般都是透视照相机,如果换正交照相机,还是对应改代码比较方便.
  camera?: THREE.PerspectiveCamera
  control?: CameraControls
  panorama?: THREE.Mesh
}

export { GLTF }

export type Position = [number, number, number]

export type Pixel = [number, number]