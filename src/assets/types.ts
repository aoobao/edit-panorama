export type DeviceTypeName = '道闸' | '门禁' | '摄像头'

export declare interface MenuType {
  icon: string
  name: string
  code: string
}

export declare interface DevicePoint {
  id: string | number
  name: DeviceTypeName
  title?: string
  x: number
  y: number
  z: number
  visible: boolean
  size: number
}

export interface SceneItem {
  name: string
}

export const menus: MenuType[] = [
  // {
  //   icon: 'el-icon-tickets',
  //   name: '基础',
  // },
  {
    code: 'point',
    icon: 'el-icon-s-help',
    name: '点位',
  },
]
