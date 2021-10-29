import { menus, MenuType, DevicePoint } from '@/assets/types'
export declare interface State {
  menus: MenuType[]
  currentMenuIndex: number
  points: DevicePoint[]
  // activePoint: DevicePoint | undefined
  currentPointId?: string | number
  dragId?: string | number
}

const state: State = {
  menus: [...menus],
  currentMenuIndex: 0,
  points: [
    {
      id: 1610936714278,
      name: '道闸',
      visible: true,
      x: 0,
      y: 0,
      z: -1,
      size: 1,
    },
    {
      id: 1610936714279,
      name: '摄像头',
      visible: true,
      x: 0.32596793827906106,
      y: -0.02487830603125779,
      z: -0.9428735471744897,
      size: 1,
    },
    {
      id: 1610936714280,
      name: '摄像头',
      visible: true,
      x: 0,
      y: -0.7071067811865476,
      z: -0.7071067811865476,
      size: 1,
    },
  ],
  currentPointId: undefined,
  dragId: undefined,
}

const mutations = {
  setCurrentMenuIndex(state: State, index: number) {
    state.currentMenuIndex = index
  },
  setActivePointId(state: State, id?: string | number) {
    state.currentPointId = id
  },
  setDragId(state: State, id?: string | number) {
    state.dragId = id
  },
  addNewPoint(state: State, p: DevicePoint) {
    state.points = [...state.points, p]
  },
  changePositionById(state: State, point: DevicePoint) {
    const pointIndex = state.points.findIndex(p => p.id === point.id)
    if (pointIndex === -1) {
      console.warn('未找到point,id=' + point.id)
      return
    }
    const target = state.points[pointIndex]
    const newPoint = {
      ...target,
      x: point.x,
      y: point.y,
      z: point.z,
    }
    state.points.splice(pointIndex, 1, newPoint)
  },
  setPointSize(state: State, point: DevicePoint) {
    const index = state.points.findIndex(p => p.id === point.id)
    if (index === -1) return
    const p = state.points[index]
    state.points.splice(index, 1, {
      ...p,
      size: point.size,
    })
  },
  changePointVisible(state: State, point: DevicePoint) {
    // TODO
    const index = state.points.findIndex(p => p.id === point.id)
    const p = state.points[index]
    state.points.splice(index, 1, {
      ...p,
      visible: point.visible,
    })
  },
}

export default {
  state,
  mutations,
}
