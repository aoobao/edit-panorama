// import { State } from './modules/app'
// import { State } from './types'
import { DevicePoint } from '@/assets/types'
const getters = {
  menus: (state: any) => state.app.menus,
  currentMenuIndex: (state: any) => state.app.currentMenuIndex,
  currentMenu: (state: any, getters: any) => {
    return getters.menus[getters.currentMenuIndex]
  },
  points: (state: any) => state.app.points,
  currentPointId: (state: any) => state.app.currentPointId,
  currentPoint: (state: any, getters: any) => {
    if (getters.currentPointId) {
      const point = getters.points.find((p: DevicePoint) => p.id === getters.currentPointId)
      return point
    }
    return null
  },
  dragId: (state: any) => state.app.dragId,
  dragIndex: (state: any, getters: any) => {
    if (getters.dragId) {
      return getters.points.findIndex((p: DevicePoint) => p.id === getters.dragId)
    }
    return -1
  },
  dragPoint: (state: any, getters: any) => {
    if (getters.dragIndex > -1) {
      return getters.points[getters.dragIndex]
    } else {
      return null
    }
  },
}

export default getters
