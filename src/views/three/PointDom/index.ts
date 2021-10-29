import { BaseElement, BaseElementOption } from '@three/BaseElement/index'
import { useStyles } from './index.scss'
import { DeviceTypeName } from '@/assets/types'
import { createNode } from '@/assets/utils'
type PointDomOption = BaseElementOption & {
  id: string | number
  type: DeviceTypeName
  size?: number
  click?: (data: any, e: MouseEvent) => void
  drag?: (data: any, e: MouseEvent) => void
}

type DOMOption = {
  body: HTMLElement
  img: HTMLImageElement
}

export default class PointDom extends BaseElement {
  private deviceTypeName: DeviceTypeName
  private click?: (data: any, e: MouseEvent) => void
  private dom: DOMOption
  private drag?: (data: any, e: MouseEvent) => void
  private size: number
  constructor(opts: PointDomOption) {
    super({
      ...opts,
      offset: [-40, -40],
    })
    this.clickHandle = this.clickHandle.bind(this)
    this.dragStartHandle = this.dragStartHandle.bind(this)

    this.deviceTypeName = opts.type
    this.size = opts.size || 1
    this.click = opts.click
    this.drag = opts.drag

    this.dom = this.createElement()

    this.setSize()
  }

  private createElement() {
    const html = `
    <img class="icon" src="" />
    `

    const body = createNode(html, useStyles.pointDomBody)

    const img = body.querySelector('.icon') as HTMLImageElement

    img.classList.add(useStyles.icon)
    img.src = this._getIconSrc()

    // 可拖拽
    img.draggable = true

    body.addEventListener('click', this.clickHandle)

    img.addEventListener('dragstart', this.dragStartHandle)

    super.updateElement(body)

    const dom: DOMOption = {
      body,
      img,
    }
    return dom
  }

  private _getIconSrc() {
    const src = process.env.BASE_URL + `icon/${this.deviceTypeName}.png`
    return src
  }

  private clickHandle(e: MouseEvent) {
    const data = this.getExtData()
    if (typeof this.click === 'function') this.click(data, e)
  }

  private dragStartHandle(e: MouseEvent) {
    // console.log('drag start')
    const data = this.getExtData()
    if (typeof this.drag === 'function') this.drag(data, e)
  }

  public setActive(isActive: boolean) {
    if (isActive) {
      this.dom.body.classList.add(useStyles.active)
    } else {
      this.dom.body.classList.remove(useStyles.active)
    }
  }
  public setSize(size?: number) {
    if (size) {
      this.size = size
    }
    const img = this.dom.img

    img.style.transform = `scale(${this.size})`
  }
  public destroy() {
    super.destroy()
  }
}
