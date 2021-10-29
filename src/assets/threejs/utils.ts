import { THREE, CameraControls } from '@three/lib'
import { ThreeJsEnvironment } from './types'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTF } from '@three/types'
// 销毁对象
export function disposeObject(obj: THREE.Object3D) {
  const parent = obj.parent

  if (parent !== null) {
    parent.remove(obj)
  }

  if (obj instanceof THREE.Mesh) {
    const mesh = obj as THREE.Mesh

    mesh.geometry.dispose()

    const material = mesh.material

    if (Array.isArray(material)) {
      material.map(m => {
        m.dispose()
      })
    } else {
      material.dispose()
    }
  }
  const children = obj.children

  for (let i = 0; i < children.length; i++) {
    const object = children[i]
    disposeObject(object)
  }
}

// 初始化three环境基本参数.
export function createThreeJsEnvironment(dom: HTMLElement, rendererParameters: THREE.WebGLRendererParameters = { antialias: true, alpha: true }) {
  const env: ThreeJsEnvironment = {
    width: dom.offsetWidth,
    height: dom.offsetHeight,
    scene: new THREE.Scene(),
    raycaster: new THREE.Raycaster(),
    clock: new THREE.Clock(),
    renderer: new THREE.WebGLRenderer(rendererParameters),
  }

  env.renderer.setSize(env.width, env.height)
  dom.appendChild(env.renderer.domElement)

  // 相机和轨道控制器的设置容易不同,在业务代码中实现创建.
  return env
}

// 初始化相机+轨道控制器
export function initCameraAndControls(env: ThreeJsEnvironment, cameraFov = 45, near = 1, far = 10000) {
  const camera = new THREE.PerspectiveCamera(cameraFov, env.width / env.height, near, far)
  // 设置照相机不要在0,0,0 点就行.
  camera.position.set(0, 0, 0.01)

  env.control = new CameraControls(camera, env.renderer!.domElement)

  env.camera = camera

  return env
}

// export function loadModelByPath(path: string, loadOnProgress: Function, fileName: string = 'index.gltf') {

// }
export const loadModelByPath = (() => {
  let loader: GLTFLoader
  return function loadFile(path: string, fileName = 'index.gltf', onProgress?: (event: ProgressEvent) => void) {
    if (!loader) loader = new GLTFLoader()

    return new Promise<GLTF>((resolve, reject) => {
      const strPath = path.endsWith('/') ? path : path + '/'

      loader.setPath(strPath)
      loader.load(
        fileName,
        gltf => {
          resolve(gltf)
        },
        onProgress,
        err => {
          reject(err)
        },
      )
    })
  }
})()
