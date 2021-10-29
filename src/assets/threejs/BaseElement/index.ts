import { useStyles } from './index.scss'
import { ThreeJsEnvironment, Position, Pixel } from '@three/types'
import { THREE } from '@three/lib'
import { addRender, removeRender } from '@three/renderManager'

export interface BaseElementOption {
  position?: Position
  offset?: Pixel
  env: ThreeJsEnvironment
  isTop?: boolean // 永远不被物体挡住
  extData?: any
  show?: boolean
  element?: HTMLElement
}

let tempMaterial: THREE.Material
let defaultElement: HTMLElement = document.body
export class BaseElement {
  private position: Position
  private offset: Pixel
  private env: ThreeJsEnvironment
  private extData: any
  private _show: boolean

  private __left?: number
  private __top?: number
  // 父节点
  private appendElement: HTMLElement
  // 依附在父节点上的根节点 (控制显示隐藏,位置.)
  private _el: HTMLElement = document.createElement('div')
  // 更新dom的内容
  private _element?: HTMLElement

  private instance?: THREE.Object3D

  private hideTick?: number
  public isTop: boolean

  constructor(opts: BaseElementOption) {
    this.render = this.render.bind(this)

    this.position = opts.position || [0, 0, 0]
    this.offset = opts.offset || [0, 0]

    this.appendElement = opts.element || defaultElement

    this.env = opts.env

    this.isTop = opts.isTop || false

    this.extData = opts.extData

    this._show = false

    this.__createInstance(opts)
  }

  static setDefaultAppendElementBody(element: HTMLElement) {
    defaultElement = element
  }

  static getDefaultAppendElementBody() {
    return defaultElement
  }

  private __createInstance(opts: BaseElementOption) {
    const width = 0.01
    const geometry = new THREE.BoxGeometry(width, width, width)
    if (!tempMaterial) {
      tempMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    }
    this.instance = new THREE.Mesh(geometry, tempMaterial)

    this.instance.position.set(...this.position)

    this.__createElement()

    if (opts.show) {
      this.show()
    }
  }

  private __createElement() {
    const div = this._el
    div.className = useStyles.baseElementBody
    div.style.display = 'none'

    this.appendElement.appendChild(div)
  }

  private render() {
    if (this._show && this.instance) {
      const tempV = new THREE.Vector3()
      this.instance.updateWorldMatrix(true, false)
      this.instance.getWorldPosition(tempV)

      tempV.project(this.env.camera!)

      let show = true

      if (!inCameraProjection(tempV)) {
        show = false
        this._el.style.display = 'none'
      } else {
        const isTop = this.isTop
        if (!isTop) {
          const raycaster = this.env.raycaster
          raycaster.setFromCamera(tempV, this.env.camera!)

          const intersectedObjects = raycaster.intersectObjects(this.env.scene.children)
          if (intersectedObjects.length && this.instance === intersectedObjects[0].object) {
            show = true
          } else {
            show = false
          }
        }

        const x = (tempV.x * 0.5 + 0.5) * this.env.width
        const y = (tempV.y * -0.5 + 0.5) * this.env.height

        this.__left = x
        this.__top = y

        if (show) {
          if (this.hideTick) {
            clearTimeout(this.hideTick)
            this.hideTick = undefined
          }

          this._el.style.left = x + 'px'
          this._el.style.top = y + 'px'
          this._el.style.display = 'block'
        } else {
          // 如果不需要显示并且当前为显示状态,设置为隐藏.
          if (!this.hideTick && this._el.style.display !== 'none') {
            this.hideTick = window.setTimeout(() => {
              this.hideTick = undefined
              this._el.style.display = 'none'
            }, 500)
          }
        }
      }
    }
  }

  public getAbsolute() {
    if (this.__left && this.__top) {
      const pixel: Pixel = [this.__left, this.__top]
      return pixel
    } else {
      return null
    }
  }

  public updateElement(element: HTMLElement) {
    element.style.position = 'absolute'
    element.style.left = this.offset[0] + 'px'
    element.style.top = this.offset[1] + 'px'

    this._element = element
    this._el.innerHTML = ''
    this._el.appendChild(element)
  }

  public getElement() {
    return this._element
  }

  public setOffset(offset: Pixel) {
    this.offset = offset
    if (this._element) {
      this._element.style.left = this.offset[0] + 'px'
      this._element.style.top = this.offset[1] + 'px'
    }
  }

  public setPosition(position: Position) {
    this.position = position
    this.instance?.position.set(...position)
  }

  public getExtData() {
    return this.extData
  }

  public setExtData(data: any) {
    this.extData = data
  }

  public getIsTop() {
    return this.isTop
  }

  public setIsTop(isTop: boolean) {
    this.isTop = isTop
  }
  public show() {
    if (!this._show) {
      this._show = true
      if (this.instance) this.env.scene.add(this.instance)
      addRender(this.render)
    }
  }

  public hide() {
    if (this._show) {
      this._show = false
      if (this.instance) this.env.scene.remove(this.instance)

      this._el.style.display = 'none'
      removeRender(this.render)
    }
  }

  public destroy() {
    this.hide()
    this._el.innerHTML = ''
    this.appendElement.removeChild(this._el)
  }
}
function inCameraProjection(tempV: THREE.Vector3) {
  return isIn(tempV.x) && isIn(tempV.y) && isIn(tempV.z)
}

function isIn(num: number) {
  return Math.abs(num) < 1
}
