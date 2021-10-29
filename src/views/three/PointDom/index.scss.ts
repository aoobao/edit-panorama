import { createUseStyles } from '@/assets/cjss'
import { ICON_WIDTH } from './type'
const scss = {
  pointDomBody: {
    cursor: 'pointer',
    width: 80,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  active: {
    border: '1px solid #F4A524',
    borderRadius: 4,
    boxShadow: '0 0 4px 2px #f4a524',
  },
  icon: {
    width: ICON_WIDTH,
    height: ICON_WIDTH,
  },
}

export const useStyles = createUseStyles(scss)
